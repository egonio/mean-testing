import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  URL = 'http://localhost:3000';
  constructor(public http: HttpClient) {}

  getPost() {
    this.http
      .get<{ message: string; posts: Post[] }>(this.URL + '/api/posts')
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListenter() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post(this.URL + '/api/posts', post)
    .subscribe(responseData => {
      console.log(responseData);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
