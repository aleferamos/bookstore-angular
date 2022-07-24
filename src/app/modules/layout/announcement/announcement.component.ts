import { ActivatedRoute } from '@angular/router';
import { IComment } from './../../../shared/interface/comment';
import { IAnuncioList } from './../../../shared/interface/anuncio';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnuncioService } from 'src/app/shared/service/anuncio.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  announcement: IAnuncioList = {} as IAnuncioList;

  subscription: Subscription;
  comments: IComment[] = [];
  imageAnnouncement: String;

  constructor(
    private anuncioService: AnuncioService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute
  ) {
    this.comments = [
      {author: 'Alefe Patrick Dias Ramos', rating: 4.0, comment: 'Achei o livro bom, mas tem algumas partes que não gostei'},
      {author: 'Lucas Adriano Dias Ramos', rating: 5.0, comment: 'Achei muito bom este livro, recomendo'},
      {author: 'Elenice Dias Ramos', rating: 2, comment: 'Não entendi muito bem sobre este livro'},
      {author: 'Aline Ramos Ferreira', rating: 5.0, comment: 'Amei o livro'}
    ]
  }

  ngOnInit(): void {
    this.loadAnnouncement();
    this.primengConfig.ripple = true;
  }

  loadAnnouncement(){
    const id = this.route.snapshot.paramMap.get('id');
    this.anuncioService.findById(parseInt(id!)).then(success => {
      this.announcement = success!;
      this.imageAnnouncement = `assets/images_posts/${success?.nomeImagem}`
    });
  }

  purchaseBooks(announcement: IAnuncioList){
    console.log(announcement);

  }

}
