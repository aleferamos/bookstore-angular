import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import {ImageModule} from 'primeng/image';
import {InputTextModule} from 'primeng/inputtext';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [CalendarModule,
    ImageModule,
    InputTextModule,
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    CarouselModule,
    ButtonModule,
    OverlayPanelModule,
    DialogModule,
    RadioButtonModule,
    ProgressSpinnerModule
  ]
})
export class CoreModule { }
