import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null>;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public createAccount = async (credentials: EmailPasswordCredentials): Promise<void> => {
    const result = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(credentials.email, credentials.password);

    return this.updateUserData(result.user);
  }

  public loginWithEmail = async (credentials: EmailPasswordCredentials): Promise<void> => {
    const result = await this.angularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);

    return this.updateUserData(result.user);
  }

  public loginWithFacebook = async (): Promise<void> => {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  public loginWithGoogle = async (): Promise<void> => {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    return this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  private updateUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // Optional linked in photo
      // 'https://media.licdn.com/dms/image/C4D03AQGo6Y_IsfiFaQ/profile-displayphoto-shrink_800_800
      // /0?e=1548288000&v=beta&t=L1OGZainD-7bqHmdh8RrV9kToaz6GAGIBymCnO0Fzl4'
    };

    return userRef.set(data);
  }

  public async logout(): Promise<void> {
    await this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  private handleError(error: Error) {
    console.error(error);
  }
}

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL?: string;
}
