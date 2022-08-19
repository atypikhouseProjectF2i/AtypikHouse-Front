import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceAccommodationService } from 'src/app/core/services/service-accommodation.service';

@Component({
  selector: 'app-services-accommodations-modal-new',
  templateUrl: './services-accommodations-modal-new.component.html',
  styleUrls: ['./services-accommodations-modal-new.component.scss'],
})
export class ServicesAccommodationsModalNewComponent implements OnInit {
  serviceForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ServicesAccommodationsModalNewComponent>,
    private serviceAccommodationService: ServiceAccommodationService,
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
      this.serviceAccommodationService
        .addNewService(this.serviceForm.value)
        .subscribe({
          next: () => {
            this.onCancel();
          },
        });
    }
  }
}
