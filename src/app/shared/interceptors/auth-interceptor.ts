import { Observable } from 'rxjs';
import { AccountService } from './../service/account.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = {
        token: this.accountService.getAuthorizationToken()
    };

    let request: HttpRequest<any> = req;

    if (token) {
      // O request é imutavel, ou seja, não é possível mudar nada
      // Faço o clone para conseguir mudar as propriedades
      // Passo o token de autenticação no header
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.token}`)
      });
    }

    // retorno o request com o erro tratado
    return next.handle(request);
  }
}
