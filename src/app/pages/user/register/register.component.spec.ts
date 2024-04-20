import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { of } from 'rxjs';
import { UserCreated } from 'src/app/shared/domains/user/user-created';
import { PFieldRequiredComponent } from 'src/app/shared/components/p-field-required/p-field-required.component';
import { PErrorComponent } from 'src/app/shared/components/p-error/p-error.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

const userCreated: UserCreated = { id: 1, name: "Teste 1", email: "teste1@gmail.com", password: '123456', passwordConfirmation: '123456' }


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let messageService: MessageService;
  let router: Router;


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ConfirmDialogModule, TableModule, ReactiveFormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [
            { path: '', component: RegisterComponent },
            { path: 'users', component: RegisterComponent },
          ]
        )],
      declarations: [PFieldRequiredComponent, PErrorComponent],
      providers: [
        UserService, ConfirmationService, MessageService, Router
      ]
    });
    userService = TestBed.inject(UserService);
    messageService = TestBed.inject(MessageService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should save a new user', () => {

    spyOn(userService, 'save').and.returnValue(of(userCreated));

    spyOn(messageService, 'add');
    spyOn(router, 'navigate');
    component.send();

    expect(messageService.add).toHaveBeenCalledWith({severity:'success', summary: 'Successo', detail: 'Usuário cadastrado com sucesso.'});
    expect(router.navigate).toHaveBeenCalledWith(['users']);

  });

  it('should display name validation messages', () => {
    let errorMessageElement
    component.name.setValue('');
    component.name.markAsDirty();
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));

    expect(component.name.errors?.['required']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Nome é obrigatório.');

    component.name.setValue('ab');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.name.errors?.['minlength']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Nome deve conter no mínimo 3 caracteres.');

    component.name.setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.name.errors?.['maxlength']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Nome deve conter no máximo 50 caracteres.');

    component.name.setValue('Teste');
    fixture.detectChanges();
    expect(component.name.errors?.['required']).not.toBeTruthy();
    expect(component.name.errors?.['minlength']).not.toBeTruthy();
    expect(component.name.errors?.['maxlength']).not.toBeTruthy();

  });

  it('should display email validation messages', () => {
    let errorMessageElement

    component.email.setValue('');
    component.email.markAsDirty();
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));

    expect(component.email.errors?.['required']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('E-mail é obrigatório.');

    component.email.setValue('teste');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.email.errors?.['email']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Insira um e-mail válido.');

    component.email.setValue('teste@gmail.com');
    fixture.detectChanges();
    expect(component.email.errors?.['required']).not.toBeTruthy();
    expect(component.email.errors?.['email']).not.toBeTruthy();
    expect(component.email.errors?.['pattern']).not.toBeTruthy();

  });

  it('should display password validation messages', () => {
    let errorMessageElement

    component.password.setValue('');
    component.password.markAsDirty();
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));

    expect(component.password.errors?.['required']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Senha é obrigatório.');

    component.password.setValue('12345');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.password.errors?.['minlength']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Senha deve conter no mínimo 6 caracteres.');

    component.password.setValue('123456789123456789123');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.password.errors?.['maxlength']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Senha deve conter no máximo 20 caracteres.');

    component.password.setValue('123456');
    fixture.detectChanges();
    expect(component.password.errors?.['required']).not.toBeTruthy();
    expect(component.password.errors?.['minlength']).not.toBeTruthy();
    expect(component.password.errors?.['maxlength']).not.toBeTruthy();

  });

  it('should display password validation messages', () => {
    let errorMessageElement
    component.password.setValue('123456');

    component.passwordConfirmation.setValue('');
    component.passwordConfirmation.markAsDirty();
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));

    expect(component.passwordConfirmation.errors?.['required']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Confirmação de senha é obrigatório.');

    component.passwordConfirmation.setValue('12345');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.passwordConfirmation.errors?.['minlength']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Confirmação de senha deve conter no mínimo 6 caracteres.');

    component.passwordConfirmation.setValue('123456789123456789123');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.passwordConfirmation.errors?.['maxlength']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('Confirmação de senha deve conter no máximo 20 caracteres.');

    component.passwordConfirmation.setValue('654321');
    fixture.detectChanges();
    errorMessageElement = fixture.debugElement.query(By.css('.p-error'));
    expect(component.form.errors?.['passwordMismatch']).toBeTruthy();
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent).toContain('As senhas não são iguais');

    component.passwordConfirmation.setValue('123456');
    fixture.detectChanges();
    expect(component.passwordConfirmation.errors?.['required']).not.toBeTruthy();
    expect(component.passwordConfirmation.errors?.['minlength']).not.toBeTruthy();
    expect(component.passwordConfirmation.errors?.['maxlength']).not.toBeTruthy();
    expect(component.form.errors?.['passwordMismatch']).not.toBeTruthy();

  });

  it('should check the status of the save button', () => {
    let submitButton;

    component.name.setValue('');
    component.email.setValue('');
    component.password.setValue('');
    component.passwordConfirmation.setValue('');
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBe(true);

    component.name.setValue('Teste');
    component.email.setValue('teste@gmail.com');
    component.password.setValue('123456');
    component.passwordConfirmation.setValue('123456');
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBe(false);

  });

});
