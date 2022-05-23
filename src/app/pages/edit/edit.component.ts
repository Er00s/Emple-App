import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { InfoService } from 'src/app/services/info.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  
  public jobs: any;

  public comingEmployee!: Employee;

  public employeeForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    birth: ['', [Validators.required, ]],
    job: ['', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _storageService: StorageService
  ) {
    this.onLoadData();
    // this.jobs = this._infoService.getJobs().subscribe(async (r)=>{console.log(r) })
  }

  ngOnInit(): void {}

  saveEmployee() {
    // agregar candidato
    if(this.employeeForm.valid){
      if (this.comingEmployee?.type === 'newHelpless') {
        Swal.fire({
          title: 'Confirmar nuevo candidato',
          showDenyButton: true,
          confirmButtonText: 'Agregar Candidato',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            this._storageService
              .onSaveHelpless(this.employeeForm.value)
              .then(() => {
                this.router.navigate(['helpless']);
                Swal.fire('Candidato agregado', '', 'success');
              });
          } else if (result.isDenied) {
            Swal.fire('No se aplicaron cambios', '', 'info');
          }
        });
      }
      // Contratar candidato
      else if (this.comingEmployee?.type === 'helplessContract') {
        Swal.fire({
          title: 'Confirmar contratacion del candidato',
          showDenyButton: true,
          confirmButtonText: 'Contratar',
          denyButtonText: `Cancelar`,
        }).then((result) => {        
          if (result.isConfirmed) {
            const newEmployee = this.employeeForm.value;
            this._storageService.onDeleteHelpless(this.comingEmployee.id);
            this._storageService.onSaveEmployee(newEmployee).then(() => {
              this.router.navigate(['employees']);
              Swal.fire('Candidato contratado!', '', 'success');
            });
          } else if (result.isDenied) {
            Swal.fire('No se aplicaron cambios', '', 'info');
          }
        });
      }
      // Editar empleado
      else if (this.comingEmployee?.type === 'employee') {
        Swal.fire({
          title: 'Editar datos del empleado',
          showDenyButton: true,
          confirmButtonText: 'Actualizar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            const employeeToEdit = this.employeeForm.value;
            employeeToEdit.id = this.comingEmployee.id;
            this._storageService
              .onEditEmployee(this.employeeForm.value)
              .then(() => {
                this.router.navigate(['employees']);
                Swal.fire('Datos actualizados', '', 'success');
              });
          } else if (result.isDenied) {
            Swal.fire('No se aplicaron cambios', '', 'info');
          }
        });
      } else {
        Swal.fire({
          title: 'Confirmar nuevo candidato',
          showDenyButton: true,
          confirmButtonText: 'Agregar Candidato',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            this._storageService
              .onSaveHelpless(this.employeeForm.value)
              .then(() => {
                this.router.navigate(['helpless']);
                Swal.fire('Candidato agregado', '', 'success');
              });
          } else if (result.isDenied) {
            Swal.fire('No se aplicaron cambios', '', 'info');
          }
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Los datos no estan correctos',
        text: 'Faltan datos en el formulario o estan mal ingresados',
      })
    }
  
  }

  deleteEmployee() {
    Swal.fire({
      title: 'Despedir empleado :(',
      showDenyButton: true,
      confirmButtonText: 'Agregar Candidato',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._storageService
          .onDeleteEmployee(this.comingEmployee.id)
          .then(() => {
            this.router.navigate(['employees']);

            Swal.fire('Empleado Despedido :(', '', 'success');
          });
      } else if (result.isDenied) {
        Swal.fire('No se aplicaron cambios', '', 'info');
      }
    });
  }

  onLoadData(){
    const navigation = this.router.getCurrentNavigation();
    this.comingEmployee = <Employee>navigation?.extras.state;
    if (this.comingEmployee) {
      const employee = {
        name: this.comingEmployee.name || '',
        lastname: this.comingEmployee.lastname || '',
        birth: this.comingEmployee.birth || '',
        job: this.comingEmployee.job || '',
      };
      this.employeeForm.setValue(employee);
    }
  }
}
