import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public angularFireAuth: AngularFireAuth) { }

  public createAccount = async (credentials: EmailPasswordCredentials): Promise<any> => {
    try {
      const result = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(credentials.email, credentials.password);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public loginWithFacebook = async (): Promise<any> => {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await this.angularFireAuth.auth.signInWithPopup(provider);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  public loginWithGoogle = async (): Promise<any> => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope('profile');
      provider.addScope('email');

      const result = await this.angularFireAuth.auth.signInWithPopup(provider);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}
