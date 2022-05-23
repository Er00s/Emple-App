import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { EmployeesComponent } from './employees/employees.component';
import { HelplessComponent } from './helpless/helpless.component';

const routes: Routes = [
  {
    path: 'helpless',
    component: HelplessComponent,
    data: { title: 'helpless' },
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    data: { title: 'employees' },
  },
  {
    path: 'edit',
    component: EditComponent,
    data: { title: 'edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
