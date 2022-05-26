import { Injectable } from '@angular/core';
import { IPage } from './../interface/page';
import { IAnuncioList } from './../interface/anuncio';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AnuncioService {

  constructor(private http: HttpClient){}


  listar(): Observable<IAnuncioList[]>{

    const url = `${environment.api}/anuncio`

    return this.http.get<IPage<IAnuncioList>>(url).pipe(
      map(response => response.content)
    );
  }
}