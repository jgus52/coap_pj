const coap = require("coap"), // or coap
  server = coap.createServer();

server.on("request", function (req, res) {
  if (req) console.log(`rcv message`);

  const deg = parseFloat(req.payload.toString());
  if (deg > 40) console.log(`greater than 40`);

  if (req.headers["Observe"] !== 0) return res.end(new Date().toISOString() + "\n");

  res.write(new Date().toISOString() + "  " + req.payload + "\n");

  res.on("finish", function (err) {
    clearInterval(interval);
  });
});

const client = coap.request({
  port: 5683,
  observe: true,
  pathname: "/Jgus",
});
let payload = 44.2;

client.write(JSON.stringify(payload));

server.listen(5683, "127.0.0.1", function () {
  console.log("server started");
  var req = coap.request({
    observe: true,
  });
  let payload = 46.2;
  req.write(JSON.stringify(payload));

  req.on("response", function (res) {
    res.pipe(process.stdout);
  });
  req.end();
});

const func = () => {
  client.on("response", function (res) {
    res.pipe(process.stdout);
  });
  client.end();
};

//console.log(server);
//console.log(client);
func();
