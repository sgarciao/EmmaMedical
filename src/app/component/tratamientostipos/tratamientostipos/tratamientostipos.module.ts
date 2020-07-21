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
      title: 'Tratamientos',
      menu: [
        { 
          value: 0, title: 'Tratamientos',
          submenu: [
            { value: 2, title: 'Tratamientos', url: '/treatments-types' }
          ]
        },
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
