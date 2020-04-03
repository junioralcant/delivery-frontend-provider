class PushNotification {
  pushNotification(userOneSinalId, messageOrder) {
    var sendNotification = function(data) {
      var headers = {
        "Content-Type": "application/json; charset=utf-8"
      };

      var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };

      var https = require("https");
      var req = https.request(options, function(res) {
        res.on("data", function(data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
      });

      req.on("error", function(e) {
        console.log("ERROR:");
        console.log(e);
      });

      req.write(JSON.stringify(data));
      req.end();
    };

    var message = {
      app_id: "b518b1f3-d572-47b2-8dd3-457dc1eec757",
      contents: {
        en: messageOrder
      },
      include_player_ids: [userOneSinalId]
    };

    sendNotification(message);
  }
}

export default new PushNotification();
