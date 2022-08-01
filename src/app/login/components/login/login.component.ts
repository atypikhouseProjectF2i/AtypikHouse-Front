import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  connectForm!: FormGroup;
  submitted: boolean = false;
  loggedIn: boolean = false;
  loggedFailed: boolean = false;
  successAccount!: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loader: LoadingService,
    private route: ActivatedRoute
  ) {}

  loading$ = this.loader.loading$;

  ngOnInit(): void {
    if (this.authService.getToken() !== null) {
      this.loggedIn = true;
    }

    this.connectForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
      },
      {
        updateOn: 'blur',
      }
    );

    this.successAccount = this.route.snapshot.paramMap.get('successAccount');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.connectForm.valid) {
      this.authService
        .signIn(this.connectForm.value.email, this.connectForm.value.password)
        .subscribe({
          next: () => {
            this.authService.getRoles().subscribe({
              next: () => {
                this.loggedIn = true;
                location.reload();
              },
            });
          },
          error: () => {
            this.loggedFailed = true;
          },
        });
    }
  }
}
