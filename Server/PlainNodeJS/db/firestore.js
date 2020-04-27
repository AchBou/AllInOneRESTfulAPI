const admin = require('firebase-admin');

var serviceAccount = require("../credentials_files/favapp-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
