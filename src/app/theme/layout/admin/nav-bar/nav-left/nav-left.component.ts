import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {

  ClienteActual: any = "Cargando..."

  constructor(
    private authService: AuthService,
  ) { }

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

}
