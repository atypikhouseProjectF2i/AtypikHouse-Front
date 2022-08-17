import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { ServiceAccommodation } from 'src/app/core/models/service-accommodation.model';
import { ServicesAccommodationService } from 'src/app/core/services/services-accommodations.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  servicesAccommodations$!: Observable<ServiceAccommodation[]>;
  modalContent!: any;

  constructor(
    private servicesAccommodationsService: ServicesAccommodationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.servicesAccommodations$ = this.servicesAccommodationsService
      .getAllServices()
      .pipe(map((res: any) => res['hydra:member']));
  }

  editService(idService: number) {
    alert(idService);
  }

  open(content: any, services: ServiceAccommodation) {
    this.modalContent = services;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
