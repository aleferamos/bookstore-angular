import { map, Observable } from 'rxjs';
import { IPayment } from './../interface/payment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  constructor(
    private http: HttpClient){}

     save(payment: IPayment): Observable<IPayment> {

      const url = `${environment.api}/pagamento/save`

      return this.http.post<IPayment>(url, payment, {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token')}}).pipe(
        map(response => response)
      );
    }


}
