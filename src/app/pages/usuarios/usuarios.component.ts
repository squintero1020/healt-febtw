import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { UsuariosService } from "../../shared/services/usuarios.service";
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss"],
})
export class UsuariosComponent implements OnInit {
  dtColumnsSearchingOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  usuarios: any;

  constructor(
    public apiUsuariosService: UsuariosService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}


  ngOnInit() {
    this.spinner.show();
    const that = this;
    this.dtColumnsSearchingOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.apiUsuariosService
          .getByCompany()
          .then((res: any) => {
            this.spinner.hide();

            this.usuarios = res.result;
            callback({
              recordTotal: 10,
              recordsFiltered: "",
              data: that.usuarios,
            });
          })
          .catch(console.log);
      },
      columns: [
        {
          title: "Nombres",
          data: "nombres",
          className: "notraslate",
        },
        {
          title: "Correo",
          data: "correo",
        },
        {
          title: "Teléfono",
          render: function (data: any, type: any, full: any) {
            return full.telefono;
          },
        },
        {
          title: "Acciones",
          render: function (data: any, type: any, full: any) {
            return (
              '<button type="button" class="btn btn-icon btn-rounded fa fa-search" type-data-id="' +
              full.usuarioId +
              '"></button>'
            );
          },
        },
      ],
      order: [[1, "desc"]],
      scrollY: "100%",
      scrollCollapse: true,
      responsive: true,
      dom: "lBfrtip",
      buttons: ["copy", "print", "excel"],
    };
  }

  ngAfterViewInit() {
    this.renderer.listen(this.elRef.nativeElement, "click", (event) => {
      if (event.target.hasAttribute("type-data-id")) {
        // alert(event.target.getAttribute("type-data-id"));
        this.router.navigateByUrl(`usuarios/formularioUsuario/${event.target.getAttribute("type-data-id")}`)
      }
    });
  }

}
