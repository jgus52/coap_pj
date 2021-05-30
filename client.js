const coap = require("coap"), // or coap
  si = require("systeminformation"),
  updateSwitch = () => {
    if (alertSwitch === true) console.log(`Please Charge note book`);
  };
var alertSwitch = false;

var interval = setInterval(() => {
  const client = coap.request({
    hostname: "192.168.219.185",
    pathname: "battery",
    //observe: true,
  });

  client.on("response", async function (res) {
    //console.log(client);
    //res.pipe(process.stdout);
    var percent = await JSON.parse(res.payload);
    //console.log(res);

    if (percent.percent < 30) {
      alertSwitch = true;
    } else alertSwitch = false;

    updateSwitch();
  });
  client.end();
}, 5000);
