import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario-importar-usuarios',
  templateUrl: './formulario-importar-usuarios.component.html',
  styleUrls: ['./formulario-importar-usuarios.component.scss']
})
export class FormularioImportarUsuariosComponent implements OnInit {

  structureValidate: any[] = [];
  selected = new FormControl(0);

  @ViewChild('inpUpload', { static: false }) inpUpload: ElementRef;
  fileSelected: any;
  fileName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

    // eliminar archivo seleccionado
    deleteFile() {

    }

    // evento al seleccionar un archivo
    onFileChange(evt: any) {

    }
}
