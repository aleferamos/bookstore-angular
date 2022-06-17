import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout_component/layout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children: [
    {path: 'home', component: HomeComponent},
    {path: 'forgot_password', component: ForgotPasswordComponent},
    {path: 'reset_password/:token', component: ResetPasswordComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
