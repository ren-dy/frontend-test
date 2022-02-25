import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /** Application title. */
  title = 'Frontend Test';

  /** Authenticated user. */
  user: any;

  constructor(
    private router: Router,
    private login: LoginService
  ) {
    this.login.checkAuth.subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
  }

  /**
   * View user profile page.
   */
  viewProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * View login page.
   */
  viewLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Logout a user.
   */
  logout(): void {
    this.login.logout();
  }

}
