import { lastValueFrom } from 'rxjs';
import { IPessoaAuthenticad } from './../../../shared/interface/pessoa';
import { PessoaService } from './../../../shared/service/pessoa.service';
import { IProduto } from './../../../shared/interface/produto';
import { ILivro } from './../../../shared/interface/livro';
import { fromFormToEntity } from './../../../shared/utils/fromFormToEntity.utils';
import { AnuncioService } from './../../../shared/service/anuncio.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IAnuncioSave } from './../../../shared/interface/anuncio';
import {  Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  file;

  anuncioSave: IAnuncioSave = {} as IAnuncioSave;
  form_anuncioSave: FormGroup;
  livroSave: ILivro = {} as ILivro;
  produtoSave: IProduto = {} as IProduto;
  pessoa: IPessoaAuthenticad = {} as IPessoaAuthenticad;

  constructor(
    private formBuilder: FormBuilder,
    private anuncioService: AnuncioService,
    private pessoaService: PessoaService) {
      this.form_anuncioSave = this.formBuilder.group({
        descricao: ['Livro novo'],
        valor: ['50'],
        titulo: ['O alto da compadecida'],
        autor: ['Lucas'],
        numeroPaginas: ['55'],
        edicao: ['1'],
        anoDePublicacao: ['2022'],
        codigoDeBarras: ['12341234']
      })
    }

  ngOnInit(): void {
  }

  addImage(event){
    this.file = event;
    // this.anuncioService.save(event, );
  }


 async anunciar(){

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



    console.log(this.anuncioSave);

    this.anuncioService.save(this.file, JSON.stringify(this.anuncioSave)).then(success => {


    }).catch(error => {


    })
  }

}
