import { Component, OnInit, Input } from '@angular/core';
import { Post, PostsService } from 'src/app/services/posts/posts.service';
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() data: Post;

  constructor(
    public dialog: MatDialog,
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  public openDeleteConfirmationDialog = (id: string): void => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      autoFocus: false,
      data: {
        message: "Are you sure you want to delete this post?",
        confirmationAction: this.deletePost
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.snackbarService.open("Deleted", "Close", {
      //   duration: 3000
      // });
    });
  };

  protected deletePost = async (): Promise<any> => {
    try {
      await this.postsService.deletePost(this.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  protected likeOrUnlikePost = async () => {
    await this.postsService.likeOrUnlikePost(this.data.id, !this.data.isLiked);
  }

}
