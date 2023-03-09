//import the express
const express = require("express");
const router = express();
const formUpload = require("../../helper/formUpload");

//import controller
const usersController = require("../controller/users.controller");

//route declaration
router.get("/", usersController.get);
router.get("/:id", usersController.getDetail);
// router.post("/", usersController.add);
// router.put('/', usersController.update)
router.patch(
  "/:id",
  formUpload.single("profile_image"),
  usersController.update
);
router.delete("/:id", usersController.remove);

module.exports = router; //export the router module
