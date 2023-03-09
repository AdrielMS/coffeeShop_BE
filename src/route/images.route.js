//import the express
const express = require("express");
const router = express();
const formUpload = require("../../helper/formUpload");
// const verifyToken = require("../../helper/verifyToken");

//import controller
const imagesController = require("../controller/images.controller");

//route declaration
// router.get("/", imagesController.get);
// router.get("/:id", imagesController.getDetail);
// router.post("/", imagesController.add);
// router.put('/', productsController.update)
// router.patch("/:id", imagesController.update);
// router.delete("/:id", imagesController.remove);

module.exports = router; //export the router module
