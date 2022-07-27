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

  addBookToCart(addAnnoncement:IAnuncioList){
      if(!this.AnnouncementList.find(announcement => addAnnoncement.id == announcement.id)){
        this.AnnouncementList.push(addAnnoncement);
        this.calculateSubTotal(addAnnoncement);
      }
  }

  calculateSubTotal(addAnnoncement:IAnuncioList){
    this.subTotalFromCart += addAnnoncement.preco;
    this.messageSourcesubTotal.next(this.subTotalFromCart);
  }

}
