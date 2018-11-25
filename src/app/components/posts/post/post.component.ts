import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() data: Post;

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
