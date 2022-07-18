import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  connectForm!: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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
        .pipe(
          map((response: any) => {
            if (response) {
              console.log(response);
            } else {
              localStorage.setItem('jwt', JSON.stringify(response));
            }
          })
        )
        .subscribe();
    }
  }
}
