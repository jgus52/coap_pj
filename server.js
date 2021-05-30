const coap = require("coap"), // or coap
  si = require("systeminformation"),
  server = coap.createServer();

server.on("request", async function (req, res) {
  var battery = await si.battery();
  res.end(JSON.stringify(battery));

  res.on("finish", function (err) {});
});

server.listen(5683, "192.168.219.185", function () {
  console.log("server started");
});
