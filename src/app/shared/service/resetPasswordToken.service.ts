import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MessageRequestPassword } from "../interface/other-interfaces";
import { IForgotPassword, IResetPassword } from "../interface/pessoa";

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordTokenService {

  constructor(private http: HttpClient){}

  async forgot_password(forgotPassword: IForgotPassword): Promise<MessageRequestPassword>{
    const url = `${environment.api}/resetPassword/forgot-password`;

    const result = await this.http.post<any>(url, forgotPassword).toPromise();

    return result;
  }

  async reset_password(reset_password: IResetPassword): Promise<MessageRequestPassword>{
    const url = `${environment.api}/resetPassword/reset-password`;

    const result = await this.http.post<any>(url, reset_password).toPromise();

    return result;
  }

  tokenExists(token: string): Observable<Boolean>{
    const url = `${environment.api}/resetPassword/tokenIsValid/${token}`;

    return this.http.get<Boolean>(url).pipe(
      map(response => response)
    );

  }
}
