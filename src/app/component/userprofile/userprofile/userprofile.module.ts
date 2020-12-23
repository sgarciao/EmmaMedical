import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from '../userprofile.component';


import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from 'src/app/factory/interceptor';
import { AuthGuard } from 'src/app/auth.guard';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reportes Generales',
      urls: [
        { title: 'Home', url: '/starter' },
        { title: 'Notificaciones' }
      ]
    },
    component: UserprofileComponent
  }
];


@NgModule({
  declarations: [UserprofileComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
    NgbModule, 
    ChartsModule,
    ChartistModule,
    NgxChartsModule,
    NgxDatatableModule, 
    Ng2SmartTableModule, 
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthInterceptor,
    multi: true
  },
  
  AuthGuard]
})
export class UserprofileModule { }
