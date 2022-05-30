import { IPage } from './../../interface/page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class RequestService<T> {

  constructor(private http: HttpClient){}

  async get(path: string, pathVariable?: string ,params?: string, page?: boolean){

    var url = `${environment.api}/${path}`

    if(pathVariable){
      var url = `${environment.api}/${path}/${pathVariable}`;
    }

    if(page){
      return await this.http.get<IPage<T>>(url, {params: new HttpParams().set('nome', params!)}).toPromise();
    } else {
      return await this.http.get<T>(url, {params: new HttpParams().set('nome', params!)}).toPromise();
    }

  }

  async post(path: string ,object: T){

    const url = `${environment.api}/${path}`

    await this.http.post(url, object).toPromise()
  }


}
