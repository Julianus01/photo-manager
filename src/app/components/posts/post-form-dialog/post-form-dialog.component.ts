import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostsService } from '../../../services/posts/posts.service';

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.scss']
})
export class PostFormDialogComponent implements OnInit {

  isLoading: boolean = false;

  imageSelectedURL: string;
  imgFile: File;
  date: string;
  description: string;
  title: string;


  constructor(
    public dialogRef: MatDialogRef<PostFormDialogComponent>,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  protected async createPost() {
    try {
      const payload = {
        imgFile: this.imgFile,
        date: this.date,
        description: this.description,
        title: this.title,
      }

      this.isLoading = true;
      const result = await this.postsService.addPost(payload);
      this.isLoading = false;
    } catch (error) {
      this.handleError(error);
    }
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

  private handleError = error => {
    console.log(error);
  }

}
