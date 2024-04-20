import { Observable } from "rxjs";

export interface BaseServiceInterface<E> {
  save(entity: E): Observable<E>;
  merge(entity: E, id: number): Observable<E>;
  update(entity: E, id: number): Observable<E>;
  findById(id: number): Observable<E>;
  findAll(): Observable<Array<E>>;
  delete(entity: E): Observable<void>;
  deleteById(id: number): Observable<void>;
}
