import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {ListUserComponent} from './listuser.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularFileUploaderModule} from "angular-file-uploader";

import { AuthGuard } from 'src/app/auth.guard';
import { BasicAuthInterceptor } from 'src/app/factory/interceptor';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Lista Usuarios',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Lista Usuarios' }
      ]
    },
    component: ListUserComponent
  }
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  imports: [FormsModule, 
            CommonModule,
            NgxDatatableModule,
            Ng2SmartTableModule, 
            RouterModule.forChild(routes), 
            NgbModule, 
            AngularFileUploaderModule],
            providers: [
              {
                provide: PERFECT_SCROLLBAR_CONFIG,
                useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG      
              },{
                provide: HTTP_INTERCEPTORS,
                useClass: BasicAuthInterceptor,
                multi: true
              },
              AuthGuard],
  declarations: [ListUserComponent]
})
export class ListUserModule {

  bButtonNewUser: boolean;

  constructor(){
    this.bButtonNewUser = false;
  }
}