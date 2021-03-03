import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { GruposService } from '../../shared/services/grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  dtColumnsSearchingOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  grupo$: any;
  clienteId = localStorage.getItem("clienteId")
  constructor(
    public apiGruposService: GruposService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    const that = this;
    this.dtColumnsSearchingOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.apiGruposService
          .getByCompany(this.clienteId)
          .then((res: any) => {
            this.grupo$ = res.result;
            this.spinner.hide();
            callback({
              recordTotal: 10,
              recordsFiltered: "",
              data: that.grupo$,
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
          title: "Acciones",
          render: function (data: any, type: any, full: any) {
            return (
              '<button type="button" class="btn btn-icon btn-rounded fa fa-search" type-data-id="' +
              full.grupoId +
              '"></button>&nbsp; <button type="button" class="btn btn-icon btn-rounded fa fa-trash" update-data-id="' +
              full.grupoId +
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
        this.router.navigateByUrl(`grupos/formularioGrupos/${event.target.getAttribute("type-data-id")}`)
      }
    });

      this.renderer.listen(this.elRef.nativeElement, "click", (event) => {
        if (event.target.hasAttribute("update-data-id")) {
          this.apiGruposService
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
