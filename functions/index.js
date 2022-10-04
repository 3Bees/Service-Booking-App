const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
db.settings({timestampsInSnapshots: true});
const stripe = require('stripe')(
  'sk_test_51LM5RzLa8HxjzAgfTimbtKyMoFRFFVHGyvSrNcCOKxYY4xq7K1Ys7UTGAyUq3pLqrT70rmS5Ib6lOITRJpk8C0Tc00zEndg1He',
);
async function getAllChatData() {
  let data = {};
  let querySnapshot = await db.collection('chatNotificaton').get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data = doc.data();
    }
  });
  return data;
}

exports.receiveMessageNotification = functions.firestore
  .document('chatNotificaton/{id}')
  .onWrite(async (change, context) => {
    let after = change.after.data();
    let before = change.before.data();
    let id = context.params?.id;

    console.log('after', JSON.stringify(after));
    const payload = {
      notification: {
        title: 'New Message',
        body: `${after.senderName}  Send you message`,
        sound: 'default',
      },
    };
    const options = {
      priority: 'high',
    };
    admin
      .messaging()
      .sendToDevice(after.fcmToken, payload, options)
      .then(reponse => {});
  });

exports.orderConfirmationNotification = functions.firestore
  .document('orderConfirmationNotification/{id}')
  .onWrite(async (change, context) => {
    let after = change.after.data();
    console.log('after', JSON.stringify(after));
    const payload = {
      notification: {
        title: 'Order Confirmed',
        body: `${after.name} your ${after.orderType} order has been confirmed `,
        sound: 'default',
      },
    };
    const options = {
      priority: 'high',
    };
    admin
      .messaging()
      .sendToDevice(after.fcmToken, payload, options)
      .then(reponse => {});
  });

exports.payWithStripe = functions.https.onRequest((request, response) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys

  // eslint-disable-next-line promise/catch-or-return
  stripe.charges
    .create({
      amount: request.body.amount,
      currency: request.body.currency,
      source: request.body.token,
    })
    .then(charge => {
      // asynchronously called
      response.send(charge);
    })
    .catch(err => {
      console.log(err);
    });
});
