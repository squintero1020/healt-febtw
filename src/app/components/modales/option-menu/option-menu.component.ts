import { Component, OnInit } from '@angular/core';
import { TilePosition } from '@angular/material/grid-list/tile-coordinator';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogClienteComponent } from '../log-cliente/log-cliente.component';
import { LogDianComponent } from '../log-dian/log-dian.component';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.scss']
})
export class OptionMenuComponent implements OnInit {

  loading: boolean = false;
  public id: string = '';
  public parent: string = '';
  public param1: string = '';
  public param2: string = '';
  public param3: string = '';
  public param4: string = '';
  public param5: string = '';
  //
  titulo1: string = 'Factura N° ';
  //
  option1: boolean = true;
  option2: boolean = true;
  option3: boolean = true;
  option4: boolean = true;
  option5: boolean = true;
  option6: boolean = true;
  option7: boolean = true;

  noshow1: boolean = true;
  noshow2: boolean = true;
  noshow3: boolean = true;
  noshow4: boolean = true;
  noshow5: boolean = true;
  noshow6: boolean = true;


  constructor(
    private modalService: NgbModal,
    private modalActive: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.titulo1 += this.id;
    if (this.parent === 'InvcHead') {
        if(this.param1 === 'false'){
          this.option1 = false;
        }
        if(this.param2 === 'false'){
          this.option2 = false;
        }
        else{
          this.option2 = true;
        }
        this.option3 = false;
        this.option4 = false;
        this.option5 = false;
        this.option6 = false;
        this.option7 = false;
    }
  }

  onClickOption1InvcHead(){
    var modal = this.modalService.open(LogDianComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'center-modal',
      size:'lg',
      backdrop: 'static',
      keyboard: false
    });

    modal.result.then(
      this.handleModalComponentLogDian.bind(this),
      this.handleModalComponentLogDian.bind(this)
    )

    modal.componentInstance.InvoiceNum=this.param3;
    modal.componentInstance.LegalNumber=this.id;
    modal.componentInstance.InvoiceType=this.param4;
  }

  handleModalComponentLogDian(){
    
  }
  onClickOption2InvcHead(){
    var modal = this.modalService.open(LogClienteComponent, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'center-modal',
      size:'lg',
      backdrop: 'static',
      keyboard: false
    });

    modal.result.then(
      this.handleModalComponentLogDian.bind(this),
      this.handleModalComponentLogDian.bind(this)
    )

    modal.componentInstance.InvoiceNum=this.param3;
    modal.componentInstance.LegalNumber=this.id;
    modal.componentInstance.InvoiceType=this.param4;
  }
  onClickOption3InvcHead(){
    
  }
  onClickOption4InvcHead(){
    
  }
  onClickOption5InvcHead(){
    
  }
  onClickOption6InvcHead(){
    
  }
  onClickOption7InvcHead(){
    
  }
  onClickCloseModal() {
    this.modalActive.dismiss(0);
  }
}
