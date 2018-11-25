import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User, AuthService } from '../auth/auth.service';

import { tap, finalize, map } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {

  postsCollection: AngularFirestoreCollection<any>;
  user: User;

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  percentage: Observable<number>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private storage: AngularFireStorage,
  ) {
    this.authService.user.subscribe((user: User): void => {
      this.user = user;
    })
  }

  ngOnInit(): void { }

  public getPosts(uid: string) {
    this.postsCollection = this.afs.collection(uid);
    return this.postsCollection.valueChanges();
  }

  public addPost(post: PostFormData): void {
    console.log(this.user)
    const id = this.afs.createId();
    console.log('Id:', id);
    const path = `${this.user.uid}/${post.imgFile.name}`;

    this.task = this.storage.upload(path, post.imgFile);

    this.task.then(snap => {
      const url = this.storage.ref(path).getDownloadURL();
      url.subscribe(newUrl => {
        this.postsCollection.doc(id).set({
          description: post.description,
          date: post.date,
          imgURL: newUrl,
        })
      })
    })

  }

}

export interface PostFormData {
  description: string;
  imgFile: File;
  date: string;
}

export interface Post {
  imgURL: string;
  description: string;
  date: string;
}
