import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStateServiceService } from 'src/app/services/auth/auth-state-service.service';
import { AuthResponse } from 'src/app/interface/auth-response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authStateService: AuthStateServiceService // Updated service injection
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(email, password).subscribe(
      (res: AuthResponse) => {
        if (res.token && res.role) {
          this.authStateService.setToken(res.token);
          const user = { role: res.role, userId: res.userId };
          this.authStateService.setUser(user);

          // Check the user role and navigate accordingly
          switch (res.role) {
            case 'ADMIN':
              this.router.navigateByUrl('admin/dashboard');
              break;
            case 'CUSTOMER':
              this.router.navigateByUrl('customers/dashboard');
              break;
            default:
              this.snackBar.open('Login failed: unknown user role', 'Close', { duration: 3000 });
              break;
          }
        } else {
          this.snackBar.open('Login failed: invalid credentials', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        this.snackBar.open('Login failed: invalid credentials', 'Close', { duration: 3000 });
      }
    );
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
