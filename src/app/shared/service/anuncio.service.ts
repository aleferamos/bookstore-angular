import { Injectable } from '@angular/core';
import { IPage } from './../interface/page';
import { IAnuncioList } from './../interface/anuncio';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private http: HttpClient){}

  async getAllAnuncios(params: string){
    var url = `${environment.api}/anuncio/listar`
      return await this.http.get<IPage<IAnuncioList>>(url, {params: new HttpParams().set('nome', params! ? params : '')}).toPromise();
  }

  async getAllByStatusCREATED(){
    var url = `${environment.api}/anuncio/listar/CREATED`
      return await this.http.get<IPage<IAnuncioList>>(url, {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token')}}).toPromise();
  }

  async save(file: File, json: string){


    const url = `${environment.api}/anuncio`;

    const formData = new FormData();

    formData.append('imagem', file)

    await this.http.post(url, formData,
    {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token')}, params: new HttpParams().set('anuncio', json)}).toPromise();
  }
}
