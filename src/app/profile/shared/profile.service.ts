import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const GET_USERS_URL = `${environment.baseUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  /**
   * Get user.
   * @param id User ID.
   * @returns (Observable) User.
   */
  getUsers(id: string): Observable<any> {
    // console.log('User ID', id);
    return this.http.get<any>(`${GET_USERS_URL}/${id}`);
  }

}
