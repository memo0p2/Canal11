import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../entidades/Todo';
import { TestService } from '../test.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  arrTodo: Todo []=[];
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];
  idActual: number = 0;
  constructor(
    private router: Router,
    private test: TestService
    ) {

  }

  ngOnInit(): void {
    this.test.getindexUserData$().subscribe((response:number)=>{
      this.idActual=response;
      this.test.getDBTodo().subscribe((response: Todo[])=>{
        this.arrTodo=response.filter(todo =>{
          return todo.userId === this.idActual;
        });
      })
    })

    
    
  }

}
