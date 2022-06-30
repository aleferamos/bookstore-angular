import { SystemComponent } from './modules/admin/system/system.component';
import { LoginComponent } from './modules/admin/login/login.component';
import { SellComponent } from './modules/layout/sell/sell.component';
import { ResetPasswordComponent } from './modules/layout/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './modules/layout/forgot-password/forgot-password.component';
import { HomeComponent } from './modules/layout/home/home.component';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutComponent } from './modules/layout/layout_component/layout.component';
import { LayoutModule } from './modules/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptorService } from './shared/service/Spinner_request/spinner-interceptor.service';
import { EditorImgComponent } from './components/editor-img/editor-img.component';
import { AdminModule } from './modules/admin/admin.module';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SpinnerComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SellComponent,
    EditorImgComponent,
    LoginComponent,
    SystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
