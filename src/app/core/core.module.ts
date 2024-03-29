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
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {KeyFilterModule} from 'primeng/keyfilter';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {FileUploadModule} from 'primeng/fileupload';
import { AngularCropperjsModule } from 'angular-cropperjs';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TabViewModule} from 'primeng/tabview';
import {SplitterModule} from 'primeng/splitter';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {SidebarModule} from 'primeng/sidebar';
import {SliderModule} from 'primeng/slider';
import { TagModule } from 'primeng/tag';

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
    ToastModule,
    InputMaskModule,
    InputNumberModule,
    KeyFilterModule,
    PasswordModule,
    DividerModule,
    FileUploadModule,
    AngularCropperjsModule,
    ConfirmDialogModule,
    TabViewModule,
    SplitterModule,
    CascadeSelectModule,
    SidebarModule,
    SliderModule,
    TagModule
  ]
})
export class CoreModule { }
