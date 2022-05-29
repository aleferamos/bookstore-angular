import { RequestService } from './../../shared/service/request/request.service';
import { TransferLivroService } from './../../shared/service/Transfer_object/TransferLivro.service';
import { IEndereco } from './../../shared/interface/endereco';
import { IUsuario } from './../../shared/interface/usuario';
import { IPessoaSave } from './../../shared/interface/pessoa';
import { IViaCep } from './../../shared/interface/other-interfaces';
import {
  IAnuncioList
} from './../../shared/interface/anuncio';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  lastValueFrom, Subscription
} from 'rxjs';
import { ViaCepService } from 'src/app/shared/service/other-services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  cart: IAnuncioList[] = [];
  cep: IViaCep = {} as IViaCep;
  form: FormGroup;
  pessoaSave: IPessoaSave = {} as IPessoaSave;
  usuarioSave: IUsuario = {} as IUsuario;
  enderecoSave: IEndereco = {} as IEndereco;
  anunciosByName: IAnuncioList[];
  book: IAnuncioList

  subtotal = 0;
  displayModal: boolean;;
  disabledFalseInputs: boolean = true;
  error_msg: string;
  success_msg: boolean;
  input_search: string;
  displayBooksSearchedByNome:boolean = false;
  subscription: Subscription;

  constructor(
    private viaCepService: ViaCepService,
    private formBuilder: FormBuilder,
    private transferLivroService: TransferLivroService,
    private requestService: RequestService<any>
    ) {

      this.subscription = this.transferLivroService.livros$.subscribe(book => {this.addCart(book);})

      this.form = this.formBuilder.group({
        nome: [''],
        email: [''],
        senha: [''],
        cep: [''],
        endereco: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        complemento: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        cidade: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        estado: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        numero: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required)
      });
    }

  ngOnInit(): void {}

  async loadCep(event){
    this.cep = await lastValueFrom(this.viaCepService.search_cep(this.form.value.cep));

    this.form.get('endereco')?.setValue(this.cep.logradouro);
    this.form.get('complemento')?.setValue(this.cep.complemento);
    this.form.get('cidade')?.setValue(this.cep.localidade);
    this.form.get('estado')?.setValue(this.cep.uf);

    if(event){
      this.form.get('endereco')?.enable();
      this.form.get('complemento')?.enable();
      this.form.get('cidade')?.enable();
      this.form.get('estado')?.enable();
      this.form.get('numero')?.enable();
    }
  }

  addCart(book: IAnuncioList) {
    if (this.cart.includes(book)) {
      this.subtotal += 0;
    } else {
      this.subtotal += book.preco;
      this.cart.push(book);
    }
  }

  showModalCreateAccount() {
    this.displayModal = true;
  }

  showBooksSearchedByNome(){
    this.displayBooksSearchedByNome = true;
  }


  removeCart(book: IAnuncioList) {
    this.cart.splice(this.cart.indexOf(book), 1)
    this.subtotal -= book.preco;
  }

  disabledInputs(event){
    if(event){
      this.form.get('endereco')?.enable();
      this.form.get('complemento')?.enable();
      this.form.get('cidade')?.enable();
      this.form.get('estado')?.enable();
      this.form.get('numero')?.enable();
    }
  }

  loadAnuncioByNome(){
    const anuncio = this.requestService.get('anuncio', this.input_search);
    anuncio.then(success => {
      this.anunciosByName = success!.content;
      if(this.anunciosByName.length > 0 && this.input_search.length > 0){
        this.showBooksSearchedByNome();
      }  else {
        this.displayBooksSearchedByNome = false;
      }
    });
  }

  createAccount(){
    this.pessoaSave.nome = this.form.value.nome;

    this.usuarioSave.email = this.form.value.email;
    this.usuarioSave.senha = this.form.value.senha;

    this.enderecoSave.cep = this.form.value.cep;
    this.enderecoSave.complemento = this.form.value.complemento;
    this.enderecoSave.endereco = this.form.value.endereco;
    this.enderecoSave.numero = this.form.value.numero;
    this.enderecoSave.cidade = this.form.value.cidade;
    this.enderecoSave.estado = this.form.value.estado;

    this.pessoaSave.usuario = this.usuarioSave;
    this.pessoaSave.endereco = this.enderecoSave



    this.requestService.post('pessoa', this.pessoaSave).then(sucess => {
      this.success_msg = true;
      this.error_msg = '';
    }).catch(error => {
      (error.error);
      this.success_msg = false;
        this.error_msg = error.error.erro
    });

  }
}
