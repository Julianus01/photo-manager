import { Component, OnInit, Input } from '@angular/core';
import { Post, PostsService } from 'src/app/services/posts/posts.service';
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";
import { AuthService } from '../../../services/auth/auth.service';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { Observable } from 'rxjs';
import { TagsService, Tag } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() data: Post;
  showAddCommentInput: boolean = false;
  showAddTagIput: boolean = false;

  comments: Observable<Comment[]>

  inputs = {
    comment: {
      message: '',
    },
    tag: {
      value: '',
    }
  }

  constructor(
    public dialog: MatDialog,
    private postsService: PostsService,
    public authService: AuthService,
    private commentsService: CommentsService,
    private tagsService: TagsService,
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.comments = this.commentsService.getComments(user.uid, this.data.id)
    })
  }

  public openDeleteConfirmationDialog = (): void => {
    this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      autoFocus: false,
      data: {
        message: "Are you sure you want to delete this post?",
        confirmationAction: this.deletePost
      }
    });
  };

  public async addTag(uid: string): Promise<void> {
    if (this.shouldTagBeAdded(this.inputs.tag)) {
      await this.tagsService.addTag(uid, this.data.id, this.inputs.tag);
      this.inputs.tag.value = '';
    }
  }

  private shouldTagBeAdded = (tag: Tag): boolean => !tag.value ? false : true;

  public deletePost = async (): Promise<any> => {
    try {
      await this.postsService.deletePost(this.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteComment(uid: string, commentId: string): Promise<void> {
    await this.commentsService.deleteComment(uid, this.data.id, commentId);
  }

  public async addComment(uid: string): Promise<void> {
    this.showAddCommentInput = false;
    await this.commentsService.addComment(uid, this.data.id, this.inputs.comment);
    this.inputs.comment.message = '';
  }

  public toggleLikeButton = async () => {
    await this.postsService.toggleLikeButton(this.data.id, !this.data.isLiked);
  }

  public openNewTabWithUrl(url: string) {
    window.open(url, '_blank').focus();
  }

  public openMapsLocationInNewTab() {
    var win = window.open(this.data.location.url, '_blank');
    win.focus();
  }

}
