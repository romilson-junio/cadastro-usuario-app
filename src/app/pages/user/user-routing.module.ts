import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './list/user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'edit',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
