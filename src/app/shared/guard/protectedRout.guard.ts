import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { lastValueFrom, Subscription } from "rxjs";
import { AccountService } from '../service/account.service';
import { ResetPasswordTokenService } from '../service/resetPasswordToken.service';


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
