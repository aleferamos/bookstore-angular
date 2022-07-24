import { AnuncioService } from './../../../shared/service/anuncio.service';
import { IAnuncioList } from './../../../shared/interface/anuncio';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  providers: [MessageService]
})
export class SystemComponent implements OnInit {

  anuncioListCreated: IAnuncioList[] = [];
  anuncioListUnauthorized: IAnuncioList[] = [];
  anuncioSelected: IAnuncioList = {} as IAnuncioList;
  imageLink: string;
  object: any[] = [];

  objectSelected;

  displayBasic2: boolean = false;

  constructor(
    private anuncioService: AnuncioService,
    private messageService: MessageService
  ) {

    this.loadAnunciosCreated();
    this.loadAnunciosUnauthorized();

    this.object = [
      {status: 'Autorizar', value: '1'},
      {status: 'Não autorizar', value: '2'},
    ]
  }

  ngOnInit(): void {
  }

  loadAnunciosCreated(){
    this.anuncioService.getAllByStatus('CREATED').then(success => {
      this.anuncioListCreated = success!.content!;
    });
  }

  loadAnunciosUnauthorized(){
    this.anuncioService.getAllByStatus('UNAUTHORIZED').then(success => {
      this.anuncioListUnauthorized = success!.content!;
    });
  }

  showBasicDialog2(anuncio: IAnuncioList) {
    this.anuncioSelected = anuncio;
    this.imageLink = `assets/images_posts/${this.anuncioSelected.nomeImagem}`
    this.displayBasic2 = true;
  }

  alterarStatus(event){
    this.anuncioService.changeStatus(event.id, this.objectSelected).then(success => {
      this.displayBasic2 = false;
      setTimeout(() => {
        this.loadAnunciosCreated();
        this.loadAnunciosUnauthorized();
      }, 400);
    }).catch(() => {
      this.messageService.add({severity:'error', summary:'Status', detail:'Você deve escolher um status!'});
    })

  }
}
