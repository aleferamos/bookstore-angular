import { Subscription } from 'rxjs';
import { PessoaService } from './../../../shared/service/pessoa.service';
import { IAnuncioList } from './../../../shared/interface/anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/shared/service/anuncio.service';
import { IPessoaAuthenticad } from 'src/app/shared/interface/pessoa';
import { lastValueFrom } from 'rxjs';
import { TransferLivroService } from 'src/app/shared/service/Transfer_object/TransferLivro.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  announcement: IAnuncioList = {} as IAnuncioList;


  pessoaAuthenticad: IPessoaAuthenticad = {} as IPessoaAuthenticad;

  itensCart:IAnuncioList[] = [];

  subscription: Subscription;

  subTotal: number = 0;

  constructor(
    private anuncioService: AnuncioService,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private transferLivroService: TransferLivroService,
  ) {
    this.transferLivroService.currentMessageCart.subscribe(books => this.itensCart = books);
    this.transferLivroService.currentMessageSubTotal.subscribe(subTotal => this.subTotal = subTotal)
  }

  ngOnInit(): void {
    this.loadPessoaAuthenticad();

  }

  loadAnnouncement(){
    const id = this.route.snapshot.paramMap.get('id');
    this.anuncioService.findById(parseInt(id!)).then(success => {
      this.announcement = success!;
    });
  }

  async loadPessoaAuthenticad(){
    this.pessoaAuthenticad = await lastValueFrom(this.pessoaService.getUserAuthenticad(window.localStorage.getItem('token')!));
  }

}
