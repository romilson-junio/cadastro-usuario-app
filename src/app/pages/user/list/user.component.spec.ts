import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/domains/user/user';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const list: Array<User> = [
  { id: 1, name: "Teste 1", email: "teste1@gmail.com" }, { id: 2, name: "Teste 2", email: "teste2@gmail.com" }
]

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let userServiceMock: Partial<UserService>;
  let messageService: MessageService;

  beforeEach(async () => {
    userServiceMock = {
      findAll: (): Observable<Array<User>> => of(list),
      merge: (user: User, id: number): Observable<User> => of({ id: 1, name: 'Teste 1 - Edit', email: 'teste1@gmail.com'})
    };
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();

  });

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ConfirmDialogModule, TableModule, FormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [
            { path: '', component: UserComponent },
            { path: 'users', component: UserComponent }
          ]
        )],
      providers: [
        ConfirmationService, UserService, MessageService,
        { provide: UserService, useValue: userServiceMock }
      ]
    });
    userServiceMock = TestBed.inject(UserService);
    userService = TestBed.inject(UserService);
    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {

    spyOn(userService, 'findAll').and.returnValue(of(list));

    component.list();

    expect(component.users[0].id).toEqual(list[0].id);
    expect(component.users[0].name).toEqual(list[0].name);
    expect(component.users[0].email).toEqual(list[0].email);

    expect(component.users[1].id).toEqual(list[1].id);
    expect(component.users[1].name).toEqual(list[1].name);
    expect(component.users[1].email).toEqual(list[1].email);
  });


  it('should return an empty list', () => {

    spyOn(userService, 'findAll').and.returnValue(of([]));
    spyOn(messageService, 'add');

    component.list();

    expect(messageService.add).toHaveBeenCalledWith({severity: 'warn', summary: 'Alerta', detail: 'Nenhum registro encontrado.'});

  });

  it('should check user editing and edit buttons', () => {

    let user: User = component.users[0];

    spyOn(component, 'valueChange').and.returnValue(true);

    const btnEdit: HTMLButtonElement = fixture.nativeElement.querySelector('[pTooltip="Editar"]');
    expect(btnEdit).toBeTruthy();
    btnEdit.click();
    fixture.detectChanges();
    expect(user.editing).toBeTrue();

    const btnCancel: HTMLButtonElement = fixture.nativeElement.querySelector('[pTooltip="Cancelar"]');
    expect(btnCancel).toBeTruthy();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector(`#input_${user.id}`);
    expect(inputElement).toBeTruthy();
    inputElement.value = 'Teste 1';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const btnSave: HTMLButtonElement = fixture.nativeElement.querySelector('[pTooltip="Salvar"]');
    expect(btnSave).toBeTruthy();

    btnSave.click();
    fixture.detectChanges();
    expect(user.name).toEqual('Teste 1');
    expect(user.editing).toBeFalse();

  });

  it('should check user deletion', () => {

    const btnDelete: HTMLButtonElement = fixture.nativeElement.querySelector('[pTooltip="Excluir"]');
    expect(btnDelete).toBeTruthy();
    btnDelete.click();
    fixture.detectChanges();

    const confirmation: HTMLElement = fixture.nativeElement.querySelector('#confirmation');
    expect(confirmation).toBeTruthy();

  });

  it('should cancel editing', () => {

    let user: User = component.users[0];
    let userNameOrigin: string = user.name;
    component.nameUserDB = user.name;

    component.canceling(user);

    expect(user.editing).toBeFalse();
    expect(user.name).toEqual(userNameOrigin);

  });

  it('should check if there has been a name change', () => {
    let user: User = component.users[0];
    component.nameUserDB = user.name;
    expect(component.valueChange(user)).toBeFalse();

    component.nameUserDB = "Teste 1 - Edit"
    expect(component.valueChange(user)).toBeTrue();
  });

  it('should cancel editing when input loses focus', () => {
    let user: User = component.users[0];
    spyOn(component, 'valueChange').and.returnValue(false);
    spyOn(component, 'canceling').and.callThrough();
    component.blur(user);

    expect(component.canceling).toHaveBeenCalled();
  });

});
