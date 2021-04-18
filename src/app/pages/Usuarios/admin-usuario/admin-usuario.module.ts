import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsuarioRoutingModule } from './admin-usuario-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AdminUsuarioComponent } from './admin-usuario.component';


@NgModule({
  declarations: [AdminUsuarioComponent],
  imports: [
    CommonModule,
    AdminUsuarioRoutingModule,
    SharedModule
  ]
})
export class AdminUsuarioModule { }
