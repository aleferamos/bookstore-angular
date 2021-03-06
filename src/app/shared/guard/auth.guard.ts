import { IToken } from './../interface/IToken';
import { AccountService } from './../service/account.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
      this.router.navigate(['home']);
      return false;
    }
  }

}
