import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FlujosService } from '../../shared/services/flujos.service';

@Component({
  selector: 'app-flujos',
  templateUrl: './flujos.component.html',
  styleUrls: ['./flujos.component.scss']
})
export class FlujosComponent implements OnInit {

  dtColumnsSearchingOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  flujo$: any;

  constructor(
    public apiFlujosSerice: FlujosService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(){
    this.spinner.show();
    const that = this;
    this.dtColumnsSearchingOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.apiFlujosSerice
          .getByCompany(localStorage.getItem('clienteId'))
          .then((res: any) => {
            this.spinner.hide();
            this.flujo$ = res.result;
            console.log(res);
            
            callback({
              recordTotal: 10,
              recordsFiltered: "",
              data: that.flujo$,
            });
          })
          .catch(console.log);
      },
      columns: [
        {
          title: "Nombres",
          data: "nombre",
          className: "notraslate",
        },
        {
          title: "Acciones",
          render: function (data: any, type: any, full: any) {
            return (
              '<button type="button" class="btn btn-icon btn-rounded fa fa-search" type-data-id="' +
              full.flujoId +
              '"></button>&nbsp; <button type="button" class="btn btn-icon btn-rounded fa fa-trash" update-data-id="' +
              full.encabezadoFlujoId +
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
        this.router.navigateByUrl(`flujos/formularioFlujos/${event.target.getAttribute("type-data-id")}`)
      }
    });

    this.renderer.listen(this.elRef.nativeElement, "click", (event) => {
      if (event.target.hasAttribute("update-data-id")) {
        this.apiFlujosSerice
          .Deactivate(event.target.getAttribute("update-data-id"))
          .then((res: any) => {
            console.log(res);
            if (res.success) {
              window.location.reload();
            }else{
              Swal.fire(
                'Error',
                'Hubo un error al eliminar',
                'error'
              )
            }
          })
          .catch(console.error);
      }
    });
  }

}
