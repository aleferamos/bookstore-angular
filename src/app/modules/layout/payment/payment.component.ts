import { ILivro } from './../../../shared/interface/livro';
import { ICart } from './../../../shared/interface/cart';
import { IPayment } from './../../../shared/interface/payment';
import { Subscription, finalize } from 'rxjs';
import { PessoaService } from './../../../shared/service/pessoa.service';
import { IAnuncioList } from './../../../shared/interface/anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/shared/service/anuncio.service';
import { IPessoaAuthenticad } from 'src/app/shared/interface/pessoa';
import { lastValueFrom } from 'rxjs';
import { TransferLivroService } from 'src/app/shared/service/Transfer_object/TransferLivro.service';
import { PaymentService } from 'src/app/shared/service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  announcement: IAnuncioList = {} as IAnuncioList;


  pessoaAuthenticad: IPessoaAuthenticad = {} as IPessoaAuthenticad;

  itensCart:IAnuncioList[] = [];
  payment: IPayment = {} as IPayment;
  cart: ICart = {} as ICart;
  livros: ILivro[] = [];
  subscription: Subscription;
  subTotal: number = 0;

  loadingFinalizePayment = false;
  paidWithSuccessAnimation = false;
  HidePaymentWindow = true;

  constructor(
    private anuncioService: AnuncioService,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private transferLivroService: TransferLivroService,
    private paymentService: PaymentService
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

  deleteItemFromListBooks(book: IAnuncioList){
    this.transferLivroService.removeBookFromCart(book);
  }

  async finalizePayment(){

    this.itensCart.forEach(item => {
      this.livros.push(item.livro!)
    })

    this.cart.livros = this.livros;

    this.payment.pessoa = await lastValueFrom(this.pessoaService.getUserAuthenticad(window.localStorage.getItem('token')!));
    this.payment.cart = this.cart;
    this.payment.total = this.subTotal + 50;


    this.paymentService.save(this.payment).subscribe(() => {

    this.loadingFinalizePayment = true;
    this.HidePaymentWindow = false;

    this.itensCart.forEach(item => {
      this.anuncioService.changeStatus(item.id!, 3);
    })

    setTimeout(() => {
      this.loadingFinalizePayment = false;
      this.paidWithSuccessAnimation = true;
      setTimeout(() => {
        this.transferLivroService.clearCart()
        this.router.navigate(['home'])
      }, 2500);
    }, 2000);
    })
  }

  async loadPessoaAuthenticad(){
    this.pessoaAuthenticad = await lastValueFrom(this.pessoaService.getUserAuthenticad(window.localStorage.getItem('token')!));
  }


}
