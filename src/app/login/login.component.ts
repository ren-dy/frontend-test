import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /** Login form. */
  form: FormGroup;

  /** Status/error message. */
  message: string = '';

  constructor(
    private fBuilder: FormBuilder,
    private router: Router,
    private login: LoginService
  ) {
    this.form = this.fBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Authenticating a user.
   */
  authUser(): void {
    this.message = 'Authenticating...';
    this.login.authUser(this.form.value).subscribe({
      next: user => {
        if (!user) {
          this.message = 'No user found.';
          return;
        }

        this.message = '';
        localStorage.setItem('user', JSON.stringify(user));
        this.login.checkAuth.emit();

        this.router.navigate(['/posts']);
      },
      error: error => {
        this.message = error.message ?? 'Error while authenticating user.';
      },
    });
  }

}
