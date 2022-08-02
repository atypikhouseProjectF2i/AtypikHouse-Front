import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted: boolean = false;
  regexPhone: string = '^((\\+)33|0)[1-9](\\d{2}){4}$';
  emailAlreadyUsed: boolean = false;
  isSuccessful: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loader: LoadingService,
    private router: Router
  ) {}

  loading$ = this.loader.loading$;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: [null, [Validators.required, Validators.minLength(5)]],
        firstname: [null, [Validators.required, Validators.minLength(5)]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        phone: [
          null,
          [Validators.required, Validators.pattern(this.regexPhone)],
        ],
        newsletter: [false],
        termCondition: [null, [Validators.requiredTrue]],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.authService.signUp(this.signupForm.value).subscribe({
        next: () => {
          this.isSuccessful = true;
        },
        error: (error) => {
          error.status === 422
            ? (this.emailAlreadyUsed = true)
            : (this.emailAlreadyUsed = false);
        },
      });
    }
  }
}
