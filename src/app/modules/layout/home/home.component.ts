import {
  TransferLivroService
} from './../../../shared/service/Transfer_object/TransferLivro.service';
import {
  IAnuncioList
} from './../../../shared/interface/anuncio';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  RequestService
} from 'src/app/shared/service/request/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  anuncios: IAnuncioList[];

  responsiveOptions;

  constructor(
    private transferLivroService: TransferLivroService,
    private requestService: RequestService < any > ) {}

  ngOnInit(): void {
    this.loadAnuncios();
  }

  async loadAnuncios() {
    const anuncio = this.requestService.get('anuncio', '');


    anuncio.then(success => {
      this.anuncios = success!.content;
    })
  }

  addCart(book: IAnuncioList) {
    this.transferLivroService.salvar(book);
  }

}
