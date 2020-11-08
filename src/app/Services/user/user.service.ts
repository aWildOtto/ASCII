import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User as FirebaseUser } from '@firebase/auth-types';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

// tslint:disable:typedef


export interface User {
  uid: string;
  username: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userInfo$ = new BehaviorSubject<User>(null);
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

  public get authState(): Observable<FirebaseUser> {
    return this.afAuth.authState;
  }


  constructor(
    private db: AngularFirestore,
    private rdb: AngularFireDatabase,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {

    this.afAuth.authState.subscribe((signInUser: FirebaseUser) => {
      if (signInUser) {
        this.authMetaData = signInUser;
        /*
         * realtime db online/offline status switcher
         */
        this.userStatusRdbRef = firebase
          .default.database()
          .ref(`status/${signInUser.uid}`);
        this.userStatusRdbRef.set({
          username: signInUser.displayName,
          avatarUrl: signInUser.photoURL,
          ...this.isOnlineForDatabase
        });
        this.userStatusRdbRef.onDisconnect().set({
          username: signInUser.displayName,
          avatarUrl: signInUser.photoURL,
          uid: signInUser.uid,
          ...this.isOfflineForDatabase
        });

      } else {
        this.authMetaData = null;
        this.userInfo$.next(null);
      }
    });

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
  }
}
