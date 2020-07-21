import { NgModule,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { QuillModule } from 'ngx-quill';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { CalendarioComponent } from './calendario.component';

import { AuthGuard } from 'src/app/auth.guard';
import { BasicAuthInterceptor } from 'src/app/factory/interceptor';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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
        title: 'Calendario',
        menu: [
          {
            value: 1, title: 'Calendario',
            submenu: [
              { value: 1, title: 'Progr. Mensual Servicios', url: '/calendario' },
              { value: 2, title: 'Progr. Anual Servicios', url: '/calendario' },
              { value: 3, title: 'Eventos', url: '/calendario' }
            ]
          }
        ]
      },
      component: CalendarioComponent
    }
];

@NgModule({
    imports: [
      FormsModule,
      HttpClientModule,
      CommonModule,
      NgbModalModule.forRoot(),          
      RouterModule.forChild(routes),
      NgbModule,
      CalendarModule.forRoot()
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [CalendarioComponent],
    providers: [{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG      
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    },{
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    AuthGuard]
})

export class CalendarioModule {
 
}