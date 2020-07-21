import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {UserComponent} from './user.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularFileUploaderModule} from "angular-file-uploader";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Nuevo Usuario',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter Page' }
      ]
    },
    component: UserComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), NgbModule, AngularFileUploaderModule],
  declarations: [UserComponent]
})
export class UserModule {}
