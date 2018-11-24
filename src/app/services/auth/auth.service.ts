import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: firebase.User;

  constructor(public angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.auth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.user = user;
      }
    });
  }

  public createAccount = async (credentials: EmailPasswordCredentials): Promise<any> => {
    const result = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(credentials.email, credentials.password);
    return result;
  }

  public loginWithEmail = async (credentials: EmailPasswordCredentials): Promise<firebase.auth.UserCredential> => {
    const result = await this.angularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    return result;
  }

  public loginWithFacebook = async (): Promise<firebase.auth.UserCredential> => {
    const provider = new firebase.auth.FacebookAuthProvider();
    const result = await this.angularFireAuth.auth.signInWithPopup(provider);

    return result;
  }

  public loginWithGoogle = async (): Promise<firebase.auth.UserCredential> => {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

    const result = await this.angularFireAuth.auth.signInWithPopup(provider);
    return result;
  }

  public async logout(): Promise<void> {
    await this.angularFireAuth.auth.signOut();
    console.log('logged out');
  }
}

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}
