import { NgModule, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsRoutes } from './forms.routing';
import { CustomFormsModule } from 'ng2-validation';
import { NGXFormWizardModule } from "./ngx-wizard/ngx-wizard.module";

import { FormBasicComponent } from './form-basic/basic.component';
import { FormvalComponent } from './form-validation/form-validation.component';
import { CheckradioComponent } from './checkbox-radio/cr.component';
import { ForminputsComponent } from './form-inputs/inputs.component';
import { GridsComponent } from './input-grids/grids.component';
import { InputgroupsComponent } from './input-groups/input-groups.component';
import { FormhorizontalComponent } from './form-horizontal/horizontal.component';
import { FormactionsComponent } from './form-actions/actions.component';
import { FormrowsepComponent } from './form-row-separator/row-sep.component';
import { FormstripedComponent } from './form-striped-row/striped.component';
import { FormdetailComponent } from './form-detail/detail.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(FormsRoutes), FormsModule, NGXFormWizardModule, NgbModule, CustomFormsModule, ReactiveFormsModule],
  declarations: [
    FormBasicComponent,
    FormvalComponent,
    CheckradioComponent,
    ForminputsComponent,
    GridsComponent,
    InputgroupsComponent,
    FormhorizontalComponent,
    FormactionsComponent,
    FormrowsepComponent,
    FormstripedComponent,
    FormdetailComponent
  ]
})
export class FormModule {}
