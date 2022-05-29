import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPessoaSave } from './../interface/pessoa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  constructor(private http: HttpClient){}
}
