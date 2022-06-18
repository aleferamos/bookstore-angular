import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class TransferTokenResetService {

  constructor() { }

    private tokenReset = new Subject<String>();

    token$ = this.tokenReset.asObservable();

  saveToken(token: String){
    this.tokenReset.next(token);
  }

  getToken(){
    this.token$.subscribe(token => {
      return token;
    });

  }

}
