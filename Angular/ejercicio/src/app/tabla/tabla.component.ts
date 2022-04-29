import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../entidades/Usuario';
import { TestService } from '../test.service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  arrUsuarios: Usuario []=[];
  displayedColumns: string[] = ['id', 'username', 'email', 'phone','todo'];
  idActual: number = 0;
  constructor(
    private router: Router,
    private test: TestService
    ) {

  }

  ngOnInit(): void {
    this.test.getDBUser().subscribe((response: Usuario[])=>{
      this.arrUsuarios = response;
    })
  }

  CambiarNumero(id: number): void{
    this.test.setindexUserData$(id);
  }

}
