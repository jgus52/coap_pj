const coap = require("coap"), // or coap
  si = require("systeminformation"),
  client = coap.request({
    port: 5683,
    observe: true,
    pathname: "/Jgus",
  });

const func = async () => {
  const battery = await si.battery();
  client.write(JSON.stringify(battery.percent));

  client.on("response", function (res) {
    console.log(`on clienton func`);
    res.pipe(process.stdout);
    res.on("end", function () {
      process.exit(0);
    });
  });
  client.end();
};

func();
