import { ProtectedRoutAdmin } from './../../shared/guard/protectedRout.guard';
import { SystemComponent } from './system/system.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'system', component: SystemComponent, canActivate: [ProtectedRoutAdmin]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
