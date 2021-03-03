import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppinerloadingComponent } from './sppinerloading.component';




@NgModule({
  declarations: [SppinerloadingComponent],
  exports:[SppinerloadingComponent],
  imports: [
    CommonModule
  ]
})
export class SppinerloadingModule { }