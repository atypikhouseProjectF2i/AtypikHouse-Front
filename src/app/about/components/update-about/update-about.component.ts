import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { About } from 'src/app/core/models/about-model';
import { AboutService } from 'src/app/core/services/about.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-update-about',
  templateUrl: './update-about.component.html',
  styleUrls: ['./update-about.component.scss'],
})
export class UpdateAboutComponent implements OnInit {
  roles!: any;
  admin: boolean = false;
  loading$ = this.loader.loading$;
  about$!: Observable<About>;
  updateForm!: FormGroup;
  success: boolean = false;

  constructor(
    private aboutService: AboutService,
    private loader: LoadingService,
    private ref: ChangeDetectorRef,
    private formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.roles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    if (this.roles.includes('ROLE_ADMIN')) {
      this.admin = true;
      this.about$ = this.aboutService
        .getAboutText()
        .pipe(tap((response: any) => this.updateForm.patchValue(response)));
    }

    this.updateForm = this.formBuiler.group(
      {
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.aboutService.putAboutText(this.updateForm.value).subscribe({
        next: () => {
          this.success = true;
        },
        error: () => {
          this.success = false;
        },
      });
    }
  }
}
