import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/shared/services/local.service';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {

  ClienteActual: any = "Cargando..."

  constructor(
    private LocalStorage: LocalService,
  ) { }

  ngOnInit() {
    this.loadCliente()
  }

  loadCliente(){
    this.ClienteActual = this.LocalStorage.getJsonValue('empresa');
  }

}
