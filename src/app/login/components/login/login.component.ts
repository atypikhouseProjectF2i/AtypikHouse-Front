import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, window } from 'rxjs';
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

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
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.connectForm.valid) {
      this.authService
        .signIn(this.connectForm.value.email, this.connectForm.value.password)
        .subscribe({
          next: () => {
            this.loggedIn = true;
            this.authService.getRoles().subscribe({
              next: () => {
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
