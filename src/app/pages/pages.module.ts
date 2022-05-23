import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { HelplessComponent } from './helpless/helpless.component';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeesComponent,
    HelplessComponent,
    EditComponent
  ],
  exports:  [
    EmployeesComponent,
    HelplessComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
