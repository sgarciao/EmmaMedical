import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

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
import { PublishdocumentComponent } from './publishdocument.component';

import { NotifierModule } from 'angular-notifier';

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
    component: PublishdocumentComponent
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
      HttpClientModule, 
      NgxDatatableModule,
      Ng2SmartTableModule, 
      RouterModule.forChild(routes), 
      NgbModule, 
      AngularFileUploaderModule,
      ReactiveFormsModule, 
      FormsModule, 
      CommonModule, 
      NotifierModule],
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
        declarations: [
          PublishdocumentComponent
        ]
})
export class PublishDocumentModule {}
