import { Component, OnInit } from "@angular/core";
import { GruposService } from "../../../shared/services/grupos.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DualListComponent } from "angular-dual-listbox";
import Swal from "sweetalert2";

@Component({
  selector: "app-formulario-grupos",
  templateUrl: "./formulario-grupos.component.html",
  styleUrls: ["./formulario-grupos.component.scss"],
})
export class FormularioGruposComponent implements OnInit {
  addGroupForm: FormGroup;
  selected = new FormControl(0);
  edit: boolean = false;
  usuarios: any[];
  usuariosConfirmados: number[];
  keepSorted = true;
  source: Array<any>;
  confirmed: Array<any> = [];
  key: string;
  display: any;
  filter = false;
  userAdd = "";
  disabled = false;
  format: any = (DualListComponent.DEFAULT_FORMAT = {
    add: "Agregar",
    remove: "Eliminar",
    all: "Todo",
    none: "Ninguna",
    direction: "left-to-right",
    draggable: true,
    locale: undefined,
  });

  constructor(
    private _route: ActivatedRoute,
    private apiGruposService: GruposService,
    private route: Router
  ) {}

  get f() {
    return this.addGroupForm.controls;
  }

  ngOnInit(): void {
    this.addGroupForm = new FormGroup({
      grupoId: new FormControl(0),
      nombre: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      clienteId: new FormControl(Number(localStorage.getItem("clienteId"))),
      userconfirmed: new FormControl(""),
      inactive: new FormControl(false),
      createdAt:new FormControl(new Date),
      modifyDate:new FormControl(new Date),
      modifiedBy: new FormControl(''),
      createdBy: new FormControl(''),
    });
    this.loadUsuarios();
    this.loadData();
  }

  loadUsuarios() {
    this.apiGruposService
      .getUsuariosByCompany(localStorage.getItem("clienteId"))
      .then((res: any) => {
        if (res.success) {
          this.usuarios = res.result;
          this.source = res.result;
          this.useUSers();
        } else {
          //
        }
      })
      .catch(console.error);
  }

  loadData() {
    const id = this._route.snapshot.params["id"];
    if (id && id != "") {
      this.apiGruposService
        .getByID(id)
        .then((res: any) => {
          if (res.success) {
            this.edit = true;
            this.addGroupForm.patchValue(res.result);
            res.result.userConfirmed.forEach((a) => {
              this.confirmed.push(a);
            });
          }
        })
        .catch(console.error);
    }
  }

  private userNameList(item: any) {
    return item.nombres + "";
  }

  private useUSers() {
    this.key = "usuarioId";
    this.display = this.userNameList;
    this.keepSorted = true;
  }

  onSubmit() {
    try {
      this.addGroupForm.enable();

      this.addGroupForm.controls["userconfirmed"].setValue(this.confirmed);
      if (!this.edit) {
        this.apiGruposService
          .Add(this.addGroupForm.value)
          .then((res: any) => {
            if (res.success) {
              Swal.fire(
                'Bien hecho',
                'los datos han sido guardados con éxito',
                'success'
              )
              this.route.navigateByUrl("grupos");
            } else {
              Swal.fire(
                'Hubo un error al guardar',
                'Revisa los datos al guardar',
                'error'
              )
            }
          })
          .catch(console.error);
      } else {
        this.apiGruposService
          .Update(this.addGroupForm.value)
          .then((res: any) => {
            if (res.success) {
              Swal.fire(
                'Bien hecho',
                'los datos han sido actualizados con éxito',
                'success'
              )
              this.route.navigateByUrl("grupos");
            } else {
              Swal.fire(
                'Hubo un error al actualizar',
                'Revisa los datos al actualizar',
                'error'
              )
            }
          })
          .catch(console.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  doDelete() {
    if (this.source.length > 0) {
      this.source.splice(0, 1);
    }
  }

  doCreate() {
    if (typeof this.source[0] === "object") {
      const o = {};
      o[this.key] = this.source.length + 1;
      o[this.display] = this.userAdd;
      this.source.push(o);
    } else {
      this.source.push(this.userAdd);
    }
    this.userAdd = "";
  }

  doAdd() {
    for (let i = 0, len = this.source.length; i < len; i += 1) {
      const o = this.source[i];
      const found = this.confirmed.find((e: any) => e === o);
      if (!found) {
        this.confirmed.push(o);
        break;
      }
    }
  }

  doRemove() {
    if (this.confirmed.length > 0) {
      this.confirmed.splice(0, 1);
    }
  }

  doFilter() {
    this.filter = !this.filter;
  }
}
