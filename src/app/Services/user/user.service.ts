import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User as FirebaseUser } from '@firebase/auth-types';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

// tslint:disable:typedef

export interface User {
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userInfo$ = new BehaviorSubject<User>(null);
  public UsersCollection: AngularFirestoreCollection<User>;
  public authMetaData: FirebaseUser = null;
  private isOfflineForDatabase = {
    state: 'offline',
    lastChanged: firebase.default.database.ServerValue.TIMESTAMP,
  };
  private isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.default.database.ServerValue.TIMESTAMP,
  };
  private userStatusRdbRef: firebase.default.database.Reference;

  private $userObservable: Subscription;

  constructor(
    private db: AngularFirestore,
    private rdb: AngularFireDatabase,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
  }

  /*
 * third party login
 */
  public thirdPartySigninDispatcher(method: string, redirectTo: string) {
    let provider: firebase.default.auth.AuthProvider;
    switch (method) {
      case 'facebook':
        provider = new firebase.default.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        provider = new firebase.default.auth.TwitterAuthProvider();
        break;
      case 'github':
        provider = new firebase.default.auth.GithubAuthProvider();
        break;
      case 'google':
        provider = new firebase.default.auth.GoogleAuthProvider();
        break;

      default:
        break;
    }
    return this.thirdPartySignIn(provider)
      .then(async (user) => {
        if (user) {
          await this.signInSuccess(user.user.uid, redirectTo);
        }
        return user;
      }).catch((error) => {
        console.error(error);
      });
  }

  public thirdPartySignIn(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth
      .setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return this.afAuth.signInWithPopup(provider).then((result) => {
          return result;
        });
      }).catch((error) => {
        console.error(error);
        throw error;
      });
  }

  private async signInSuccess(uid: string, redirectTo: string) {
    await this.router.navigateByUrl(redirectTo || '/');
    setTimeout(() => {
      this.$userObservable = this.UsersCollection.doc(uid)
        .valueChanges()
        .subscribe(async (userInfo: User) => {
          this.userInfo$.next(userInfo);
        });
    }, 1500);
  }
}
