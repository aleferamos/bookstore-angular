import { ProtectedRout } from './../../shared/guard/protectedRout.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SellComponent } from './sell/sell.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { PaymentComponent } from './payment/payment.component';
import { FilterComponent } from './filter/filter.component';

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
