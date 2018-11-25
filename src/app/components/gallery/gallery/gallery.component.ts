import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Post, GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  private user: firebase.User;

  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  snapshot: any;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private galleryService: GalleryService,
  ) { }

  ngOnInit() {
    this.postsCollection = this.afs.collection('posts');
    this.posts = this.postsCollection.valueChanges();
    this.snapshot = this.postsCollection.snapshotChanges().map(arr => {
      console.log(arr);
      arr.map(snap => snap.type);
    })
  }

}
