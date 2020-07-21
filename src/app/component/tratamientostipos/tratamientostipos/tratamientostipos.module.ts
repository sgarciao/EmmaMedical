import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TratamientostiposComponent } from '../tratamientostipos.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Treatments Types',
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
    component: TratamientostiposComponent
  }
];

@NgModule({
  declarations: [TratamientostiposComponent],
  imports: [
    CommonModule, 
    NgxDatatableModule,
    Ng2SmartTableModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    ChartsModule,
    ChartistModule,
    NgxChartsModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TratamientostiposModule { }
