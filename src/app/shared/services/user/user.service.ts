import { Injectable } from '@angular/core';
import { UserServiceInterface } from './user-service.inteface';
import { Observable } from 'rxjs';
import { User } from '../../domains/user/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { UserCreated } from '../../domains/user/user-created';


@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceInterface {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.api;
  }

  save(user: UserCreated): Observable<User> {
    return this.http.post<User>(`${this.url}/users`, user);
  }

  update(user: User, id: number): Observable<User> {
    return this.http.put<User>(`${this.url}/users/${id}`, user);
  }

  merge(user: User, id: number): Observable<User> {
    return this.http.patch<User>(`${this.url}/users/${id}`, user);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }

  findAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.url}/users`);
  }

  delete(user: User): Observable<any> {
    return this.http.delete<Array<any>>(`${this.url}/users`, { body: user});
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<User>(`${this.url}/users/${id}`);
  }

}
