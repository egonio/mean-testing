import { PostsService } from './../post.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  private  mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  constructor(public postService: PostsService, public router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe(( paramMap: ParamMap ) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe( postData => {
          this.isLoading = false;
          this.post = postData;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }




  onSavePost(form: NgForm) {
    if (!form.invalid) {
      this.isLoading = true;
      if ( this.mode === 'create') {
        this.postService.addPost(form.value.title, form.value.content);
      } else {
        this.postService.updatePost(this.postId,form.value.title, form.value.content);
      }
    }
    form.resetForm();
  }

}
