import { IToken } from './../../../shared/interface/IToken';
import { TransferLivroService } from './../../../shared/service/Transfer_object/TransferLivro.service';
import { ActivatedRoute } from '@angular/router';
import { IComment } from './../../../shared/interface/comment';
import { IAnuncioList } from './../../../shared/interface/anuncio';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { AnuncioService } from 'src/app/shared/service/anuncio.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { PessoaService } from 'src/app/shared/service/pessoa.service';
import { IPessoaAuthenticad } from 'src/app/shared/interface/pessoa';

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
    private route: ActivatedRoute,
    private router: Router,
    private transferLivroService: TransferLivroService,
    private messageService: MessageService,
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



  purchaseCartItens(book: IAnuncioList){
    if(window.localStorage.getItem('token')){
      this.transferLivroService.addBookToCart(book)
      setTimeout(() => {
        this.router.navigate([`payment`])
      }, 300);
    } else {
      this.messageService.add({severity:'error', summary:'Ops', detail:'Você precisa estar logado!'});
    }
  }

  addCart(book: IAnuncioList){
    this.transferLivroService.addBookToCart(book);
  }

}
