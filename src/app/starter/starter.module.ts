import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BasicAuthInterceptor } from 'src/app/factory/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StarterComponent } from './starter.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home',
      menu: [
        {
          value: 0, title: 'Inicio',
          submenu: [
            { value: 1, title: 'Entidades', url: '/home' }
          ]
        },
        {
          value: 1, title: 'Reportes',
          submenu: [
            { value: 1, title: 'Tratamientos', url: '/treatments' }
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
    component: StarterComponent
  }
];

@NgModule({
  imports: [
            FormsModule, 
            CommonModule, 
            RouterModule.forChild(routes),
            Ng2SmartTableModule,
            NgbModule
          ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true
    }
          ],
  declarations: [StarterComponent]
})
export class StarterModule {}
