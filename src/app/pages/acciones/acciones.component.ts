import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { AccionesService } from "../../shared/services/acciones.service";
import { Router } from "@angular/router";
import { element } from "protractor";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-acciones",
  templateUrl: "./acciones.component.html",
  styleUrls: ["./acciones.component.scss"],
})
export class AccionesComponent implements OnInit {
  dtColumnsSearchingOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  accione$: any;

  constructor(
    public apiAccionesService: AccionesService,
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
        this.apiAccionesService
          .getByCompany(localStorage.getItem("clienteId"))
          .then((res: any) => {
            this.spinner.hide();
            this.accione$ = res.result;

            callback({
              recordTotal: 10,
              recordsFiltered: "",
              data: that.accione$,
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
          title: "Descripción",
          data: "descripcion",
        },
        {
          title: "Acciones",
          render: function (data: any, type: any, full: any) {
            return (
              '<button type="button" class="btn btn-icon btn-rounded fa fa-search" type-data-id="' +
              full.accionId +
              '"></button>&nbsp; <button type="button" class="btn btn-icon btn-rounded fa fa-trash" update-data-id="' +
              full.accionId +
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
        this.router.navigateByUrl(
          `acciones/formularioAcciones/${event.target.getAttribute(
            "type-data-id"
          )}`
        );
      }
    });

    this.renderer.listen(this.elRef.nativeElement, "click", (event) => {
      if (event.target.hasAttribute("update-data-id")) {
        this.apiAccionesService
          .Deactivate(event.target.getAttribute("update-data-id"))
          .then((res: any) => {
            console.log(res);
            if (res.success) {
              this.ngOnInit();
              window.location.reload()
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
