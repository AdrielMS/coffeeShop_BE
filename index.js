require("dotenv").config();

const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const router = require("./src/route/index.route");
const cors = require("cors");

app.use(express.static("public")); //static file
app.use(urlencoded({ extended: true })); //enable urlencoded
app.use(json()); //enable json
app.use(cors()); //enable CORS
app.use("/api/v1/", router); //default prefix we use

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(5000, (req, res) => {
  console.log("backend successfully running on port 5000");
});
