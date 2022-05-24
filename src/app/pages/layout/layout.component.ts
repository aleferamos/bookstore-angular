import { IAnuncioList } from './../../shared/interface/anuncio';
import { AnuncioService } from './../../shared/service/anuncio.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  anuncios: IAnuncioList[];
  cart: IAnuncioList[] = [];
	responsiveOptions;
  subtotal = 0;

  constructor(
    private anuncioService: AnuncioService) {}


  ngOnInit(): void {
    this.loadAnuncios();
  }

  async loadAnuncios(){
    const anuncio = this.anuncioService.listar();
    this.anuncios = await lastValueFrom(anuncio);
  }

  addCart(book: IAnuncioList){
    if(this.cart.includes(book)){
      this.subtotal += 0;
    } else {
      this.subtotal += book.preco;
      this.cart.push(book);
    }
  }

  removeCart(book: IAnuncioList){
    this.cart.splice(this.cart.indexOf(book), 1)
    this.subtotal -= book.preco;
  }

}
