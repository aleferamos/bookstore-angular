import { IAnuncioList } from './../../interface/anuncio';
import { Injectable } from '@angular/core';
import { Subject, Observable, observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TransferLivroService {

  public AnnouncementList: IAnuncioList[] = [];
  public subTotalFromCart: number = 0;

  public messageSourceCart = new BehaviorSubject(this.AnnouncementList);
  public messageSourcesubTotal = new BehaviorSubject(this.subTotalFromCart)

  currentMessageCart = this.messageSourceCart.asObservable();
  currentMessageSubTotal = this.messageSourcesubTotal.asObservable();
  constructor() { }

  addBookToCart(book:IAnuncioList){
      if(!this.AnnouncementList.find(announcement => book.id == announcement.id)){
        this.AnnouncementList.push(book);
        this.subTotalFromCart += book.preco;
        this.messageSourcesubTotal.next(this.subTotalFromCart);
      }
  }

  calculateSubTotal(book:IAnuncioList){
    this.subTotalFromCart += book.preco;
    this.messageSourcesubTotal.next(this.subTotalFromCart);
  }

  removeBookFromCart(book:IAnuncioList){
    this.AnnouncementList.splice(this.AnnouncementList.indexOf(book), 1)
    this.subTotalFromCart -= book.preco;
    this.messageSourcesubTotal.next(this.subTotalFromCart);
    if(this.AnnouncementList.length < 1){
      location.reload()
    }
  }

  clearCart(){
    this.AnnouncementList = [];
    this.messageSourceCart.next(this.AnnouncementList)
  }

}
