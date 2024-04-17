import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

import { UserComponent } from './list/user.component';
import { RegisterComponent } from './register/register.component';
import { PErrorComponent } from 'src/app/shared/components/p-error/p-error.component';
import { PFieldRequiredComponent } from 'src/app/shared/components/p-field-required/p-field-required.component';

@NgModule({
  declarations: [
    UserComponent,
    RegisterComponent,
    PErrorComponent,
    PFieldRequiredComponent
  ],
  imports: [
    CommonModule,

    UserRoutingModule,

    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ConfirmDialogModule,
    TooltipModule
  ]
})
export class UserModule { }
