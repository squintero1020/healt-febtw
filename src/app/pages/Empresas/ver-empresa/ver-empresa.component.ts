import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CredentialsDianService } from 'src/app/shared/services/credentials-dian.service';
import { EmpresaService } from 'src/app/shared/services/empresa.service';
import { FormatoFacturaService } from 'src/app/shared/services/formato-factura.service';
import { ItService } from 'src/app/shared/services/it.service';
import { LocalService } from 'src/app/shared/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.scss']
})
export class VerEmpresaComponent implements OnInit {

  BusinessForm: FormGroup;
  CredentialsForm: FormGroup;
  FormatosForm: FormGroup;
  ITForm: FormGroup;
  formatosFactura: FormArray;
  configuracionIT: FormArray;

  selected = new FormControl(0);
  loading: boolean = false;

  constructor(
    private apiEmpresaService: EmpresaService,
    private apiCredencialesDIANService: CredentialsDianService,
    private apiFormatoFacturaService: FormatoFacturaService,
    private apiITService: ItService,
    private LocalStorage: LocalService
  ) { }

  ngOnInit(): void {

    this.BusinessForm = new FormGroup({
      RegistroID: new FormControl(),
      NIT: new FormControl(),
      CompanyID: new FormControl(),
      SyncERP: new FormControl(),
      RazonSocial: new FormControl(),
      Ciudad: new FormControl(),
      Direccion: new FormControl(),
      Telefono: new FormControl(),
      Celular: new FormControl(),
      EmailRegistro: new FormControl(),
      Mail: new FormControl(),
      MailFE: new FormControl(),
      Website: new FormControl(),
      AsuntoEmail: new FormControl(),
      urlImage: new FormControl(),
      Observacion: new FormControl(),
      LineaNegocio: new FormControl(),
      InfoERP: new FormControl(),
      IsContingencyDian: new FormControl(),
      Estado: new FormControl(),
      FCreacion: new FormControl(),
      UsModifica: new FormControl(this.LocalStorage.getJsonValue('usuarioid')),
      ComfirmoRegistro: new FormControl(),
      FModifica: new FormControl(new Date)
    });

    this.CredentialsForm = new FormGroup({
      IdRegistro: new FormControl(),
      NIT: new FormControl(),
      CompanyID: new FormControl(),
      NameSoftware: new FormControl(),
      Pin: new FormControl(),
      IdSoftware: new FormControl(),
      UrlAmbiente: new FormControl(),
      UsuarioAmbiente: new FormControl(),
      PassAmbiente: new FormControl(),
      SoftwareSecurityCode: new FormControl(),
      InvoiceAuthorization: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      Prefix: new FormControl(),
      StarNumber: new FormControl(),
      EndNumber: new FormControl(),
      ClaveTecnica: new FormControl(),
      ProfileExecutionID: new FormControl()
    });

    this.FormatosForm = new FormGroup({
      formatosFactura: new FormArray([])
    });

    this.ITForm = new FormGroup({
      configuracionIT: new FormArray([])
    });

    this.getData();
  }

  getData() {
    this.loading = true;
    let usuario = this.LocalStorage.getJsonValue('usuario');
    this.apiEmpresaService.getByID(usuario.CompanyID, usuario.NIT)
      .then((resp_Empresa: any) => {
        if (resp_Empresa.success) {
          this.BusinessForm.patchValue(resp_Empresa.result);
          this.apiCredencialesDIANService.getByID(usuario.CompanyID, usuario.NIT)
            .then((resp_Crendeciales: any) => {
              if (resp_Crendeciales.success) {
                this.CredentialsForm.patchValue(resp_Crendeciales.result);
                this.apiFormatoFacturaService.getByID(usuario.CompanyID, usuario.NIT)
                  .then((resp_FormatoFactura: any) => {
                    if (resp_FormatoFactura.success) {
                     resp_FormatoFactura.result.forEach(item => {
                        this.addFormatoFactura(item);
                      });
                      this.apiITService.getByID(usuario.CompanyID, usuario.NIT)
                        .then((resp_IT: any) => {
                          if (resp_IT.success) {
                            resp_IT.result.forEach(item => {
                              this.addConfiguracionIT(item);
                            });
                          }
                          else
                            Swal.fire('Notificación', resp_IT.message, 'warning');
                          this.loading = false;
                        })
                        .catch(console.error)
                    }
                    else
                      Swal.fire('Notificación', resp_FormatoFactura.message, 'warning');
                    this.loading = false;
                  })
                  .catch(console.error);
              }
              else
                Swal.fire('Notificación', resp_Crendeciales.message, 'warning');
              this.loading = false;
            })
            .catch(console.error);
        }
        else
          Swal.fire('Notificación', resp_Empresa.message, 'warning');
        this.loading = false;
      })
      .catch((err: any) => {
        this.loading = false;
        console.error(err.status);
      });
  }

  save() {
    try {
      this.loading = true;
      this.BusinessForm.controls['UsModifica'].setValue(this.LocalStorage.getJsonValue('usuarioid'));
      this.apiEmpresaService.update(this.BusinessForm.value)
        .then((resp_empresa: any) => {
          if (resp_empresa.success) {
            this.apiCredencialesDIANService.update(this.CredentialsForm.value)
              .then((resp_credenciales: any) => {
                if (resp_credenciales.success) {
                  this.apiFormatoFacturaService.update(this.FormatosForm.value.formatosFactura)
                    .then((resp_formatos: any) => {
                      if (resp_formatos.success) {
                        this.apiITService.update(this.ITForm.value.configuracionIT)
                        .then((resp_it: any) => {
                          if (resp_it.success) {
                            Swal.fire('Notificación',resp_it.message,'success').then(() =>{
                              window.location.reload();
                            });
                          }
                          else {
                            Swal.fire('Notificación', resp_it.message, 'warning');
                            this.loading = false;
                          }
                        })
                        .catch((err: any) => {
                          this.loading = false;
                          console.error(err);
                        })
                      }
                      else {
                        Swal.fire('Notificación', resp_formatos.message, 'warning');
                        this.loading = false;
                      }
                    })
                    .catch((err: any) => {
                      this.loading = false;
                      console.error(err);
                    })
                }
                else {
                  Swal.fire('Notificación', resp_credenciales.message, 'warning');
                  this.loading = false;
                }
              })
              .catch((err: any) => {
                this.loading = false;
                console.error(err);
              })
          }
          else {
            Swal.fire('Notificación', resp_empresa.message, 'warning');
            this.loading = false;
          }
        })
        .catch((err: any) => {
          this.loading = false;
          let messageError = '';
          console.error(err.error.errors);
          if (err) {
            if (err.error) {
              if (err.error.errors) {
                messageError += err.error.detail;
              }
            }
          }
          Swal.fire('Notificación', messageError, 'warning');
        })
    } catch (error) {
      console.error(error);
    }
  }

  get arrayFormatoFacturaItem() {
    return this.FormatosForm.get("formatosFactura") as FormArray;
  }

  get arrayITItem() {
    return this.ITForm.get("configuracionIT") as FormArray;
  }

  addFormatoFactura(item) {
    this.arrayFormatoFacturaItem.push(
      new FormGroup({
        CompanyID: new FormControl(item.CompanyID),
        NIT: new FormControl(item.NIT),
        ID: new FormControl(item.ID),
        TipoFacturaDIAN: new FormControl(item.TipoFacturaDIAN),
        Descripcion: new FormControl(item.Descripcion),
        MethodName: new FormControl(item.MethodName),
        Estado: new FormControl(item.Estado)
      })
    );
  }

  addConfiguracionIT(item) {
    this.arrayITItem.push(
      new FormGroup({
        RegistroID: new FormControl(item.RegistroID),
        CompanyID: new FormControl(item.CompanyID),
        NIT: new FormControl(item.NIT),
        Tipo: new FormControl(item.Tipo),
        WS: new FormControl(item.WS),
        FCrea: new FormControl(item.FCrea),
        FModifica: new FormControl(item.FModifica),
        Estado: new FormControl(item.Estado),
        UsModifica: new FormControl(item.UsModifica)
      })
    );
  }
}
