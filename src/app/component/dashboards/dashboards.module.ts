import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from 'src/app/factory/interceptor';
import { AuthGuard } from 'src/app/auth.guard';
import { DashboardsComponent } from './dashboards.component';

import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
        { title: 'Reportes' }
      ]
    },
    component: DashboardsComponent
  }
];

@NgModule({
  declarations: [DashboardsComponent],
  imports: [
    FormsModule,
    HttpClientModule, 
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes), 
    NgbModule, 
    ChartsModule,
    ChartistModule,
    NgxChartsModule,
    NgxDatatableModule
]
})
export class DashboardsModule { }
