import { ProtectedRout } from './../../shared/guard/protectedRout.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,

  ],
  providers: [ProtectedRout]
})
export class LayoutModule { }
