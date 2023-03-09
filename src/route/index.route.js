const express = require("express"); //import express
const router = express();

//import route
const productsRoute = require("./products.route");
const usersRoute = require("./users.route");
const authRoute = require("../route/auth.route");
const imagesRoute = require("../route/images.route");
// const orderRoute = require("")
// const historyRoute = require("")

//function for homepage (base prefix)
router.get("/", (req, res) => {
  return res.send("backend for coffeeshop");
});

router.use("/products", productsRoute);
router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/", imagesRoute);
// router.use("/", orderRouter)
// router.use("/", historyRoute)

module.exports = router; //export the index.router.js module
