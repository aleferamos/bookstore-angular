import { AnuncioService } from './../../../shared/service/anuncio.service';
import {TransferLivroService} from './../../../shared/service/Transfer_object/TransferLivro.service';
import {IAnuncioList} from './../../../shared/interface/anuncio';
import {Component,OnInit} from '@angular/core';

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
    private anuncioService: AnuncioService) {}

  ngOnInit(): void {
    this.loadAnuncios();
  }

  async loadAnuncios() {
    const anuncio = this.anuncioService.getAllByStatus('AUTHORIZED');
    anuncio.then(success => {
      console.log(success);

      this.anuncios = success!.content;
    })
  }

  addCart(book: IAnuncioList) {
    this.transferLivroService.salvar(book);
  }

}
