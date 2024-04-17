import { Observable } from "rxjs";

export interface BaseServiceInterface<E> {
  save(user: E): Observable<E>;
  merge(user: E, id: number): Observable<E>;
  update(user: E, id: number): Observable<E>;
  findById(id: number): Observable<E>;
  findAll(): Observable<Array<E>>;
  delete(user: E): Observable<void>;
  deleteById(id: number): Observable<void>;
}
