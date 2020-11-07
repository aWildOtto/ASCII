import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
// import { UserService } from '../user/user.service';

export class NotificationCount {
  total: number;
  chat: number;
  order: number;

  constructor() {
    this.total = 0;
    this.chat = 0;
    this.order = 0;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notifications: BehaviorSubject<any> = new BehaviorSubject(null);
  public notificationRef: firebase.default.database.Reference;
  public notificationCount: BehaviorSubject<NotificationCount> = new BehaviorSubject({
    total: 0,
    chat: 0,
    order: 0
  });

  constructor(
    // private us: UserService,
    private db: AngularFireDatabase) {
    // this.us.authState.subscribe((auth) => {
    //   if (auth) {
    //     this.getNotifications(auth.uid);
    //   } else {
    //     this.notificationRef?.off();
    //   }
    // });
  }

}
