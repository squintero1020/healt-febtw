import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FacturasService } from "../../shared/services/facturas.service";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { EstadosService } from "../../shared/services/estados.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgregarComentariosFacturaComponent } from "../../components/modales/agregar-comentarios-factura/agregar-comentarios-factura.component";
import { DisparadoresService } from "../../shared/services/disparadores.service";
import { Factura } from "../../shared/models/factura";
import { CambiarFlujoComponent } from "../../components/modales/cambiar-flujo/cambiar-flujo.component";
import { FlujosService } from "src/app/shared/services/flujos.service";
import { FacturasFlujoService } from "../../shared/services/facturas-flujo.service";
import { AccionesService } from "../../shared/services/acciones.service";
import { EpicorService } from "../../shared/services/epicor.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { MenuComponent } from "src/app/shared/popup/menu/menu.component";
import { Observable } from "rxjs";
import { SignalRServiceService } from "src/app/shared/services/signal-rservice.service";
interface facturaData {
  facturaId: number;
  numero: string;
  fechaFactura: string;
  nombreProveedor: string;
  correoProveedor: string;
  dayInGdoc: number;
  estadoId: any;
  accionId: any;
  firmaDig: boolean;
  fiscalIdProveedor: string;
  formaPago: string;
  medioPago: string;
  plazoPagoDias: number;
  quienFirma: string;
  tipoDocumento: string;
  moneda: string;
  nOrdenCompra: string;
  subtotal: number;
  impuestos: number;
  total: number;
  comentarios: string;
  encabezadoFlujoId: any;
  canModify: boolean;
}

@Component({
  selector: "app-facturas",
  templateUrl: "./facturas.component.html",
  styleUrls: ["./facturas.component.scss"],
})
export class FacturasComponent implements OnInit {

  loading:boolean=false;
  MessageLoading:string='';

  globalFilter: any = "";
  static getFacturas() {
    throw new Error("Method not implemented.");
  }
  factura$: Factura[] = [];

  data: facturaData[] = [];

  dateI: Date = new Date();
  dateF: Date = new Date();

  dataSource: MatTableDataSource<facturaData>;

  displayedColumns: string[] = [
    "numero",
    "fechaFactura",
    "nombreProveedor",
    "correoProveedor",
    "dayInGdoc",
    "estadoId",
    "accionId",
    "firmaDig",
    "fiscalIdProveedor",
    "encabezadoFlujoId",
    "formaPago",
    "medioPago",
    "plazoPagoDias",
    "quienFirma",
    "tipoDocumento",
    "moneda",
    "nOrdenCompra",
    "subtotal",
    "impuestos",
    "total",
    "acciones",
  ];

  disparadoresss: string[] = [];

  filterSelectObj: any[] = [
    {
      name: "Proveedor",
      columnProp: "nombreProveedor",
    },
    {
      name: "Flujo",
      columnProp: "encabezadoFlujoId",
    },
    {
      name: "Estado",
      columnProp: "estadoId",
    },
    {
      name: "Accion",
      columnProp: "accionId",
    },
  ];

  filterValues = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estado$: any;
  flujo$: any;
  accione$: any;
  ClienteActual: any;
  constructor(
    private signalRService: SignalRServiceService,
    private apiFacturaService: FacturasService,
    private spinner: NgxSpinnerService,
    private apiEstadosService: EstadosService,
    private modal: NgbModal,
    private paginatorVar: MatPaginatorIntl,
    private apiDisparadoresService: DisparadoresService,
    private apiFlujosService: FlujosService,
    private apiFacturasFlujoService: FacturasFlujoService,
    private apiAccionService: AccionesService,
    private apiEpicorServce: EpicorService,
    private authService: AuthService,
    private router: Router
  ) {}

  signalrConnectionEstablished$: Observable<boolean>;
  chatmessages = [];

  ngOnInit() {
    this.signalrConnectionEstablished$ = this.signalRService.connectionEstablished$;
    this.signalRService.messageReceived$.subscribe(() => {
      Swal.fire("Notificación", "Tienes facturas nuevas", "success").then(
        (res) => {
          window.location.reload();
        }
      );
    });

    this.paginatorVar.itemsPerPageLabel = "Items por página";
    
    this.loading=true;
    this.MessageLoading="Estamos cargando las facturas, un momento...";
    this.getEstados();
    this.getAcciones();

    //

    this.authService
      .getCompany()
      .then((res: any) => {
        if (res.success) {
          this.ClienteActual = res;
        } else {
          //
        }
      })
      .catch(console.error);
  }

  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });

    return uniqChk;
  }

  async getDisparadores() {
    this.apiDisparadoresService.getByCompany().then((res: any) => {
      this.disparadoresss = res.result;
      this.getFlujos();
    });
  }

  getAcciones() {
    this.apiAccionService
      .getByCompany(localStorage.getItem("clienteId"))
      .then((res: any) => {
        this.accione$ = res.result;
        this.getFacturas();
        console.log(this.accione$);
      });
  }

  getEstados() {
    this.apiEstadosService.getEstados().then((res: any) => {
      this.estado$ = res.result;
      this.getDisparadores();
    });
  }

  getFlujos() {
    this.apiFlujosService
      .getByCompany(localStorage.getItem("clienteId"))
      .then((res: any) => {
        this.flujo$ = res.result;
        this.getAcciones();
      });
  }

  public getFacturas() {
    this.loading=true;
    this.MessageLoading="Estamos cargando las facturas, un momento...";
    setTimeout(() => {
      this.apiFacturaService
        .getByCompany(localStorage.getItem("clienteId"))
        .then((res: any) => {
          console.log(res);

          this.data = [];
          if (!res.success) {
            if (localStorage.getItem("rolId")) {
              Swal.fire(
                "Esta cuenta no tiene rol asociado",
                "Porfavor comuníquese con el administrador master para validar su rol y poder visualizar la información",
                "info"
              );
            }
            Swal.fire(
              "Notificación",
              res.message,
              "info"
            );
            this.loading=false;
          }
          this.factura$ = res.result;
          this.factura$.forEach((element) => {
            let nombreAccion = "";
            if (element.facturasFlujo) {
              if (element.facturasFlujo.length > 0) {
                let acciones = this.accione$.find(
                  (x) => x.accionId == element.facturasFlujo[0].accionId
                ).nombre;
                if (acciones !== undefined) {
                  if (acciones.length > 0) nombreAccion = acciones;
                }
              }
            }
            let nombreFlujo = "";
            if (element.encabezadoFlujoId) {
              let flujo = this.flujo$.find(
                (x) => x.flujoId == element.encabezadoFlujoId
              );
              if (flujo !== undefined) {
                nombreFlujo = flujo.nombre;
              }
            }
            let nombreEstado = 0;
            if (element.estadoId) {
              let estado = this.estado$.find(
                (x) => x.estadoId == element.estadoId
              );
              if (estado !== undefined) {
                nombreEstado = estado.nombre;
              }
            }

            const dato = {
              facturaId: element.facturaId,
              numero: element.nFactura,
              fechaFactura: element.fechaFactura,
              nombreProveedor: element.nombreProveedor,
              correoProveedor: element.correoProveedor,
              dayInGdoc: element.dayInGdoc,
              estadoId: nombreEstado,
              accionId:
                element.facturasFlujo != null &&
                element.facturasFlujo.length > 0
                  ? nombreAccion
                  : "Sin Acción",
              firmaDig: element.firmaDig ? true : false,
              fiscalIdProveedor: element.fiscalIdProveedor,
              formaPago: element.formaPago,
              encabezadoFlujoId: element.encabezadoFlujoId
                ? nombreFlujo
                : "Sin Flujo",
              medioPago: element.medioPago,
              plazoPagoDias: element.plazoPagoDias,
              quienFirma: element.quienFirma,
              tipoDocumento: element.tipoDocumento,
              moneda: element.moneda,
              nOrdenCompra: element.nOrdenCompra,
              subtotal: element.subtotal,
              impuestos: element.impuestos,
              total: element.total,
              comentarios: element.comentarios,
              canModify : element.canModify,
            };
            this.data.push(dato);
          });

          this.dataSource = new MatTableDataSource<facturaData>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          /*this.dataSource.filterPredicate = this.createFilter();
          this.filterSelectObj.filter((o) => {
            o.options = this.getFilterObject(this.data, o.columnProp);
          });*/

          this.loading=false;
        })
        .catch(console.log);
    }, 1000);
  }

  filterChange(filter, event) {
    this.filterValues[
      filter.columnProp
    ] = event.target.value.trim().toLowerCase();

    this.dataSource.filter = JSON.stringify(this.filterValues);

    console.log(this.dataSource.filter);
  }

  createFilter() {
    try {
      let filterFunction = function (data: any, filter: string): boolean {
        try {
          let searchTerms = JSON.parse(filter);
        } catch (error) {
          return false;
        }
        try {
          let searchTerms = JSON.parse(filter);
          let isFilterSet = false;
          for (const col in searchTerms) {
            if (searchTerms[col].toString() !== "") {
              isFilterSet = true;
            } else {
              delete searchTerms[col];
            }
          }

          let nameSearch = () => {
            let found = [];
            if (isFilterSet) {
              for (const col in searchTerms) {
                let searchTerm: string = searchTerms[col]
                  .replace(/ /g, "")
                  .trim()
                  .toLowerCase();
                if (
                  data[col]
                    .replace(/ /g, "")
                    .toString()
                    .toLowerCase()
                    .indexOf(searchTerm) != -1 &&
                  isFilterSet
                ) {
                  found.push(true);
                } else {
                  found.push(false);
                }
                /*searchTerm
                  //.trim()
                  .toLowerCase()
                  //.split(" ")
                  .forEach((word) => {
                    if (                  
                      data[col].replace(/ /g, "").toString().toLowerCase().indexOf(word) != -1 &&
                      isFilterSet
                    ) {
                      
                      found.push(true);
                    }else{
                      found.push(false)
                    }
                  });
                  */
              }
              const isBelowThreshold = (currentValue) => currentValue === true;
              return found.every(isBelowThreshold) ? true : false;
            } else {
              return true;
            }
          };
          return nameSearch();
        } catch (error) {
          return false;
        }
      };
      return filterFunction;
    } catch (error) {}
  }

  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = "";
  }

  //Acepta la factura (Usuario master)
  AceptOrRegect(facturaId: number, resp: boolean) {
    this.loading=true;
    this.apiFacturaService
      .AceptOrReject(facturaId, resp)
      .then((res: any) => {
        this.loading=false;
        if (res.success) {
          Swal.fire(
            "Se actualizó el estado de la factura",
            `la factura se : ${resp ? "Aceptó" : "Rechazó"}`,
            "success"
          );
        } else {
          Swal.fire(
            "Error",
            "Error en el cambio de estados de la factura",
            "error"
          );
        }
      })
      .catch(console.log);
    this.getFacturas();
  }

  //Consulta los correos con facturas (botón)
  getInvoice() {
    this.loading=true;
    try {
      let mailFilter = {
        Subject: "",
        From: "",
        DateI: this.dateI,
        DateF: this.dateF,
      };
      this.apiFacturaService
        .PullInvoiceFromMail(mailFilter)
        .then((res: any) => {
          this.loading=false;
          if (res.success) {
            if (res.result.length == this.data.length) {
              Swal.fire(
                "No se encontraron registros nuevos",
                "No hay nuevas facturas encontradas en el correo electrónico",
                "info"
              );
            } else {
              //RESULTADO
              this.getFacturas();
              Swal.fire(
                "La consulta fué un exito",
                "La consulta de las facturas pendientes en el correo electrónico fué un éxito",
                "success"
              );
            }
          }
        })
        .catch((err) => {
          this.loading=false;
          Swal.fire(
            "Error!",
            "Error en la lectura de los correos: " + err,
            "error"
          );
        });
      // .catch(console.error);
    } catch (error) {}
  }

  valSiTieneFlujo(row) {
    if (row.encabezadoFlujoId === "Sin Flujo") {
      return false;
    }
    return true;
  }

  //Abre el menú derecho por factura
  openMenu(e) {
    var factura: Factura = this.factura$.find(
      (x) => x.facturaId == e.facturaId
    );
    try {
      var modal = this.modal.open(MenuComponent, {
        ariaLabelledBy: "modal-basic-title",
        windowClass: "lateral-modal",
        backdrop: 'static',
        keyboard: false
      });

      modal.result.then(
        this.handleModalComponent.bind(this),
        this.handleModalComponent.bind(this)
      );
      modal.componentInstance.parent = "CCDOC";
      modal.componentInstance.factura = factura;
    } catch (error) {
      console.error(error);
    }
  }

  //Respuesta Menú derecho por factura
  handleModalComponent(response) {
    //ACA LA RESPUESTA DEL MENU POPUP, POS SI REQUIERES RETORNAR ALGUN DATO ENTRE COMPONENTES
    if (response === 0) return;
    this.loading=true;
    if (response.success) {
      if (response.process.toString() === "REJ") {
        this.loading=false;
        Swal.fire({
          title: "Notificación",
          text: "Se rechazó la factura",
          type: "success",
        }).then((res) => {
          console.log(res);
          window.location.reload();
        });
      }
      if (response.process.toString() === "ACPT") {
        this.loading=false;
        Swal.fire({
          title: "Notificación",
          text: "Se aceptó la factura",
          type: "success",
        }).then((res) => {
          window.location.reload();
        });
      }
      if (response.process.toString() === "Coment") {
        this.loading=false;
        Swal.fire({
          title: "Notificación",
          text: "Se ingresó el comentario",
          type: "success",
        }).then((res) => {
          window.location.reload();
        });
      }
      if (response.process.toString() === "ChangeFlow") {
        this.loading=false;
        Swal.fire({
          title: "Notificación",
          text: "Se cambió el flujo",
          type: "success",
        }).then((res) => {
          window.location.reload();
        });
      }
      if (response.process.toString() === "Escalar") {
        this.loading=false;
        Swal.fire({
          title: "Notificación",
          text: "Se ha escalado la factura",
          type: "success",
        }).then((res) => {
          window.location.reload();
        });
      }
    }
  }

  //Filtro por búsqueda
  applyFilter(filterValue: string) {
    /*let findFilter = false;
    this.displayedColumns.forEach(element => {
      if(findFilter) return;
      this.filterValues[element] = filterValue.trim().toLowerCase();
      //console.log('JSON.filter',JSON.stringify(this.filterValues));

      this.dataSource.filter = filterValue.trim().toLowerCase();  
      if(this.dataSource.filteredData.length > 0) {
        findFilter = true;
        return;
      }
      this.filterValues = {};
    });*/

    //console.log(JSON.stringify(this.filterValues))

    /*if(findFilter){
      this.dataSource.filter="";
      this.dataSource.filter = JSON.stringify(this.filterValues); 
    }*/

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.filter) {
      this.dataSource.paginator.firstPage();
    }

    // this.filterValues[
    //   filter.columnProp
    // ] = event.target.value.trim().toLowerCase();
    // this.dataSource.filter = JSON.stringify(this.filterValues);

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  applyFilter1(filterValue: string) {
    /*let findFilter = false;
    this.displayedColumns.forEach(element => {
      if(findFilter) return;
      this.filterValues[element] = filterValue.trim().toLowerCase();
      //console.log('JSON.filter',JSON.stringify(this.filterValues));

      this.dataSource.filter = filterValue.trim().toLowerCase();  
      if(this.dataSource.filteredData.length > 0) {
        findFilter = true;
        return;
      }
      this.filterValues = {};
    });*/

    //console.log(JSON.stringify(this.filterValues))

    /*if(findFilter){
      this.dataSource.filter="";
      this.dataSource.filter = JSON.stringify(this.filterValues); 
    }*/

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.filter) {
      this.dataSource.paginator.firstPage();
    }

    // this.filterValues[
    //   filter.columnProp
    // ] = event.target.value.trim().toLowerCase();
    // this.dataSource.filter = JSON.stringify(this.filterValues);

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  delay(ms: number) {
    window.location.reload();
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
