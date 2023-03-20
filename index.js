require("dotenv").config();

const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const router = require("./src/route/index.route");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(cors()); //enable CORS
app.use(bodyParser.json());
app.use(express.static("public")); //static file
app.use(urlencoded({ extended: true })); //enable urlencoded
app.use(json()); //enable json
app.use("/api/v1/", router); //default prefix we use

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(port, (req, res) => {
  console.log(`Coffeeshop backend successfully running on port ${port}`);
});
