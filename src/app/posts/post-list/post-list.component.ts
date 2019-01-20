import { PostsService } from './../post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  /*
  posts = [
    {title: 'First Post', content: 'This is the first post\'s content'},
    {title: 'Second Post', content: 'This is the second post\'s content'},
    {title: 'Third Post', content: 'This is the third post\'s content'},
  ];
  */
  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPost();
    this.postsSub = this.postsService.getPostUpdateListenter().subscribe(
      (posts: Post[]) => {
          this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }
}
