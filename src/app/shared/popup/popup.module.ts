import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PopupModule { }
