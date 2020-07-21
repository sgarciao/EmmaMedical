import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { DocumentComponent} from './document.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AngularFileUploaderModule} from "angular-file-uploader";

import { AuthGuard } from 'src/app/auth.guard';
import { BasicAuthInterceptor } from 'src/app/factory/interceptor';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Starter Page',
      menu: [
        {
          value: 1, title: 'Carpeta operativa',
          submenu: [
            { value: 1, title: 'Documentos oficiales', url: '/document' },
            { value: 2, title: 'Plan de trabajo', url: '/document' },
            { value: 3, title: 'Personal operativo', url: '/document' },
            { value: 4, title: 'Información técnica', url: '/document' }
          ]
        },
        {
          value: 3, title: 'Reportes',
          submenu: [
            { value: 1, title: 'Análisis de tendencia', url: '/document' },
            { value: 2, title: 'Reporte de monitoreo y control de roedores e insectos rastreros', url: '/document' },
            { value: 3, title: 'Reporte de inspección y aplicación de plaguicidas', url: '/document' },
            { value: 4, title: 'Reporte de monitoreo y control de insectos voladores', url: '/document' }
          ]
        },
        {
          value: 4, title: 'Certificados',
          submenu: [
            { value: 1, title: 'Servicios', url: '/document' }
          ]
        }
      ]
    },
    component: DocumentComponent
  }
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  imports: [
      FormsModule,
      HttpClientModule, 
      CommonModule,
      NgxDatatableModule,
      Ng2SmartTableModule, 
      RouterModule.forChild(routes), 
      NgbModule, 
      AngularFileUploaderModule
    ],
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
        declarations: [DocumentComponent]
})
export class DocumentModule {}
