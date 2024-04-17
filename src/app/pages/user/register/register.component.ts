import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UserCreated } from 'src/app/shared/domains/user/user-created';
import { UserService } from 'src/app/shared/services/user/user.service';
import { passwordMatchValidator } from 'src/app/shared/utils/password.match.validator';
import { GlobalFunctions } from 'src/app/shared/utils/back';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(
    private userService: UserService,
    private router: Router,
    public functions: GlobalFunctions,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

  }

  form = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    name: new FormControl<string>('', {
      validators: [
        Validators.required, Validators.minLength(3), Validators.maxLength(50)
      ]
    }),
    email: new FormControl<string>('', {
      validators: [
        Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]
    }),
    password: new FormControl(null, {
      validators: [
        Validators.required, Validators.minLength(6), Validators.maxLength(20)
      ]
    }),
    passwordConfirmation: new FormControl(null, {
      validators: [
        Validators.required, Validators.minLength(6), Validators.maxLength(20)
      ]
    }),

  }, { validators: passwordMatchValidator } );

  get id(): FormControl {
    return this.form.controls['id'];
  }

  get name(): FormControl {
    return this.form.controls['name'];
  }

  get password(): FormControl {
    return this.form.controls['password'];
  }

  get passwordConfirmation(): FormControl {
    return this.form.controls['passwordConfirmation'];
  }

  get email(): FormControl {
    return this.form.controls['email'];
  }

  send() {

    const user: UserCreated = {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      passwordConfirmation: this.passwordConfirmation.value
    }

    this.userService.save(user).subscribe({
      next: (response) => {
        this.messageService.add({severity:'success', summary: 'Successo', detail: 'Usuário cadastrado com sucesso.'});
        this.router.navigate(['users']);
      },
      error: (e) => {
        const messages: Message[]  = [];
        if(e?.error?.errors?.length > 0) {
          e?.error?.errors.forEach((erro: any) => {
            messages.push({severity:'error', summary: 'Error', detail: erro.message})
          });
        } else {
          messages.push({severity:'error', summary: 'Error', detail: e.error.message});
        }
        this.messageService.addAll(messages);
      }
    });
  }

}
