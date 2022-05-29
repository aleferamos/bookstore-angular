import { IAnuncioList } from './../../interface/anuncio';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TransferLivroService {

  constructor() { }

    // Observable string sources
    private livrosSource = new Subject<IAnuncioList>();

    // Observable string streams
  livros$ = this.livrosSource.asObservable();

  salvar(book: IAnuncioList) {
    this.livrosSource.next(book);
  }

}
