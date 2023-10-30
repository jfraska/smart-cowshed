const admin = require("firebase-admin");
const db = require("../models");
const User = db.user;
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getFcmTokenById = async (id) => {
  return User.findByPk(id, {
    attributes: ["id", "fcmToken"],
  });
};

const sendNotification = async (title, messageBody, userId) => {
  const user = await getFcmTokenById(userId);

  if (!user || !user.fcmToken) {
    return;
  }

  const message = {
    notification: {
      title: title,
      body: messageBody,
    },
    token: user.fcmToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Notifikasi berhasil dikirim:", response);
    })
    .catch((error) => {
      console.log("Kesalahan dalam mengirim notifikasi:", error);
    });
};

module.exports = {
  sendNotification,
};
