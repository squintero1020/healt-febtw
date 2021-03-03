import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProveedoresService } from '../../shared/services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  dtColumnsSearchingOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  provedoore$: any;

  constructor(
    public apiProveedoresService: ProveedoresService,
    private elRef: ElementRef,
    private render: Renderer2,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    const that = this;
    this.dtColumnsSearchingOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.apiProveedoresService
          .getByCompany(localStorage.getItem('clienteId'))
          .then((res: any) => {
            this.spinner.hide();
            this.provedoore$ = res.result;
            callback({
              recordTotal: 10,
              recordsFiltered: "",
              data: that.provedoore$,
            });
          })
          .catch(console.log);
      },
      columns: [
        {
          title: "Nombre",
          data: "nombre",
          className: "notraslate",
        },
        {
          title: "Nit",
          data: "nit",
          className: "notraslate",
        },
        {
          title: "Correo",
          data: "correo",
          className: "notraslate",
        },
        {
          title: "Teléfono",
          data: "telefono",
          className: "notraslate",
        },
        {
          title: "Acciones",
          render: function (data: any, type: any, full: any) {
            return (
              '<button type="button" class="btn btn-icon btn-rounded fa fa-search" type-data-id="' +
              full.proveedorId +
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
    this.render.listen(this.elRef.nativeElement, "click", (event) => {
      if (event.target.hasAttribute("type-data-id")) {
        // alert(event.target.getAttribute("type-data-id"));
        this.router.navigateByUrl(`proveedores/formularioProveedores/${event.target.getAttribute("type-data-id")}`)
      }
    });
  }


}
