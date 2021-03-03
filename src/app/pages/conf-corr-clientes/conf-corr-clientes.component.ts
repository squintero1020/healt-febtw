import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ConfCorrClientesService } from "../../shared/services/conf-corr-clientes.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-conf-corr-clientes",
  templateUrl: "./conf-corr-clientes.component.html",
  styleUrls: ["./conf-corr-clientes.component.scss"],
})
export class ConfCorrClientesComponent implements OnInit {
  addConfCorrCliente: FormGroup;
  selected = new FormControl(0);

  constructor(
    private apiConfCorrClientes: ConfCorrClientesService,
    private route: Router
  ) {}

  get f() {
    return this.addConfCorrCliente.controls;
  }

  edit: boolean = false;
  ngOnInit(): void {
    this.addConfCorrCliente = new FormGroup({
      confCorreoClienteId: new FormControl(Number(0)),
      servidor: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required, Validators.email]),
      contrasena: new FormControl("", [Validators.required]),
      puerto: new FormControl(Validators.required),
      ssl: new FormControl(Boolean, Validators.required),
      protocolo: new FormControl("", Validators.required),
      clienteId: new FormControl(localStorage.getItem("clienteId")),
    });
    this.loadData();
  }

  loadData() {
    console.log("trin");
    console.log();
    
    this.apiConfCorrClientes
      .getByCompany()
      .then((res: any) => {
        console.log(res);
        
        if (res.result.length>=1) {
          this.edit = true;
          this.addConfCorrCliente.patchValue(res.result[0]);
        }
      })
      .catch(console.error);
  }

  onSubmit() {
    
    try {
      this.addConfCorrCliente.enable();
      this.addConfCorrCliente.value.clienteId = parseInt(this.addConfCorrCliente.value.clienteId)
      console.log(this.addConfCorrCliente.value);

      if (!this.edit) {
        this.apiConfCorrClientes
          .Add(this.addConfCorrCliente.value)
          .then((res: any) => {         
              if (res.success) {
                Swal.fire(
                  "Bien hecho",
                  "los datos han sido guardados con éxito",
                  "success"
                );
                setTimeout(() => {
                  window.location.reload()
                }, 1000);
              } else {
                Swal.fire(
                  "Hubo un error al guardar",
                  "Revisa los datos al guardar",
                  "error"
                );
              }
          })
          .catch(console.error);
      } else {
        this.apiConfCorrClientes
          .Update(this.addConfCorrCliente.value)
          .then((res: any) => {
            if (res.success) {
              Swal.fire(
                "Bien hecho",
                "los datos han sido actualizados con éxito",
                "success"
              );
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            } else {
              Swal.fire(
                "Hubo un error al actualizar",
                "Revisa los datos al actualizar",
                "error"
              );
            }
          })
          .catch(console.error);
      }
    } catch (error) {
      console.error(error)
    }
  }
}
