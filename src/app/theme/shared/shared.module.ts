import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AlertModule, BreadcrumbModule, CardModule, ModalModule} from './components';
import {DataFilterPipe} from './components/data-table/data-filter.pipe';
import {TodoListRemoveDirective} from './components/todo/todo-list-remove.directive';
import {TodoCardCompleteDirective} from './components/todo/todo-card-complete.directive';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ClickOutsideModule} from 'ng-click-outside';
import {SpinnerComponent} from './components/spinner/spinner.component';

import 'hammerjs';
import 'mousetrap';
import {GalleryModule} from '@ks89/angular-modal-gallery';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from './material/material.module';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SppinerloadingModule } from './components/sppinerloading/sppinerloading.module';
import { SpinnerglobalComponent } from './components/spinnerglobal/spinnerglobal.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    GalleryModule.forRoot(),
    ClickOutsideModule,
    AngularDualListBoxModule,
    MaterialModule,
    SppinerloadingModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    GalleryModule,
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    ClickOutsideModule,
    SpinnerComponent,
    AngularDualListBoxModule,
    MaterialModule,
    NgxSpinnerModule,
    SppinerloadingModule
  ],
  declarations: [
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    SpinnerComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
