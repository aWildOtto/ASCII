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

  getNotification(userId: string, groupId: string, category: string): any {
    return this.db.database.ref(`notifications/${userId}/${category}/${groupId}`).once('value');
  }

  getNotifications(userId: string): any {
    this.notificationRef = this.db.database.ref(`notifications/${userId}`);
    this.notificationRef.on('value', (allNotifications) => {
      const notis = allNotifications.val();
      this.notifications.next(notis);
      this.calNotificationCount(notis);
    });
  }

  calNotificationCount(notifications): void {
    // notifications are sorted by categories and specific userId/orderId
    let total = 0;
    let chat = 0;
    let order = 0;
    for (const category in notifications) {
      if (category) {
        for (const id in notifications[category]) {
          if (id) {
            for (const noti in notifications[category][id]) {
              if (noti) {
                if (category === 'chat') {
                  chat++;
                }
                if (category === 'order') {
                  order++;
                }
                total++;
              }
            }
          }
        }
      }
    }
    this.notificationCount.next({
      chat, total, order
    });
  }

  clearNotifications(userId: string, type: string, id: string): any {
    return this.db.database.ref(`notifications/${userId}/${type}/${id}`).remove();
  }
}
