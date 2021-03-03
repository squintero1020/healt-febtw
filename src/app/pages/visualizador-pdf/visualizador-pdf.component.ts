import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentosService } from '../../shared/services/documentos.service';

@Component({
  selector: 'app-visualizador-pdf',
  templateUrl: './visualizador-pdf.component.html',
  styleUrls: ['./visualizador-pdf.component.scss']
})
export class VisualizadorPDFComponent implements OnInit {

  
  pdfBase64:string="";

  objBuilder:string='';
  constructor(
    private route: ActivatedRoute,
    private apiDocumentos: DocumentosService,
  ) { }

  ngOnInit(): void {

    const facturaId = Number(this.route.snapshot.params['id']);
    
    this.apiDocumentos.getDocumentByFacturaId(facturaId)
    .then((res:any)=>{
      if(res.success){
        this.pdfBase64=res.result.pdf64
        this.objBuilder += ('<object width="100%" height="100%" style="margin-top: 3%;margin-left: 2%;width: 96%;" data="data:application/pdf;base64,');
        this.objBuilder += (this.pdfBase64);
        this.objBuilder += ('"type="application/pdf" class="internal">');
        this.objBuilder += ('</object>');
    
        document.getElementById("pdfView").innerHTML=this.objBuilder;
      }else{
        
        
      }
    })
    .catch(console.error);
    

  }

}
