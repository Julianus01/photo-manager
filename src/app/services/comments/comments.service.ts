import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  public getComments(uid: string, postId: string): Observable<any[]> {
    let commentsCollection = this.afs.collection(uid).doc(postId).collection('comments');

    return commentsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }))
  }

  public async addComment(uid: string, postId: string, comment: Comment): Promise<firebase.firestore.DocumentReference> {
    return this.afs.collection(uid).doc(postId).collection('comments').add(comment)
  }

  public deleteComment(uid: string, postId: string, commentId: string): Promise<void> {
    return this.afs.collection(uid).doc(postId).collection('comments').doc(commentId).delete();
  }
}


export interface Comment {
  id?: string;
  message: string;
}
