import { ConfirmationService } from 'primeng/api';
import { RequestService } from '../../../shared/service/request/request.service';
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
  lastValueFrom, Subscription
} from 'rxjs';
import { ViaCepService } from 'src/app/shared/service/other-services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fromFormToEntity } from 'src/app/shared/utils/fromFormToEntity.utils';
import { style, state, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [ConfirmationService]
})
export class LayoutComponent implements OnInit {
  cart: IAnuncioList[] = [];
  cep: IViaCep = {} as IViaCep;
  form_pessoa: FormGroup;
  form_usuario: FormGroup;
  form_endereco: FormGroup;
  pessoaSave: IPessoaSave = {} as IPessoaSave;
  usuarioSave: IUsuario = {} as IUsuario;
  enderecoSave: IEndereco = {} as IEndereco;
  anunciosByName: any [] = [];
  book: IAnuncioList

  subtotal = 0;
  displayModal: boolean = false;
  disabledFalseInputs: boolean = true;
  error_msg: string;
  success_msg: boolean;
  input_search: string;
  subscription: Subscription;
  timeselectorOpen = false;

  constructor(
    private viaCepService: ViaCepService,
    private formBuilder: FormBuilder,
    private transferLivroService: TransferLivroService,
    private requestService: RequestService<any>
    ) {

      this.subscription = this.transferLivroService.livros$.subscribe(book => {this.addCart(book);})

      this.form_pessoa = this.formBuilder.group({
        nome: [''],
      });

      this.form_usuario = this.formBuilder.group({
        email: [''],
        senha: [''],
      })

      this.form_endereco = this.formBuilder.group({
        cep: [''],
        endereco: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        complemento: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        cidade: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        estado: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required),
        numero: new FormControl({value: '', disabled: this.disabledFalseInputs}, Validators.required)
      })

    }

  ngOnInit(): void {}

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


  removeCart(book: IAnuncioList) {
    this.cart.splice(this.cart.indexOf(book), 1)
    this.subtotal -= book.preco;
  }

  disabledInputs(event: any){
    if(event){
      this.form_endereco.enable();
    }
  }

  loadAnuncioByNome(){



    this.input_search.length > 1 ? this.requestService.get('googlebook', this.input_search).then(success => {
      this.anunciosByName = success.items.filter((item: { volumeInfo: { imageLinks: any; }; }) => item.volumeInfo.imageLinks)}
      ) : null;

  }

  createAccount(){
    this.usuarioSave = fromFormToEntity(this.form_usuario);
    this.enderecoSave = fromFormToEntity(this.form_endereco);

    this.pessoaSave = fromFormToEntity(this.form_pessoa);

    this.pessoaSave.endereco = this.enderecoSave;
    this.pessoaSave.usuario = this.usuarioSave;


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