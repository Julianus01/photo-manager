import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  public getTags(uid: string, postId: string): Observable<any[]> {
    let tagsCollection = this.afs.collection(uid).doc(postId).collection('tags');

    return tagsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }))
  }

  public async addTag(uid: string, postId: string, tag: Tag): Promise<firebase.firestore.DocumentReference> {
    return this.afs.collection(uid).doc(postId).collection('tags').add(tag);
  }

  public deleteTag(uid: string, postId: string, tagId: string): Promise<void> {
    return this.afs.collection(uid).doc(postId).collection('tags').doc(tagId).delete();
  }
}

export interface Tag {
  id?: string;
  value: string;
}
