import { googleBookService } from './../../../shared/service/googleBook.service';
import { ProtectedRout } from './../../../shared/guard/protectedRout.guard';
import { Router } from '@angular/router';
import { PessoaService } from './../../../shared/service/pessoa.service';
import { IPessoaAuthenticad } from './../../../shared/interface/pessoa';
import { IToken } from './../../../shared/interface/IToken';
import { AccountService } from './../../../shared/service/account.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TransferLivroService } from '../../../shared/service/Transfer_object/TransferLivro.service';
import { IEndereco } from '../../../shared/interface/endereco';
import { IUsuario } from '../../../shared/interface/usuario';
import { IPessoaSave } from '../../../shared/interface/pessoa';
import { IViaCep } from '../../../shared/interface/other-interfaces';
import {
  IAnuncioList
} from '../../../shared/interface/anuncio';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  interval,
  lastValueFrom, Observable, Subscription
} from 'rxjs';
import { ViaCepService } from 'src/app/shared/service/other-services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fromFormToEntity } from 'src/app/shared/utils/fromFormToEntity.utils';
import { style, state, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LayoutComponent implements OnInit {
  cart: IAnuncioList[] = [];
  cep: IViaCep = {} as IViaCep;
  form_pessoa: FormGroup;
  form_usuario: FormGroup;
  form_endereco: FormGroup;
  form_login: FormGroup;
  pessoaSave: IPessoaSave = {} as IPessoaSave;
  usuarioSave: IUsuario = {} as IUsuario;
  enderecoSave: IEndereco = {} as IEndereco;
  anunciosByName: any [] = [];
  book: IAnuncioList
  pessoaAuthenticad: IPessoaAuthenticad = {} as IPessoaAuthenticad;

  subtotal = 0;
  displayModal: boolean = false;
  disabledFalseInputs: boolean = true;
  error_msg: string;
  success_msg: boolean;
  input_search: string;
  subscription: Subscription;
  timeselectorOpen = false;
  text_msg_login;
  userIsAuthenticad = false;
  value: number = 0;
  loadingLogin = false;
  spinnerLoadLivros = false;

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'Nome é obrigatório'},
      { tipo: 'minlength', mensagem: 'O nome tem que conter ao menos 3 caracteres!'}],
      cep: [
        { tipo: 'required', mensagem: 'Cep é obrigatório'}],
    email: [
      { tipo: 'email', mensagem: 'Digite um e-mail válido'},
      { tipo: 'required', mensagem: 'O e-mail é obrigatório!'}],
    endereco: [
      { tipo: 'required', mensagem: 'O Endereco é obrigatório!'}],
    complemento: [
      { tipo: 'required', mensagem: 'O Complemento é obrigatório!'}],
    cidade: [
      { tipo: 'required', mensagem: 'O campo cidade é obrigatório!'}],
    estado: [
      { tipo: 'required', mensagem: 'O campo estado é obrigatório!'}],
    numero: [
      { tipo: 'required', mensagem: 'O campo número é obrigatório!'}],
    senha: [
      { tipo: 'minlength', mensagem: 'A senha deve conter mais que 6 caracteres'},
      { tipo: 'required', mensagem: 'A senha é obrigatória!'}],
    senhaConfirmada: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'comparacao', mensagem: 'Senhas não conferem' }],

    telefone: [
      { tipo: 'required', mensagem: 'O telefone é obrigatório' }],
  };

  constructor(
    private viaCepService: ViaCepService,
    private formBuilder: FormBuilder,
    private transferLivroService: TransferLivroService,
    private accountService: AccountService,
    private pessoaService: PessoaService,
    private googleBookService: googleBookService,
    private route:Router,
    private messageService: MessageService,
    ) {

      this.form_pessoa = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
      });

      this.form_usuario = this.formBuilder.group({
        email: ['', [Validators.required, Validators.minLength(3)]],
        senha: ['', [Validators.required, Validators.minLength(3)]],
      })

      this.form_endereco = this.formBuilder.group({
        cep: [''],
        endereco: new FormControl({value: undefined, disabled: this.disabledFalseInputs}, Validators.required),
        complemento: new FormControl({value: undefined, disabled: this.disabledFalseInputs}, Validators.required),
        cidade: new FormControl({value: undefined, disabled: this.disabledFalseInputs}, Validators.required),
        estado: new FormControl({value: undefined, disabled: this.disabledFalseInputs}, Validators.required),
        numero: new FormControl({value: undefined, disabled: this.disabledFalseInputs}, Validators.required),
        notExistCep: [true]
      })

      this.form_login = this.formBuilder.group({
        email: ['alefepdias@gmail.com'],
        senha: ['alefek159']
      })

      this.isAuthenticad();
    }

  ngOnInit(): void {
    this.transferLivroService.currentMessageSubTotal.subscribe(preco => {
      this.subtotal = preco
    })

    this.transferLivroService.currentMessageCart.subscribe(books => {
      this.cart = books;
    })
  }

  async isAuthenticad(){
    let token: IToken = {} as IToken;

    token.token = window.localStorage.getItem("token")!;

    if(token.token){
      this.accountService.tokenIsValid(token).then(async success => {
        if(success){
          this.userIsAuthenticad = true;
          this.pessoaAuthenticad = await lastValueFrom(this.pessoaService.getUserAuthenticad(token.token));
        } else {
          window.localStorage.removeItem('token')
        }
      }).catch(error => {
      })
    }
  }

  async loadCep(event: any){
    this.cep = await lastValueFrom(this.viaCepService.search_cep(this.form_endereco.value.cep));

    this.form_endereco.get('endereco')?.setValue(this.cep.logradouro);
    this.form_endereco.get('complemento')?.setValue(this.cep.complemento);
    this.form_endereco.get('cidade')?.setValue(this.cep.localidade);
    this.form_endereco.get('estado')?.setValue(this.cep.uf);

    if(event){
      this.form_endereco.enable();
    }
  }

  showModalCreateAccount() {
    this.displayModal = true;
  }

  login(){
    this.accountService.login(this.form_login.value).then(success => {
      this.text_msg_login = undefined;
      this.loadingLogin = true;
        if(success){
          setTimeout(() => {
            location.reload();
          }, 1300);
        }

    }).catch(error =>{
      if(error.status == 403){
        this.text_msg_login = "Senha incorreta!"
      }
      this.text_msg_login = error.error.erro;
    });

  }

  removeCart(book: IAnuncioList) {
    this.transferLivroService.removeBookFromCart(book)
  }

  disabledInputs(event: any){
    if(event){
      this.form_endereco.enable();
    }
  }

  loadLivrosByNome(){
    this.input_search.length > 1 ? this.googleBookService.getLivroByNome(this.input_search).then(success => {
      this.anunciosByName = success.items.filter((item: { volumeInfo: { imageLinks: any; }; }) => item.volumeInfo.imageLinks)}
      ) : null;
  }

  createAccount(){
    this.usuarioSave = fromFormToEntity(this.form_usuario);
    this.enderecoSave = fromFormToEntity(this.form_endereco);

    this.pessoaSave = fromFormToEntity(this.form_pessoa);

    this.pessoaSave.endereco = this.enderecoSave;
    this.pessoaSave.usuario = this.usuarioSave;

    if(this.validateForms(this.form_endereco, this.form_pessoa, this.form_usuario)){
      this.pessoaService.save(this.pessoaSave).then(() => {
        this.success_msg = true;
        this.error_msg = '';
      }).catch(error => {
        this.success_msg = false;
      });
    } else {
      this.messageService.add({severity:'error', summary: 'Ops...', detail: 'Algum campo está vazio'});
    }
  }

  logout(){
    this.accountService.logoff();
    setTimeout(() => {
      location.reload();
    }, 300);
  }

  routerLink(link: string){
    setTimeout(() => {
      this.route.navigate([link]);
    }, 200);
  }

  redirectToPayment(){
    if(localStorage.getItem("token")){
      setTimeout(() => {
        this.route.navigate(['payment']);
      }, 200);
    } else {
      this.messageService.add({severity:'error', summary: 'Ops...', detail: 'Você precisa estar logado!'});
    }
  }


  sell(){
    if(localStorage.getItem("token")){
      setTimeout(() => {
        this.route.navigate(["sell"]);
      }, 200);
    } else {
      this.messageService.add({severity:'error', summary: 'Ops...', detail: 'Você precisa estar logado!'});
    }
  }

  validateForms(endereco_form: FormGroup, pessoa_form: FormGroup, form_usuario: FormGroup){
    if(endereco_form.value.endereco != undefined
      && endereco_form.value.complemento != undefined
      && endereco_form.value.cidade != undefined
      && endereco_form.value.estado != undefined
      && endereco_form.value.numero != undefined
      && form_usuario.valid
      && pessoa_form.valid){
        return true;
      } else {
        return false;
      }
  }


}
