import { LayoutComponent } from './../layout_component/layout.component';
import { Router } from '@angular/router';
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
    private anuncioService: AnuncioService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadAnuncios();
  }

  async loadAnuncios() {
    const anuncio = this.anuncioService.getAllByStatus('AUTHORIZED');
    anuncio.then(success => {
      this.anuncios = success!.content;
    })
  }

  addItemCart(book: IAnuncioList) {
    this.transferLivroService.addBookToCart(book);
  }

  ViewAnnouncement(anuncio: IAnuncioList){
    setTimeout(() => {
      this.router.navigate([`announcement/${anuncio.id}`])
    }, 100);
  }

}
