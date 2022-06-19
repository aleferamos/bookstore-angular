import { comparaValidator } from './../../../validators/compara-validator';
import { fromFormToEntity } from './../../../shared/utils/fromFormToEntity.utils';
import { IResetPassword } from './../../../shared/interface/pessoa';
import { AccountService } from './../../../shared/service/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordTokenService } from 'src/app/shared/service/resetPasswordToken.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  form_resetPassword: FormGroup;
  reset_password: IResetPassword = {} as IResetPassword;

  messageRequestSuccess;
  messageRequestFail;


  mensagens = {
    email: [
      { tipo: 'email', mensagem: 'Digite um e-mail válido'},
      { tipo: 'required', mensagem: 'O e-mail é obrigatório!'}],
    senha: [
      { tipo: 'minlength', mensagem: 'A senha deve conter mais que 6 caracteres'},
      { tipo: 'required', mensagem: 'A senha é obrigatória!'}],
    senhaConfirmada: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'comparacao', mensagem: 'Senhas não conferem' }],
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private resetPasswordTokenService: ResetPasswordTokenService) {
    this.form_resetPassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', Validators.required],
    },{validator: comparaValidator('password', 'password_confirm')})
  }

  ngOnInit(): void {
  }

  reset_passoword(){

    this.reset_password = fromFormToEntity(this.form_resetPassword);
    this.route.params.subscribe(params => this.reset_password.token = params['token'])

    if(this.form_resetPassword.valid){

      this.resetPasswordTokenService.reset_password(this.reset_password).then(success => {
        this.messageRequestSuccess = success.message;
        this.messageRequestFail = false;


        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 700);
      }).catch(error => {
        this.messageRequestFail = error.error.message;
        this.messageRequestSuccess = false;
      });
    }


  }

}
