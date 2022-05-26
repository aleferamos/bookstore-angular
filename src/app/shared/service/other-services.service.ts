import { Observable, map } from 'rxjs';
import { IViaCep } from './../interface/other-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class ViaCepService {

  constructor(private http: HttpClient){}

  // search_cep(cep:string): Observable<IViaCep>{

  //   const url = "https://viacep.com.br/ws/"

  //   // const rest = await lastValueFrom(this.http.get<IViaCep>(`${url}${cep}/json/`).pipe(
  //   //   map(response => response)
  //   // ));
  //   // console.log(rest);

  //  this.http.get<IViaCep>(`${url}${cep}/json/`).toPromise().then(foo => {
  //   return foo;

  // });

  // return ;

  // }

  search_cep(cep: string): Observable<IViaCep> {
    return this.http.get<IViaCep>(`https://viacep.com.br/ws//${cep}/json/`).pipe(
      map(response => response)
    );
  }
}

