import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-activities-modal-new',
  templateUrl: './activities-modal-new.component.html',
  styleUrls: ['./activities-modal-new.component.scss'],
})
export class ActivitiesModalNewComponent implements OnInit {
  activityForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ActivitiesModalNewComponent>,
    private activityService: ActivityService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activityForm = this.formBuilder.group(
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
    if (this.activityForm.valid) {
      this.activityService.addNewActivity(this.activityForm.value).subscribe({
        next: () => {
          this.onCancel();
        },
      });
    }
  }
}
