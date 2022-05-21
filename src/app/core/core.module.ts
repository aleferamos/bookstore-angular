import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import {ImageModule} from 'primeng/image';
import {InputTextModule} from 'primeng/inputtext';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [CalendarModule,ImageModule,InputTextModule,BadgeModule,AvatarModule,AvatarGroupModule]
})
export class CoreModule { }
