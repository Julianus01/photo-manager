import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostsService, Location } from '../../../services/posts/posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-form-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.scss']
})
export class PostFormDialogComponent implements OnInit {
  locationDomElement: HTMLElement;
  locationSettings = {
    showSearchButton: false,
    inputPlaceholderText: 'Search location',
  }

  isLoading: boolean = false;

  imageSelectedURL: string;
  imgFile: File;
  dateInput: string;
  descriptionTextarea: string;
  titleInput: string;
  locationInput: Location;

  tags: Array<string>;
  tag: string;


  constructor(
    public dialogRef: MatDialogRef<PostFormDialogComponent>,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngAfterViewInit(): void {
    this.initLocationDomElement();
  }

  ngOnInit() { }

  public async createPost(f: NgForm): Promise<void> {
    if (f.invalid) return;

    try {
      const payload = {
        imgFile: this.imgFile,
        date: this.dateInput ? this.dateInput : new Date().getTime().toString(),
        description: this.descriptionTextarea,
        title: this.titleInput,
        location: this.locationInput
      }

      this.isLoading = true;
      await this.postsService.addPost(payload);

      this.isLoading = false;
      this.close();
    } catch (error) {
      this.handleError(error);
    }
  }

  public handleLocationInputChange(data: any): void {
    const { description, url, geometry } = data.data;

    this.locationInput = {
      description,
      url,
      geometry,
    }
  }

  public handleImageInputChange(files): void {
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

  private initLocationDomElement() {
    this.locationDomElement = document.getElementById('search_places') as HTMLElement;
    this.locationDomElement.classList.add('form-control')
  }

  private handleError = error => {
    console.log(error);
  }

  private close = (): void => {
    this.dialogRef.close();
  }

}
