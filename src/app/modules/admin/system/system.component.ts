import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  files1:Carro[] = [];

    files2: [];

    cols: any[];

  constructor() {
    this.files1 = [
      {nome:'civic', marca:'honda', modelo:'G2'},
      {nome:'civic', marca:'honda', modelo:'G3'},
      {nome:'civic', marca:'honda', modelo:'G4'},
    ]
  }

  ngOnInit(): void {
  }


}
export interface Carro {
  nome: string;
  marca: string;
  modelo: string;
}
