import { ProtectedRoutAdmin } from './../../shared/guard/protectedRout.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { SystemComponent } from './system/system.component';


@NgModule({
  declarations: [

    SystemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [ProtectedRoutAdmin]
})
export class AdminModule { }
