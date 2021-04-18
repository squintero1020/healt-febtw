import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUsuarioRoutingModule } from './add-usuario-routing.module';
import { AddUsuarioComponent } from './add-usuario.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [AddUsuarioComponent],
  imports: [
    CommonModule,
    AddUsuarioRoutingModule,
    SharedModule
  ]
})
export class AddUsuarioModule { }
