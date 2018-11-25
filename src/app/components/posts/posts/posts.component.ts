import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/services/auth/auth.service';
import { Post, PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('submitButton') submitButton: ElementRef;

  posts: Observable<Post[]>;
  imageSelected: File = null;
  imageSelectedURL: string;
  hideModal: boolean;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    this.submitButton.nativeElement.

    this.authService.user.subscribe((user: User): void => {
      this.posts = this.postsService.getPosts(user.uid);
      console.log(this.posts);
    })
  }

  protected createPost() {
    console.log('here')
    this.hideModal = true;
  }

  protected handleImageInputChange(files): void {
    this.imageSelected = files.item(0);
    this.previewImageBeforeUpload(this.imageSelected);
  }

  private previewImageBeforeUpload(fileImage: File) {
    const reader = new FileReader();
    reader.onload = event => this.imageSelectedURL = event.target.result;

    reader.readAsDataURL(fileImage);
  }

}
