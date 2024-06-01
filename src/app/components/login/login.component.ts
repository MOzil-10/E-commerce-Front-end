import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private router: Router
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
    if (this.loginForm.valid) {
        const email = this.loginForm.get('email')!.value;
        const password = this.loginForm.get('password')!.value;
        this.authService.login(email, password).subscribe(
            (success) => {
                if (success) {
                    this.snackBar.open('Login Success', 'Ok', { duration: 5000 });
                    this.router.navigate(['/dashboard']);  // Navigate to a different page on success
                } else {
                    this.snackBar.open('Incorrect credentials', 'ERROR', { duration: 5000 });
                }
            },
            (error) => {
                console.error('Login Error:', error); // Log the backend error for debugging
                if (error.status === 403) {
                    this.snackBar.open('Forbidden: Unauthorized access', 'ERROR', { duration: 5000 });
                } else {
                    this.snackBar.open('Login Failed', 'ERROR', { duration: 5000 });
                }
            }
        );
    }
}


  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
