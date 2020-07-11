const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.databaseURL,
});
module.exports = admin.firestore();
