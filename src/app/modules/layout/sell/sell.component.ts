import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { IPessoaAuthenticad } from './../../../shared/interface/pessoa';
import { PessoaService } from './../../../shared/service/pessoa.service';
import { IProduto } from './../../../shared/interface/produto';
import { ILivro } from './../../../shared/interface/livro';
import { fromFormToEntity } from './../../../shared/utils/fromFormToEntity.utils';
import { AnuncioService } from './../../../shared/service/anuncio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAnuncioSave } from './../../../shared/interface/anuncio';
import {  Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  file;
  loading = false;
  annoncied = false;

  anuncioSave: IAnuncioSave = {} as IAnuncioSave;
  form_anuncioSave: FormGroup;
  livroSave: ILivro = {} as ILivro;
  produtoSave: IProduto = {} as IProduto;
  pessoa: IPessoaAuthenticad = {} as IPessoaAuthenticad;

  mensagens = {
    descricao: [{ tipo: 'required', mensagem: 'A descrição é obrigatória!'}],
    valor: [{ tipo: 'required', mensagem: 'O valor é obrigatório!'}],
    titulo: [{ tipo: 'required', mensagem: 'O titulo é obrigatório!'}],
    autor: [{ tipo: 'required', mensagem: 'O autor é obrigatório!'}],
    numeroPaginas: [{ tipo: 'required', mensagem: 'O numero de páginas é obrigatório!'}],
    edicao: [{ tipo: 'required', mensagem: 'A edição é obrigatório!'}],
    anoDePublicacao: [{ tipo: 'required', mensagem: 'O ano de publicação é obrigatório!'}],
    codigoDeBarras: [{ tipo: 'required', mensagem: 'O codigo de barras é obrigatório!'}],
  };
  constructor(
    private formBuilder: FormBuilder,
    private anuncioService: AnuncioService,
    private pessoaService: PessoaService,
    private messageService: MessageService) {
      this.form_anuncioSave = this.formBuilder.group({
        descricao: ['Livro novo', Validators.required],
        valor: ['50', Validators.required],
        titulo: ['O alto da compadecida', Validators.required],
        autor: ['Lucas', Validators.required],
        numeroPaginas: ['55', Validators.required],
        edicao: ['1', Validators.required],
        anoDePublicacao: ['2022', Validators.required],
        codigoDeBarras: ['12341234', Validators.required]
      })
    }

  ngOnInit(): void {
  }

  addImage(event){
    this.file = event;

  }


 async anunciar(){
    if(!this.file){
      this.messageService.add({key: 'bc', severity:'error', summary: 'Ops...', detail: 'Selecione uma imagem'});
    } else {
      if(this.form_anuncioSave.valid){
        this.produtoSave.codigoBarra = this.livroSave.titulo = this.form_anuncioSave.value.codigoDeBarras;
        this.livroSave.titulo = this.form_anuncioSave.value.titulo;
        this.livroSave.anoPublicacao = this.form_anuncioSave.value.anoDePublicacao;
        this.livroSave.autor = this.form_anuncioSave.value.autor;
        this.livroSave.numeroPaginas = this.form_anuncioSave.value.numeroPaginas;
        this.livroSave.edicao = this.form_anuncioSave.value.edicao;
        this.livroSave.produto = this.produtoSave;
        this.pessoa = await lastValueFrom(this.pessoaService.getUserAuthenticad(window.localStorage.getItem('token')!));
        this.anuncioSave.descricao = this.form_anuncioSave.value.descricao;
        this.anuncioSave.preco = this.form_anuncioSave.value.valor;
        this.anuncioSave.livro = this.livroSave;
        this.anuncioSave.pessoa = this.pessoa;
        this.anuncioService.save(this.file, JSON.stringify(this.anuncioSave)).then(success => {
          this.loading = true;

          setTimeout(() => {
            this.loading = false;
            this.annoncied = true;
          }, 3000);
    })
    }
  }
}

}


