const coap = require("coap"), // or coap
  si = require("systeminformation"),
  client = coap.request({
    hostname: "192.168.219.185",
    observe: true,
    pathname: "client2",
  });

const func = async () => {
  const battery = await si.battery();
  client.write(JSON.stringify(battery.percent));

  client.on("response", function (res) {
    console.log(`on clienton func`);
    console.log(res);
    res.pipe(process.stdout);
    res.on("end", function () {
      process.exit(0);
    });
  });
  client.end();
};

func();
