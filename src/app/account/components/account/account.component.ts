import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  token!: any;
  userData$!: Observable<User>;
  regexPhone: string = '^((\\+)33|0)[1-9](\\d{2}){4}$';
  userPutForm!: FormGroup;
  idUser!: number;
  loading$ = this.loader.loading$;
  putSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private loader: LoadingService,
    private ref: ChangeDetectorRef,
    private formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (this.token) {
      this.userData$ = this.authService.getUser().pipe(
        tap((response) => {
          this.idUser = response.id;
          this.userPutForm.patchValue(response);
        })
      );
    }
    this.userPutForm = this.formBuiler.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      firstname: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(this.regexPhone)]],
      newsletter: [false],
    });
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSubmit() {
    if (this.userPutForm.valid) {
      this.authService
        .updateUser(this.idUser, this.userPutForm.value)
        .subscribe({
          next: () => {
            this.putSuccess = true;
          },
          error: () => {
            console.log();
          },
        });
    }
  }
}
