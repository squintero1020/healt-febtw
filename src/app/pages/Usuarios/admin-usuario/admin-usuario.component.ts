import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { LocalService } from 'src/app/shared/services/local.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.scss']
})
export class AdminUsuarioComponent implements OnInit {

  dtColumnSearchingOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  loading:boolean=false;

  usuarios:any;
  
  constructor(private apiUsuarioService : UsuariosService, private LocalStorage : LocalService) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData(){
    this.loading = true;
    let usuario = this.LocalStorage.getJsonValue('usuario');
    this.dtColumnSearchingOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.apiUsuarioService.getByCompany(usuario.CompanyID,usuario.NIT)
        .then((res_usuarios:any)=>{
          if(res_usuarios.success){
            callback({
              recordsTotal: 10,
              recordsFiltered: 'SETT6145',
              data: res_usuarios.result
            });
          }
          this.loading =false;
        })
        .catch((error: any) => {
          this.loading = false;
          console.log(error);
        });
      },
      columns: [
        {
          title: 'ID Usuario',
          data: 'Id',
          className:'notranslate'
        },{
        title: 'Nombre',
        data: 'Nombre',
        className:'notranslate'
        },{
          title: 'Departamento',
          data: 'Departamento',
          className: 'notranslate'
        },
        {
        title: 'Teléfono',
        data: 'Telefono',
        className: 'notranslate'
        },
        {
          title: 'Email',
          data: 'Mail',
          className: 'notranslate'
        },
        {
          title: 'ACCIONES',
          render: function(data: any, type: any, full: any){
            return '<button type="button" class="btn btn-icon btn-rounded fa fa-search" usario-id="' + full.Id + '"></button>';
          },
          className: 'dt-body-right notranslate'
        }
      ],
      scrollY:"250px",
      order: [[0, "desc"]],
      pagingType: 'full_numbers',
      scrollCollapse:true,
      responsive: true,
      dom: 'lBfrtip',
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    };


  }
}
