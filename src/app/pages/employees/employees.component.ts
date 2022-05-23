import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  navigationExtras: NavigationExtras = {
    state:{
      value: null
    }
  }

  public employeesList: any;

  constructor(private firebaseService: StorageService, private router: Router  ) {
  
   }

  ngOnInit() {
   
  }
  ngAfterViewInit() {
    this.getEmployees();
  }

  onGoToEdit(employee:any) {
    employee.type = "employee"
    this.navigationExtras.state = employee;
    this.router.navigate(['edit'], this.navigationExtras)
  }

  onDismiss(employee:any) {
    this.firebaseService.onDeleteEmployee(employee.id);
  }

 async getEmployees(){
    const employees = await this.firebaseService.getEmployees();
    this.employeesList = employees;

  }
}
