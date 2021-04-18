import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { LocalService } from 'src/app/shared/services/local.service';
import {DattaConfig} from '../../../../app-config';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() onNavCollapsedMob = new EventEmitter();
  public dattaConfig: any;
  public navCollapsedMob;
  public headerStyle: string;
  public menuClass: boolean;
  public collapseStyle: string;

  ClienteActual: any = "Cargando...";

  constructor(
    private LocalStorage: LocalService
  ) {
    this.dattaConfig = DattaConfig.config;
    this.navCollapsedMob = false;
    this.headerStyle = '';
    this.menuClass = false;
    this.collapseStyle = 'none';
  }

  ngOnInit() {
    this.loadCliente()

  }

  loadCliente(){
    this.ClienteActual = this.LocalStorage.getJsonValue('empresa');
  }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.headerStyle = (this.menuClass) ? 'none' : '';
    this.collapseStyle = (this.menuClass) ? 'block' : 'none';
  }

}
