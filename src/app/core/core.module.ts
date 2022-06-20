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
import {ProgressBarModule} from 'primeng/progressbar';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';

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
    ProgressSpinnerModule,
    ProgressBarModule,
    CardModule,
    ToastModule
  ]
})
export class CoreModule { }
