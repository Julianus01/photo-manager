import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/services/auth/auth.service';
import { Post, PostsService } from 'src/app/services/posts/posts.service';
import { MatDialog } from '@angular/material';
import { PostFormDialogComponent } from '../post-form-dialog/post-form-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;
  imageSelected: File = null;
  imageSelectedURL: string;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit() {
    this.authService.user.subscribe((user: User): void => {
      this.posts$ = this.postsService.getPosts(user.uid);
    })
  }

  openDialog(): void {
    this.dialog.open(PostFormDialogComponent, {
      width: '500px',
      autoFocus: false,
    });
  }

  public trackByFn = (index: number, post: Post) => index;

}
