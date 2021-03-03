import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FacturasService } from "src/app/shared/services/facturas.service";
import Swal from "sweetalert2";
import { ComentariosService } from "../../../shared/services/comentarios.service";
import { AccionesService } from "../../../shared/services/acciones.service";

class Comentario {
  comentarioId: number;
  mensaje: string;
  facturaId: number;
  usuarioId: number;
  accionId: number;
  clienteId: number;
  inactive: boolean;
  modifiedBy: string;
  createdBy: string;
}
@Component({
  selector: "app-agregar-comentarios-factura",
  templateUrl: "./agregar-comentarios-factura.component.html",
  styleUrls: ["./agregar-comentarios-factura.component.scss"],
})
export class AgregarComentariosFacturaComponent implements OnInit {
  public data: any;
  public id: number;
  comentario: string;
  ComentarioCuerpo: Comentario;
  Comentario$: any;
  hayComentarios: boolean;
  accione$: any;

  constructor(
    public modalActive: NgbActiveModal,
    private apiFacturaService: FacturasService,
    private apiComentariosService: ComentariosService,
    private apiAccionService: AccionesService
  ) {}

  ngOnInit(): void {
    console.log(this.data, this.id);
    if (this.data.comentarios === "string") {
      this.data.comentarios = "";
    }

    this.apiAccionService
      .getByCompany(localStorage.getItem("clienteId"))
      .then((res: any) => {
        this.accione$ = res.result;
        console.log(this.accione$);
      });

    this.apiComentariosService
      .GetByFactura(this.data.facturaId)
      .then((res: any) => {
        if (res.success) {
          this.hayComentarios = true;
          this.Comentario$ = res.result;
          this.Comentario$.forEach((element) => {
            let nombreAccion = "";
            if (element.accionId) {
              console.log("1");
              let accionId = this.accione$.find(
                (x) => x.accionId == element.accionId
              ).nombre;
              if (accionId !== undefined) {
                if (accionId.length > 0) nombreAccion = accionId;
              }
            }
            element.accionId = nombreAccion;
          });
        } else {
          this.hayComentarios = false;
        }
      })
      .catch(console.error);
    console.log(this.data.facturasFlujo[0].accionId);
  }

  closeViewModal() {
    this.modalActive.dismiss(0);
  }

  saveModal() {
    this.ComentarioCuerpo = {
      comentarioId: 0,
      mensaje: this.comentario,
      facturaId: this.data.facturaId,
      usuarioId: Number(localStorage.getItem("usuarioId")),
      accionId: this.data.facturasFlujo[0].accionId,
      clienteId: Number(localStorage.getItem("clienteId")),
      inactive: false,
      modifiedBy: localStorage.getItem("nombres"),
      createdBy: localStorage.getItem("nombres"),
    };

    this.data.comentarios = `${this.data.comentarios} ${localStorage.getItem(
      "correo"
    )}: ${this.comentario}`;
    console.log(this.ComentarioCuerpo);
    this.handSuccessFullSave(this.data);
    this.apiComentariosService
      .Add(this.ComentarioCuerpo)
      .then((res: any) => {
        console.log(res);
        if (res.success) {
          Swal.fire(
            "Bien hecho!",
            "El comentario ha sido guardado con éxito",
            "success"
          );
        }
      })
      .catch(console.log);
  }

  handSuccessFullSave(form) {
    this.modalActive.close({ form });
  }
}
