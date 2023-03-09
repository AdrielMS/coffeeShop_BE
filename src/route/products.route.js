//import the express
const express = require("express");
const router = express();
const formUpload = require("../../helper/formUpload");
const verifyToken = require("../../helper/verifyToken");

//import controller
const productsController = require("../controller/products.controller");

//route declaration
router.get("/", productsController.get);
router.get("/:id", productsController.getDetail);
router.post("/", formUpload.array("img"), productsController.add);
// router.put('/', productsController.update)
router.patch(
  "/:id",
  verifyToken,
  formUpload.array("img"),
  productsController.update
);
router.delete("/:id", productsController.remove);

module.exports = router; //export the router module
