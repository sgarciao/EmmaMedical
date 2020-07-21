import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitieoptionsComponent } from './entitieoptions.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Starter Page',
      menu: [
        {
          value: 1, title: '',
          submenu: [
            { value: 1, title: 'Opciones', url: '' },
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
    component: EntitieoptionsComponent
  }
];


@NgModule({
  declarations: [EntitieoptionsComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class EntitieoptionsModule { }

