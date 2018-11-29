import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User, AuthService } from '../auth/auth.service';

import {  map } from 'rxjs/operators';
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

    return this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }))
  }

  public addPost(post: PostFormData): Promise<Post> {
    return new Promise((resolve, reject) => {
      const id = this.afs.createId();
      const path = `${this.user.uid}/${post.imgFile.name}`;

      this.task = this.storage.upload(path, post.imgFile);

      this.task.then(snap => {
        const url = this.storage.ref(path).getDownloadURL();
        url.subscribe(newUrl => {
          const newPost = {
            title: post.title,
            description: post.description,
            date: post.date,
            imgURL: newUrl,
            location: post.location,
          }

          this.postsCollection.doc(id).set(newPost);
          resolve(newPost);
        })
      })
    })
  }

  public deletePost = async (postId: string): Promise<void> => {
    await this.postsCollection.doc(postId).delete();
  }

  public addComment = (postId: string, payload) =>
    this.postsCollection.doc(postId).collection('comments').add({ message: payload.message })


  public toggleLikeButton = async (postId: string, value: boolean): Promise<void> => {
    this.postsCollection.doc(postId).update({
      isLiked: value,
    })
  }

}

export interface PostFormData {
  title: string;
  description: string;
  imgFile: File;
  date: string;
  location: Location;
}

export interface Post {
  id?: string;
  title: string;
  imgURL: string;
  description: string;
  date: string;
  isLiked?: boolean;
  comments?: Array<Comment>;
  location?: Location;
  dateCreated?: firebase.firestore.Timestamp
}

export interface Location {
  description: string;
  geometry: LocationGeometry;
  url: string;
}

export interface LocationGeometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    east: number;
    north: number;
    south: number;
    west: number;
  }
}
