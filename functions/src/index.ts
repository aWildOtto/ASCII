import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as admin from 'firebase-admin';
import FieldValue = admin.firestore.FieldValue;

import UserRecord = admin.auth.UserRecord;

const db = admin.firestore();

export const onUserCreate = functions.auth.user().onCreate((user) => {
    console.log('A new user signed in for the first time.');
    return db
        .doc('User/' + user.uid)
        .get()
        .then(async (res: any) => {
            res.ref.set(userConstructor(user, 'email'))
                .then(() => {
                    updateUserMetaInfo(user.uid);
                })
                .catch((error: any) => {
                    console.error(error);
                });
        });
});

/*
 * sync user info
 */
export const syncUserInfo = functions.firestore
    .document(`User/{uid}`)
    .onUpdate(async (snap, context) => {
        console.log(`Updating user ${snap.after.id}`);
        const userInfo = snap.after.data();
        if (userInfo?.username || userInfo?.avatarUrl) {
            await admin.auth().updateUser(snap.after.id, {
                displayName: userInfo?.username,
                photoURL: userInfo?.avatarUrl ? userInfo.avatarUrl : '',
            });
        }
    });


export const unreadNotification = functions.firestore
    .document('ChatMessages/{chatRoomId}/history/{msgId}')
    .onCreate(async (snap, context) => {
        const msg = snap.data();
        if (!msg) {
            throw new Error('message not sent');
        }

        const receiverId = msg.receiver;
        const senderId = msg.sender;

        // console.log(receiverOnline);
        const sender = await admin.auth().getUser(senderId);

        // update most recent chat message
        admin
            .firestore()
            .doc(`ChatMessages/${context.params.chatRoomId}`)
            .update({
                mostRecent: {
                    ...snap.data(),
                    senderName: sender.displayName || 'Shady Individual',
                    senderPhotoUrl:
                        sender.photoURL ||
                        'https://i.ytimg.com/vi/fUWrhetZh9M/maxresdefault.jpg',
                },
            })
            .then((result) => {
                console.log('saved most recent message');
            })
            .catch((err) => {
                console.error(err);
            });

        const notificationBody: admin.messaging.MessagingPayload = {
            data: {
                fromId: senderId,
                date: new Date().toUTCString()
            },
            notification: {
                title: 'You\'ve got a chat message',
                body: `${sender.displayName || 'A shady individual'} says ${msg.message
                    }`,
                icon: sender.photoURL
                    ? sender.photoURL
                    : 'https://i.ytimg.com/vi/fUWrhetZh9M/maxresdefault.jpg',
            },
        };
        // save notification data
        admin
            .database()
            .ref(`notifications/${receiverId}/chat/${senderId}`)
            .push(notificationBody);
    });


export const cleanupUser = functions.auth.user().onDelete(async (user) => {
    const dbRef = admin.firestore().collection('stripe_customers');
    console.log(` Deleting User ${user.uid}`);
    await db.doc(`MetaInfo/User`).set({ total: FieldValue.increment(-1) }, { merge: true });
    await dbRef.doc(user.uid).delete();
    await db.collection('User').doc(user.uid).delete();
    return;
});

// helper function
function updateUserMetaInfo(uid: string) {
    db.doc('MetaInfo/User')
        .set({ total: FieldValue.increment(1) }, { merge: true })
        .then((writeResult) => {
            if (writeResult) {
                console.log('metaInfo update');
            }
        })
        .catch((error) => {
            console.error(error);
            console.error('update User metainfo failed');
        });
    console.log(`${uid} have been created into database!`);
}


function userConstructor(user: UserRecord, method: string) {
    return {
        created: admin.firestore.Timestamp.now(),
        updated: admin.firestore.Timestamp.now(),
        username: method === 'email' ? user.displayName : '',
        avatarUrl: method === 'email' ? user.photoURL : '',
        uid: user.uid
    };
}
