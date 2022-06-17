import { fromFormToEntity } from './../../../shared/utils/fromFormToEntity.utils';
import { IResetPassword } from './../../../shared/interface/pessoa';
import { AccountService } from './../../../shared/service/account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form_resetPassword: FormGroup;
  reset_password: IResetPassword = {} as IResetPassword;

  messageRequestSuccess;
  messageRequestFail;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute) {
    this.form_resetPassword = this.formBuilder.group({
      password: [''],
      password_confirm: [''],
    })
  }

  ngOnInit(): void {
  }

  reset_passoword(){

    this.reset_password = fromFormToEntity(this.form_resetPassword);
    this.route.params.subscribe(params => this.reset_password.token = params['token'])

    this.accountService.reset_password(this.reset_password).then(success => {
      this.messageRequestSuccess = success.message;
      this.messageRequestFail = false;
    }).catch(error => {
      this.messageRequestFail = error.error.message;
      this.messageRequestSuccess = false;
    });

  }

}
