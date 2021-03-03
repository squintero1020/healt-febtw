import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
    private authService: AuthService
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
    this.authService.getCompany()
    .then((res:any)=>{
      if(res.success){
        this.ClienteActual=res.result

      }else{
        //
      }
    })
    .catch(console.error);
  }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.headerStyle = (this.menuClass) ? 'none' : '';
    this.collapseStyle = (this.menuClass) ? 'block' : 'none';
  }

}
