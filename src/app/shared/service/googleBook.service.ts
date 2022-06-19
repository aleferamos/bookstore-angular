import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class googleBookService {

  constructor(private http: HttpClient){}

  async getLivroByNome(nome: string){

      var url = `${environment.api}/googlebook/${nome}`;

      console.log(url);

      return await this.http.get<any>(url).toPromise();


  }
}
