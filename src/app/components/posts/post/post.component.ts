import { Component, OnInit, Input } from '@angular/core';
import { Post, PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() data: any;

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  protected deletePost = async (): Promise<any> => {
    try {
      console.log(this.data.id)
      await this.postsService.deletePost(this.data.id);
    } catch(error) {
      console.log(error);
    }
  } 

}
