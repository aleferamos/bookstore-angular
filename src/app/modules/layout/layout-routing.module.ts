import { AnnouncementComponent } from './announcement/announcement.component';
import { SellComponent } from './sell/sell.component';
import { AuthGuard } from './../../shared/guard/auth.guard';
import { ProtectedPaymentPage, ProtectedRout } from './../../shared/guard/protectedRout.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout_component/layout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PaymentComponent } from './payment/payment.component';
import { FilterComponent } from './filter/filter.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'forgot_password', component: ForgotPasswordComponent},
      {path: 'reset_password/:token', canActivate: [ProtectedRout], component: ResetPasswordComponent},
      {path: 'reset_password', pathMatch: 'full', redirectTo:'home'},
      {path: 'sell', canActivate: [AuthGuard], component: SellComponent},
      {path: 'announcement/:id', component: AnnouncementComponent},
      {path: 'payment', canActivate: [AuthGuard, ProtectedPaymentPage], component: PaymentComponent},
      {path: 'announcements', component: FilterComponent},
      {path: 'announcements/:title', component: FilterComponent},
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
