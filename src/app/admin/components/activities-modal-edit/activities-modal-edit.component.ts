import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-activities-modal-edit',
  templateUrl: './activities-modal-edit.component.html',
  styleUrls: ['./activities-modal-edit.component.scss'],
})
export class ActivitiesModalEditComponent implements OnInit {
  editActivityForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ActivitiesModalEditComponent>,
    private activityService: ActivityService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editActivityForm = this.formBuilder.group(
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
    this.activityService
      .updateActivityById(
        this.editActivityForm.value.id,
        this.editActivityForm.value.name
      )
      .subscribe({
        next: () => {
          this.onCancel();
        },
      });
  }
}
