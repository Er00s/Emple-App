import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { InfoService } from 'src/app/services/info.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-helpless',
  templateUrl: './helpless.component.html',
  styleUrls: ['./helpless.component.scss'],
})
export class HelplessComponent implements OnInit {
  public helplessList!: Employee[];

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };
  constructor(
    private firebaseService: StorageService,
    private router: Router,
    private _infoService: InfoService
  ) {}
  ngOnInit() {
    this.getHelpless();
    this._infoService.getJobs().subscribe((resp)=>{console.log(resp)})
  }
  async getHelpless() {
    const helpless = await this.firebaseService.getHelpless();
    this.helplessList = helpless;
  }

  onGoToEdit(employee?: Employee) {
    if (employee) {
      employee.type = 'helplessContract';
      this.navigationExtras.state = employee;
      this.router.navigate(['edit'], this.navigationExtras);
    } else {
      this.navigationExtras.state = <Employee>{ type: 'newHelpless' };
      this.router.navigate(['edit'], this.navigationExtras);
    }
  }

  onDiscard(employee: Employee): void {
    Swal.fire({
      title: 'Descartar candidato :(',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebaseService.onDeleteHelpless(employee.id).then(() => {
          this.getHelpless();
          Swal.fire('Candidato descartado :(', '', 'success');
        });
      } else if (result.isDenied) {
        Swal.fire('No se aplicaron cambios', '', 'info');
      }
    });
  }
}
