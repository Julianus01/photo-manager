import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void { }

  public getPosts(uid: string) {
    this.postsCollection = this.afs.collection(uid);
    return this.postsCollection.valueChanges();
  }

}

export interface Post {
  imgURL: string;
  description: string;
  date: Date;
}
