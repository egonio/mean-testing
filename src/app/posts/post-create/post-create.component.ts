import { PostsService } from './../post.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  constructor(public postService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (!form.invalid) {
      this.postService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }

}
