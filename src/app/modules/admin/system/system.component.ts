import { IAnuncioList } from './../../../shared/interface/anuncio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  anuncioList: IAnuncioList[] = []
  object: objeto[] = [];

  objectSelected;

  displayBasic2: boolean = false;

  constructor() {
    this.anuncioList = [
      {descricao: 'vendo livro novo',
        nomeImagem: '304e59a0-84ab-4e05-b27b-a106554e2f36',
        data: '07/08/1997',
        dataModificacao: '30/06/2022',
        preco: 50,
        curtida: 50,
        livro: {}},
        {descricao: 'vendo livro novo',
        nomeImagem: '304e59a0-84ab-4e05-b27b-a106554e2f36',
        data: '07/08/1997',
        dataModificacao: '30/06/2022',
        preco: 50,
        curtida: 50,
        livro: {}}
    ];

    this.object = [
      {status: 'Autorizar'},
      {status: 'Não autorizar'},
    ]
  }

  ngOnInit(): void {
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  alterarStatus(){
    this.displayBasic2 = false;
  }
}

export class objeto {
  status: string;
}
