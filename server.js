const express = require("express");
const routerUser = require("./routes/user");
const routerProduct = require("./routes/product");
const routerOrder = require("./routes/order");
const routerFeedback = require("./routes/feedback")
const bodyParser = require("body-parser");

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());

// use all the routers
app.use("/user", routerUser);
app.use("/product", routerProduct);
app.use("/order", routerOrder);
app.use("/feedback", routerFeedback);

// routes
app.get("/", (request, response) => {
  response.send("welcome to backend");
});

app.listen(8888, "0.0.0.0", () => {
  console.log("server started on port 8888");
});
