import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const GET_USERS_URL = `${environment.baseUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /** Check auth event. */
  checkAuth = new EventEmitter();

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  /**
   * Authenticate a user.
   * @param params Parameters.
   * @returns (Observable) Authenticated user.
   */
  authUser(params: any): Observable<any> {
    if (params.username !== params.password) return throwError(() => new Error("Username & password didn't match."));

    return this.http.get<any[]>(GET_USERS_URL).pipe(
      map(users => this.findUser(users, params))
    );
  }

  /**
   * Get authenticated user.
   * @returns Authenticated user.
   */
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') ?? 'null');
  }

  /**
   * Logout a user.
   */
  logout(): void {
    localStorage.clear();
    this.checkAuth.emit();

    this.router.navigate(['/']);
  }

  /**
   * Find a user based on auth parameters.
   * @param users Users.
   * @param params Auth parameters.
   * @returns (Observable) Found user.
   */
  private findUser(users: any[], params: any): any {
    return users.find(r => r.username === params.username);
  }

}
