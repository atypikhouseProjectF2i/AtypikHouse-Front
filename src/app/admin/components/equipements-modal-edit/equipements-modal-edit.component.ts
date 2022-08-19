import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipementService } from 'src/app/core/services/equipement.service';

@Component({
  selector: 'app-equipements-modal-edit',
  templateUrl: './equipements-modal-edit.component.html',
  styleUrls: ['./equipements-modal-edit.component.scss'],
})
export class EquipementsModalEditComponent implements OnInit {
  editEquipementForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EquipementsModalEditComponent>,
    private equipementService: EquipementService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editEquipementForm = this.formBuilder.group(
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
    this.equipementService
      .updateEquipementById(
        this.editEquipementForm.value.id,
        this.editEquipementForm.value.name
      )
      .subscribe({
        next: () => {
          this.onCancel();
        },
      });
  }
}
