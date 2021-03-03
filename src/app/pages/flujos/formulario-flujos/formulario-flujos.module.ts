import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioFlujosRoutingModule } from './formulario-flujos-routing.module';
import { FormularioFlujosComponent } from './formulario-flujos.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import {TagInputModule} from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';



@NgModule({
  declarations: [FormularioFlujosComponent],
  imports: [
    CommonModule,
    FormularioFlujosRoutingModule,
    SharedModule,
    // NgSelectModule,
    TagInputModule,
    NgOptionHighlightModule,
    SelectModule
  ]
})
export class FormularioFlujosModule { }
