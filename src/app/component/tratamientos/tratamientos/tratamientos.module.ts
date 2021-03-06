import { NgModule } from '@angular/core';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { TratamientosComponent } from '../tratamientos.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tratamientos',
      menu: [
        {
          value: 0, title: 'Tratamientos',
          submenu: [
            { value: 2, title: 'Tratamientos', url: '/treatments' }
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
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]

})
export class TratamientosModule { }
