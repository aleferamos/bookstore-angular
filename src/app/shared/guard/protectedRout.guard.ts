import { TransferTokenResetService } from './../service/Transfer_object/TransferTokenReset.service';
import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { lastValueFrom, Subscription } from "rxjs";
import { AccountService } from '../service/account.service';


@Injectable({
  providedIn: 'root'
})
export class ProtectedRout implements CanActivate {

  subscription: Subscription;

  token;

  constructor(
    private router:Router,
    private accountService: AccountService) {
      this.token = location.pathname.replace("/reset_password/","");
    }

  async canActivate() {
    if(await lastValueFrom(this.accountService.tokenExists(this.token))){
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }


}
