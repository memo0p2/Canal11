import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Todo } from './entidades/Todo';
import { Usuario } from './entidades/Usuario';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private indexUserData$: BehaviorSubject<number>;

  constructor(
    private httpClient : HttpClient,
  ) { 
    this.indexUserData$ = new BehaviorSubject<number>(0);
  }

  public getDBUser(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>('https://jsonplaceholder.typicode.com/users',)
      .pipe(
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  public getDBTodo(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>('https://jsonplaceholder.typicode.com/todos',)
      .pipe(
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  getindexUserData$(): Observable<number>{
    return this.indexUserData$.asObservable()
  }

  setindexUserData$( newVal: any): void{
    this.indexUserData$.next(newVal);
  }

}
