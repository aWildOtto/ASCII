import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import 'firebase/database';
import { User as FirebaseUser } from '@firebase/auth-types';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, UrlSegment } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private rdb: AngularFireDatabase,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {

  }






}
