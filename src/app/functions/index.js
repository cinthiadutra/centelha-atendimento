const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.enviarPushNota = functions.https.onCall(async (data, context) => {
  const token = data.token;
  const medium = data.medium;
  const media = data.media;

  const message = {
    token,
    notification: {
      title: `Média de Avaliação: ${medium}`,
      body: `Sua média foi ${media.toFixed(2)} ⭐`,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    return { success: true, response };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
