import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPessoaSave, IPessoaAuthenticad } from './../interface/pessoa';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  constructor(
    private http: HttpClient){}

    getUserAuthenticad(token: string): Observable<IPessoaAuthenticad> {
      var url = `${environment.api}/autenticacao/GetUSerAuthenticad`
     return this.http.get<IPessoaAuthenticad>(url, {headers: {Authorization: 'Bearer ' + token}, params: new HttpParams().set('token', token)}).pipe(
        map(response => response)
      );
    }

    async save(pessoa: IPessoaSave){

      const url = `${environment.api}/pessoa/salvar`

      await this.http.post(url, pessoa).toPromise()
    }
}
