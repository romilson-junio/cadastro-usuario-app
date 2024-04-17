import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './shared/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { UserModule } from './pages/user/user.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PErrorComponent } from './shared/components/p-error/p-error.component';
import { PFieldRequiredComponent } from './shared/components/p-field-required/p-field-required.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    UserModule,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TabViewModule,
    ButtonModule,
    ToastModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
