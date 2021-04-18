import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OptionMenuComponent } from 'src/app/components/modales/option-menu/option-menu.component';
import { FacturaarService } from 'src/app/shared/services/facturaar.service';
import { LocalService } from 'src/app/shared/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas-timbradas',
  templateUrl: './facturas-timbradas.component.html',
  styleUrls: ['./facturas-timbradas.component.scss']
})
export class FacturasTimbradasComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: any = new Subject();
  
  facturasTimbradrasForm: FormGroup;
  loading:boolean=false;
  datos:any;

  constructor(
    private apiDatePipe : DatePipe,
    private LocalStorage : LocalService,
    private apiFacturaARService : FacturaarService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    let usuario = this.LocalStorage.getJsonValue('usuario');
    this.facturasTimbradrasForm = new FormGroup({
      CompanyID : new FormControl(usuario.CompanyID),
      NIT : new FormControl(usuario.NIT),
      FechaI : new FormControl(this.apiDatePipe.transform(new Date(),'2019-01-01')),
      FechaF : new FormControl(this.apiDatePipe.transform(new Date(),'yyyy-MM-dd')),
      InvoiceNum : new FormControl(),
      LgalNumber : new FormControl(),
      InvoiceType : new FormControl('InvoiceType')
    });

    this.getData();
  }

  getData(){
    this.loading = true;
    const that = this;
    this.datos = [];
    this.dtTrigger.next();
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.apiFacturaARService.getByCompany(this.facturasTimbradrasForm.value)
          .then(
            (res:any) => {
              if(res.success){
                this.datos = res.result;
                callback({
                  recordsTotal: 10,
                  recordsFiltered: 'SETT6145',
                  data: that.datos
                });
              }
              else 
                Swal.fire('Notificación',res.message,'warning');
              this.loading = false;
            }
          ).catch((error: any) => {
            console.log(error);
            this.loading = false;
          });

      },
      columns: [
        {
          title: 'TIPO FACTURA',
          data: 'TipoFactura',
          className:'notranslate'
        },{
        title: '# FACTURA',
        data: 'NumFactura',
        className:'notranslate'
        },{
          title: '# LEGAL',
          data: 'LegalNum',
          className: 'notranslate'
        },
        {
        title: 'CLIENTE',
        data: 'RazonSocialEMP',
        className: 'notranslate'
        },
        {
          title: 'FECHA FACTURA',
          data: 'FechaFactura',
          render: function(data){
            return data.split('T')[0]
          },
          className: 'notranslate'
        },
        {
          title: 'FECHA ENVIO DIAN',
          data: 'FechaEnvioDian',
          render: function(data){
            return data.split('T')[0]
          },
          className: 'notranslate'
        },
        {
          title: 'ENVÍO DIAN',
          data: 'AceptaDian',
          render: function(data){
            return data===true? "SI":"NO"
          },
          className: 'notranslate'
        },
        {
          title: 'ACUSE RECIBIDO',
          data: 'AceptaCliente',
          render: function(data){
            return data===true? "SI":"NO"
          },
          className: 'notranslate'
        },
        {
          title: 'ACCIONES',
          render: function(data: any, type: any, full: any){
            return '<button type="button" class="btn btn-icon btn-rounded fa fa-ellipsis-v" invoice-id="' + full.NumFactura + '" legal-data="' + full.LegalNum + '" acepta-dian="'+full.AceptaDian+'" acepta-cliente="'+full.AceptaCliente+'" tipoFactura="'+full.TipoFactura+'"></button>';
          },
          className: 'dt-body-right notranslate'
        }
      ],
      scrollY:"250px",
      order: [[2, "desc"]],
      columnDefs:[
        {
          "targets": [ 6, 7 ],
          "visible": false,
          "searchable": false
        }
      ],
      pagingType: 'full_numbers',
      scrollCollapse:true,
      responsive: true,
      dom: 'lBfrtip',
      buttons: [
        'copy',
        'print',
        'excel'
      ]
    };
  }

  ngAfterViewInit(){
    this.dtTrigger.next();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function (e) {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
    this.renderer.listen(this.elRef.nativeElement, 'click', (event) => {
      if (event.target.hasAttribute("invoice-id")) {
        //
        var modal = this.modalService.open(OptionMenuComponent, {
          ariaLabelledBy: 'modal-basic-title',
          windowClass: 'lateral-modal',
          backdrop: 'static',
          keyboard: false
        });

        modal.result.then(
          this.handleModalComponent.bind(this),
          this.handleModalComponent.bind(this)
        )
        
        modal.componentInstance.parent = 'InvcHead';
        modal.componentInstance.id = event.target.getAttribute("legal-data");
        modal.componentInstance.param1 = event.target.getAttribute("acepta-dian");
        modal.componentInstance.param2 = event.target.getAttribute("acepta-cliente");
        modal.componentInstance.param3 = event.target.getAttribute("invoice-id");
        modal.componentInstance.param4 = event.target.getAttribute("tipoFactura");;
      }
    });
  }

  handleModalComponent(response){

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.loading=true;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      //
    });
  }
}
