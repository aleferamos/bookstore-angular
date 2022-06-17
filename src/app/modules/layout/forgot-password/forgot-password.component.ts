import { fromFormToEntity } from './../../../shared/utils/fromFormToEntity.utils';
import { IForgotPassword } from './../../../shared/interface/pessoa';
import { AccountService } from './../../../shared/service/account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form_forgotPassword: FormGroup;
  passwordReset: IForgotPassword = {} as IForgotPassword;

  messageRequestSuccess;
  messageRequestFail;
  loadingRequest = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService) {
    this.form_forgotPassword = this.formBuilder.group({
      email: ['alefepdias@gmail.com']
    })
  }

  ngOnInit(): void {
  }

  forgot_passWord(){

    this.passwordReset = fromFormToEntity(this.form_forgotPassword);
    this.loadingRequest = true;

    this.accountService.forgot_password(this.passwordReset).then(success => {
      this.loadingRequest = false;
      this.messageRequestSuccess = success.message;
      this.messageRequestFail = false;

    }).catch(error => {
      this.loadingRequest = false;
      this.messageRequestFail = error.error.erro;
      this.messageRequestSuccess = false;
    });

  }

}
