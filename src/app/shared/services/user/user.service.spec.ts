import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../domains/user/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserCreated } from '../../domains/user/user-created';

const listMock: Array<User> = [
  { id: 1, name: "Teste 1", email: "teste1@gmail.com" }, { id: 2, name: "Teste 2", email: "teste2@gmail.com" }
]
const userMock: User = { id: 1, name: "Teste 1", email: "teste1@gmail.com" }

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let http: HttpTestingController;

  beforeEach(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  });

  it('should created service', () => {
    expect(service).toBeTruthy();
  });

  it('should be list users', () => {

    let users: Array<User> = [];

    spyOn(httpClient, 'get').and.returnValue(of(listMock))

    let response = service.findAll();
    expect(response).toBeInstanceOf(Observable);

    response.subscribe(data => users = data );

    expect(users).toHaveSize(2);
    expect(users).not.toBeNull();
    expect(users).toEqual(listMock);

  });

  it('should return the user by id', () => {

    let user!: User;
    spyOn(httpClient, 'get').and.returnValue(of(userMock))

    let response = service.findById(1);
    expect(response).toBeInstanceOf(Observable);

    response.subscribe(data => user = data );

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Observable);

    expect(user.id).toEqual(userMock.id);
    expect(user.name).toEqual(userMock.name);
    expect(user.email).toEqual(userMock.email);

  });

  it('should save a new user', () => {

    let user!: User;
    const userCreated: UserCreated = { id: 3, name: 'Teste 3', email: 'teste3@gmail.com', password: '123456', passwordConfirmation: '123456' };
    spyOn(httpClient, 'post').and.returnValue(of({ id: 3, name: 'Teste 3', email: 'teste3@gmail.com' }))

    let response = service.save(userCreated);
    expect(response).toBeInstanceOf(Observable);

    response.subscribe(data => user = data );

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Observable);

    expect(user.id).toEqual(userCreated.id);
    expect(user.name).toEqual(userCreated.name);
    expect(user.email).toEqual(userCreated.email);

  });

  it('should edit a user', () => {

    let user!: User;
    const edit: User = { id: 3, name: 'Teste 3 - Edit', email: 'teste3@gmail.com' };
    spyOn(httpClient, 'put').and.returnValue(of({ id: 3, name: 'Teste 3 - Edit', email: 'teste3@gmail.com' }))

    let response = service.update(edit, 3);
    expect(response).toBeInstanceOf(Observable);

    response.subscribe(data => user = data );

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Observable);

    expect(user.id).toEqual(edit.id);
    expect(user.name).toEqual(edit.name);
    expect(user.email).toEqual(edit.email);

  });

  it('should merge a user', () => {

    let user!: User;
    const merge: User = { id: 3, name: 'Teste 3 - Merge', email: 'teste3@gmail.com' };
    spyOn(httpClient, 'patch').and.returnValue(of({ id: 3, name: 'Teste 3 - Merge', email: 'teste3@gmail.com' }))

    let response = service.merge(merge, 3);
    expect(response).toBeInstanceOf(Observable);

    response.subscribe(data => user = data );

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Observable);

    expect(user.id).toEqual(merge.id);
    expect(user.name).toEqual(merge.name);
    expect(user.email).toEqual(merge.email);

  });

  it('should delete a user', () => {

    let statusCode!: number;

    const user: User = { id: 3, name: 'Teste 3 - Merge', email: 'teste3@gmail.com' };
    spyOn(httpClient, 'delete').and.returnValue(of({ statusCode: 204 }))

    let response = service.delete(user);
    response.subscribe(response => statusCode = response.statusCode );

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Observable);
    expect(statusCode).toEqual(204);

  });

  it('should delete a user by id', () => {

    let statusCode!: number;
    spyOn(httpClient, 'delete').and.returnValue(of({ statusCode: 204 }))

    let response = service.deleteById(3);
    response.subscribe(response => statusCode = response.statusCode );

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(Observable);
    expect(statusCode).toEqual(204);

  });

});
