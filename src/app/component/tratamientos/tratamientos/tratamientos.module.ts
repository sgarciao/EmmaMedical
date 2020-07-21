import { NgModule } from '@angular/core';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { TratamientosComponent } from '../tratamientos.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Publicación De documentos',
      menu: [
        { 
          value: 0, title: 'Configuración',
          submenu: [
            { value: 2, title: 'Publicación De documentos', url: '/publishDocument' }
          ]
        },
      ]
    },
    component: TratamientosComponent
  }
];
@NgModule({
  declarations: [TratamientosComponent],
  imports: [
    CommonModule, 
    NgxDatatableModule,
    Ng2SmartTableModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    FormsModule      
  ]

})
export class TratamientosModule { }
