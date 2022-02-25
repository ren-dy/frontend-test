import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    PostsComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class PostsModule { }
