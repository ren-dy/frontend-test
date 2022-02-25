import { Component, OnInit } from '@angular/core';
import { PostsService } from './shared/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  /** Posts. */
  posts?: any[];

  /** Paginated posts. */
  paginatedPosts: any[][] = [];

  /** Current page. Defaults to `1`. */
  currentPage: number = 1;

  constructor(private p: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  /**
   * Go to page.
   * @param page Page to visit.
   */
  goto(page: number | 'prev' | 'next'): void {
    switch (page) {
      case 'prev':
        this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
        break;

      case 'next':
        this.currentPage = this.currentPage < this.paginatedPosts.length ? this.currentPage + 1 : this.paginatedPosts.length;
        break;

      default:
        this.currentPage = page;
    }

    this.getComments();
  }

  /**
   * Get posts.
   * @param key Search keyword.
   */
  getPosts(key?: string): void {
    this.currentPage = 1;
    this.p.getPosts(key).subscribe({
      next: posts => {
        this.posts = posts;
        this.paginatedPosts = this.p.paginate(posts);
        this.getComments();
      },
      error: error => {
        console.error(error);
      },
    });
  }

  /**
   * Get comments.
   */
  private getComments(): void {
    this.p.getComments(this.paginatedPosts[this.currentPage - 1]).subscribe(comments => {
      // console.log('Comments', comments);
      for (let id = 0; id < comments.length; id++) {
        this.paginatedPosts[this.currentPage - 1][id].comments = comments[id].length;
      }
    });
  }

}
