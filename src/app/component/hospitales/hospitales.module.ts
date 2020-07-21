import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from 'src/app/factory/interceptor';
import { StarterComponent } from 'src/app/starter/starter.component';
import { HospitalesComponent } from './hospitales.component';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


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
      title: 'Opciones',
      urls: [
        { title: 'Home', url: '/home' },
        { title: 'Reportes' }
      ]
    },
    component: HospitalesComponent
  }
];
@NgModule({
  declarations: [HospitalesComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class HospitalModule { }
