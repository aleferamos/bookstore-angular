import { AnuncioService } from './../../../shared/service/anuncio.service';
import { IAnuncioList } from './../../../shared/interface/anuncio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  anuncioList: IAnuncioList[] = []
  anuncioSelected: IAnuncioList = {} as IAnuncioList;
  imageLink: string;
  object: any[] = [];

  objectSelected;

  displayBasic2: boolean = false;

  constructor(
    anuncioService: AnuncioService
  ) {

    anuncioService.getAllByStatusCREATED().then(success => {
      this.anuncioList = success!.content!;
    });

    this.object = [
      {status: 'Autorizar'},
      {status: 'Não autorizar'},
    ]
  }

  ngOnInit(): void {
  }

  showBasicDialog2(anuncio: IAnuncioList) {
    this.anuncioSelected = anuncio;

    this.imageLink = `assets/images_posts/${this.anuncioSelected.nomeImagem}`

    this.displayBasic2 = true;
  }

  alterarStatus(){
    this.displayBasic2 = false;
  }
}
