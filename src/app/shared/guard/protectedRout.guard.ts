import { TransferLivroService } from 'src/app/shared/service/Transfer_object/TransferLivro.service';
import { IToken } from './../interface/IToken';
import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { lastValueFrom, Subscription } from "rxjs";
import { AccountService } from '../service/account.service';
import { ResetPasswordTokenService } from '../service/resetPasswordToken.service';
import { IAnuncioList } from '../interface/anuncio';


@Injectable({
  providedIn: 'root'
})
export class ProtectedRout implements CanActivate {

  subscription: Subscription;

  token;

  constructor(
    private router:Router,
    private resetPasswordTokenService: ResetPasswordTokenService) {
      this.token = location.pathname.replace("/reset_password/","");
    }

  async canActivate() {
    if(await lastValueFrom(this.resetPasswordTokenService.tokenExists(this.token))){
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProtectedPaymentPage implements CanActivate {

  announcement: IAnuncioList[] = [];

  constructor(
    private transferLivroService: TransferLivroService,
    private router: Router) {
      this.transferLivroService.currentMessageCart.subscribe(announcement => this.announcement = announcement)
    }

  async canActivate() {
    if(this.announcement.length < 1){
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProtectedRoutAdmin implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService){
  }

  async canActivate(): Promise<boolean> {

    let token:IToken = {} as IToken;

    token.token = window.localStorage.getItem('token')!;

    const tokenValid = await this.accountService.tokenIsValid(token);



    if (tokenValid){
      return true;
    }

    else {
      this.router.navigate(['system']);
      return false;
    }
  }

}

