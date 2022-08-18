import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesAccommodationService } from 'src/app/core/services/services-accommodations.service';

@Component({
  selector: 'app-services-accommodations-modal-edit',
  templateUrl: 'services-accommodations-modal-edit.component.html',
  styleUrls: ['./services-accommodations-modal-edit.component.scss'],
})
export class ServicesAccommodationsModalEdit implements OnInit {
  editServiceForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ServicesAccommodationsModalEdit>,
    private servicesAccommodations: ServicesAccommodationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editServiceForm = this.formBuilder.group(
      {
        id: [this.data.id],
        name: [this.data.name, [Validators.required]],
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
    this.servicesAccommodations
      .updateServiceById(
        this.editServiceForm.value.id,
        this.editServiceForm.value.name
      )
      .subscribe({
        next: () => {
          this.onCancel();
          alert('Modification bien enregistrée');
        },
      });
  }
}
