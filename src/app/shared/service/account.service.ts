import { Observable, map } from 'rxjs';
import { MessageRequestPassword } from './../interface/other-interfaces';
import { IForgotPassword, IResetPassword } from './../interface/pessoa';
import { IToken } from './../interface/IToken';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  async login(user: any): Promise<boolean> {
    const result = await this.http.post<any>(`${environment.api}/autenticacao/autenticar`, user).toPromise();

    if (result && result.token) {
      window.localStorage.setItem('token', result.token);
      return true;
    }

    return false;
  }

  getAuthorizationToken(): string {
    const token = window.localStorage.getItem('token');

    return token!;
  }

   tokenIsValid(token: IToken):Observable<boolean>{

    return this.http.post<boolean>(`${environment.api}/autenticacao/validar`, token, {headers: {Authorization: 'Bearer ' + token.token}}).pipe(
      map(response => response)
    )
  }

  async logoff(): Promise<void> {
    window.localStorage.removeItem('token');
  }
}
