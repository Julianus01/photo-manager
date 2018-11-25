import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostsService } from '../../../services/posts/posts.service';

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.scss']
})
export class PostFormDialogComponent implements OnInit {

  imageSelectedURL: string;
  imgFile: File;
  date: string;
  description: string;


  constructor(
    public dialogRef: MatDialogRef<PostFormDialogComponent>,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  protected createPost() {
    const payload = {
      imgFile: this.imgFile,
      date: this.date,
      description: this.description,
    }

    this.postsService.addPost(payload);
  }

  protected handleImageInputChange(files): void {
    if (!files.item(0)) {
      return;
    }

    this.imgFile = files.item(0);
    this.previewImageBeforeUpload(this.imgFile);
  }

  private previewImageBeforeUpload(fileImage: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imageSelectedURL = event.target.result;

    reader.readAsDataURL(fileImage);
  }

}
