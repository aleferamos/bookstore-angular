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

  async tokenIsValid(token: IToken) {

    return await this.http.post<any>(`${environment.api}/autenticacao/validar`, token, {headers: {Authorization: 'Bearer ' + token.token}}).toPromise();
  }

  async logoff(): Promise<void> {
    window.localStorage.removeItem('token');
  }

  async forgot_password(forgotPassword: IForgotPassword): Promise<MessageRequestPassword>{
    const url = `${environment.api}/autenticacao/forgot-password`;

    const result = await this.http.post<any>(url, forgotPassword).toPromise();

    return result;
  }

  async reset_password(reset_password: IResetPassword): Promise<MessageRequestPassword>{
    const url = `${environment.api}/autenticacao/reset-password`;

    const result = await this.http.post<any>(url, reset_password).toPromise();

    return result;
  }

}
