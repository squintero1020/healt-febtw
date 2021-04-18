import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {

  loading:boolean= false;
  tittleCard: string = 'Crear Usuario';

  UsuariosForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.UsuariosForm = new FormGroup({
      Id            : new FormControl('', Validators.required),
      CompanyID     : new FormControl('',Validators.required),
      NIT           : new FormControl(),
      Documento     : new FormControl('',Validators.required),
      Nombre        : new FormControl('',Validators.required),
      Departamento  : new FormControl('',Validators.required),
      Telefono      : new FormControl(),
      Movil         : new FormControl(),
      Mail          : new FormControl('',[Validators.required,Validators.email]),
      Fcrea         : new FormControl(),
      Pass          : new FormControl('',Validators.required),
      ConPass       : new FormControl('',Validators.required),
      SCP           : new FormControl(),
      Rol           : new FormControl('',Validators.required),
      Sistema       : new FormControl(),
      FModifica     : new FormControl(),
      UsModifica    : new FormControl()
    });
  }

  get f(){
    return this.UsuariosForm.controls;
  }

  save(){
    
  }
}
