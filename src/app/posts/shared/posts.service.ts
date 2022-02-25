import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const GET_USERS_URL = `${environment.baseUrl}/users`;
const GET_POSTS_URL = `${environment.baseUrl}/posts`;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  /**
   * Get posts.
   * @param key Search keyword.
   * @returns (Observable) Posts.
   */
  getPosts(key?: string): Observable<any[]> {
    return forkJoin([
      this.http.get<any[]>(GET_USERS_URL),
      this.http.get<any[]>(GET_POSTS_URL),
    ]).pipe(
      map(res => this.parsePosts(...res, key))
    );
  }

  /**
   * Get single post.
   * @param id Post ID.
   * @returns (Observable) Post.
   */
  getPost(id: string): Observable<any> {
    let result: any;

    return this.http.get<any>(`${GET_POSTS_URL}/${id}`).pipe(
      map(post => result = post),
      concatMap(post => this.http.get<any>(`${GET_USERS_URL}/${post.userId}`)),
      map(user => ({ ...result, user }))
    );
  }

  /**
   * Get comments related to posts.
   * @param posts Posts.
   * @returns (Observable) Comments related to posts.
   */
  getComments(posts: any[] = []): Observable<any[][]> {
    let requests: Observable<any[]>[] = posts.map(post => {
      return this.http.get<any[]>(`${GET_POSTS_URL}/${post.id}/comments`);
    });

    return forkJoin(requests);
  }

  /**
   * Paginate data.
   * @param data Data.
   * @param perPage Data displayed per page. Defaults to `10`.
   * @returns Paginated data.
   */
  paginate(data: any[], perPage = 10): any[][] {
    let pages = Math.ceil(data.length / perPage);

    let chunks = [];
    for (let i = 0; i < pages; i++) {
      chunks.push(data.slice(i * perPage, (i+1) * perPage));
    }

    return chunks;
  }

  /**
   * Parse posts.
   * @param users Users.
   * @param posts Posts.
   * @returns Posts with populated users.
   */
  private parsePosts(users: any[], posts: any[], key: string = ''): any[] {
    return posts
      .filter(post => (post.title as string).includes(key))
      .map(post => ({ ...post, user: users.find(u => u.id == post.userId) }))
      .sort((a, b) => +(a.title > b.title) || -(a.title < b.title));
  }

}
