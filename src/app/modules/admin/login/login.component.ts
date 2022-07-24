import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AccountService } from './../../../shared/service/account.service';
import { PessoaService } from './../../../shared/service/pessoa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService]
})
export class LoginComponent implements OnInit {

  form_login: FormGroup;
  form_validate: FormGroup;

  unauthorized = true;
  uuidValidate = uuidv4();

  mensagens = {
    login: [
      { tipo: 'required', mensagem: 'O login é obrigatório!'}],
    senha: [
      { tipo: 'required', mensagem: 'A senha é obrigatória!'}],
  };

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private router: Router) {
    this.form_login = this.formBuilder.group({
      email: ['alefep', Validators.required],
      senha: ['alefek159', Validators.required]
    })

    this.form_validate = this.formBuilder.group({
      codigo: [this.uuidValidate]
    })
  }

  ngOnInit(): void {
  }

  login(){

    this.accountService.login(this.form_login.value).then(async success => {
      const result = await lastValueFrom(this.pessoaService.getUserAuthenticad(window.localStorage.getItem('token')!));
      if(result.usuario.perfil == "ANALYST_PUB"){
        this.unauthorized = true;
        setTimeout(() => {
          this.confirmationService.confirm({
            accept: () => {
              if(this.form_validate.value.codigo == this.uuidValidate){
                setTimeout(() => {
                  this.router.navigate(['system'])
                }, 500);
            }
          }
          });
        }, 150);
      } else {
        this.unauthorized = false;
      }
    }).catch(() => {
      this.unauthorized = false;
    });


  }

}
