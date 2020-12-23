import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'customer-document/:fatherId/:headerId',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      },
      {
        path: 'upload',
        loadChildren: './component/uploadfile/upload.module#UploadModule'
      },
      {
        path: 'userlist',
        loadChildren: './component/listuser/listuser.module#ListUserModule'
      },
      {
        path: 'user',
        loadChildren: './component/user/user.module#UserModule'
      },
      {
        path: 'document',
        loadChildren: './component/document/document.module#DocumentModule'
      },
      {
        path: 'document/:fatherId/:headerId',
        loadChildren: './component/document/document.module#DocumentModule'
      },
      {
        path: 'publishDocument',
        loadChildren: './component/document/publishdocument/publishdocument.module#PublishDocumentModule'
      },
      {
        path: 'publishDocument/:fatherId/:headerId',
        loadChildren: './component/document/publishdocument/publishdocument.module#PublishDocumentModule'
      },
      {
        path: 'calendario',
        loadChildren: './component/calendario/calendario.module#CalendarioModule'
      },
      {
        path: 'calendario/:fatherId/:headerId',
        loadChildren: './component/calendario/calendario.module#CalendarioModule'
      },
      {
        path: 'reportes',
        loadChildren: './component/dashboards/dashboards.module#DashboardsModule'
      },
      {
        path: 'options',
        loadChildren: './component/entitieoptions/entitieoptions.module#EntitieoptionsModule'
      },
      {
        path: 'treatments',
        loadChildren: './component/tratamientos/tratamientos/tratamientos.module#TratamientosModule'
      }
      ,
      {
        path: 'treatments-types',
        loadChildren: './component/tratamientostipos/tratamientostipos/tratamientostipos.module#TratamientostiposModule'
      },
      {
        path: 'user-profile',
        loadChildren: './component/userprofile/userprofile/userprofile.module#UserprofileModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
