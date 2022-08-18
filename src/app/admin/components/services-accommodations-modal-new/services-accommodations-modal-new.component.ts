import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicesAccommodationService } from 'src/app/core/services/services-accommodations.service';

@Component({
  selector: 'app-services-accommodations-modal-new',
  templateUrl: './services-accommodations-modal-new.component.html',
  styleUrls: ['./services-accommodations-modal-new.component.scss'],
})
export class ServicesAccommodationsModalNewComponent implements OnInit {
  serviceForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ServicesAccommodationsModalNewComponent>,
    private servicesAccommodations: ServicesAccommodationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.servicesAccommodations
        .addNewService(this.serviceForm.value)
        .subscribe({
          next: () => {
            this.onCancel();
            alert('Service bien enregistrée');
            //location.reload();
          },
        });
    }
  }
}
