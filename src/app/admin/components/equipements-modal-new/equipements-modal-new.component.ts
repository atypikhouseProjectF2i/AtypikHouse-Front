import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EquipementService } from 'src/app/core/services/equipement.service';

@Component({
  selector: 'app-equipements-modal-new',
  templateUrl: './equipements-modal-new.component.html',
  styleUrls: ['./equipements-modal-new.component.scss'],
})
export class EquipementsModalNewComponent implements OnInit {
  equipementForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EquipementsModalNewComponent>,
    private equipementService: EquipementService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.equipementForm = this.formBuilder.group(
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
    if (this.equipementForm.valid) {
      this.equipementService
        .addNewEquipement(this.equipementForm.value)
        .subscribe({
          next: () => {
            this.onCancel();
          },
        });
    }
  }
}
