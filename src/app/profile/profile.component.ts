import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/shared/login.service';
import { ProfileService } from './shared/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  /** User. */
  user: any;

  constructor(
    private router: Router,
    private login: LoginService,
    private p: ProfileService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get user profile.
   */
  private getUser(): void {
    let user: any = this.login.getUser();
    if (!user) {
      this.router.navigate(['/404']);
      return;
    }

    this.p.getUsers(user.id).subscribe(user => this.user = user);
  }

}
