import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  URL = 'http://localhost:3000';
  constructor(public http: HttpClient, public router: Router) {}

  getPosts() {
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

  getPost(id: string) {
    this.getPosts();
    return this.http.get<Post>(this.URL + '/api/posts/' + id);
  }

  addPost(title: string, content: string) {
    const post: Post = { _id: null, title: title, content: content };
    this.http.post(this.URL + '/api/posts', post)
    .subscribe(responseData => {
      console.log(responseData);
      this.getPosts();
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {_id: id, title: title, content: content};
    this.http.put(this.URL + '/api/posts/' + id, post)
    .subscribe ( (response) => {
      console.log('updated');
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http
      .delete(this.URL + '/api/posts/' + id)
      .subscribe(() => {
        console.log('Deleted!');
        this.getPosts();
      });
  }
}
