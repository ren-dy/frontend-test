import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  /** Post ID. */
  id!: string;

  /** Post. */
  post: any;

  /** Show/hide comments. Defaults to `false`. */
  showComments: boolean = false;

  constructor(
    private aRoute: ActivatedRoute,
    private p: PostsService
  ) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('id') ?? '0';
    this.getPost();
  }

  /**
   * View comments.
   */
  viewComments(): void {
    this.showComments = true;
  }

  /**
   * Get post.
   */
  private getPost(): void {
    this.p.getPost(this.id).subscribe(post => {
      this.post = post;
      this.getComments();
    });
  }

  /**
   * Get comments.
   */
  private getComments(): void {
    this.p.getComments([this.post]).subscribe(comments => {
      // console.log('Comments', comments);
      this.post.comments = comments[0];
    });
  }

}
