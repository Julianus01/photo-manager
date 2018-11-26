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
    // return this.postsCollection.snapshotChanges();

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
      console.log(this.user)
      const id = this.afs.createId();
      console.log('Id:', id);
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
          }

          this.postsCollection.doc(id).set(newPost);
          resolve(newPost);
        })
      })
    })
  }

  public deletePost = async (id: string): Promise<void> => {
    try {
      await this.postsCollection.doc(id).delete();
    } catch (error) {
      throw error;
    }
  }

}

export interface PostFormData {
  title: string;
  description: string;
  imgFile: File;
  date: string;
}

export interface Post {
  id?: string;
  title: string;
  imgURL: string;
  description: string;
  date: string;
}
