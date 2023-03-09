const productsModel = require("../model/products.model"); //import the products.model module
const { unlink } = require("node:fs");
const productsController = {
  //get controller
  get: (req, res) => {
    return productsModel
      .get(req.query)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  }, //end of getDetail controller
  //getDetail controller
  getDetail: (req, res) => {
    return productsModel
      .getDetail(req.params.id)
      .then((result) => {
        if (result != null) {
          return res.status(200).send({ message: "success", data: result });
          // return res.status(404).send({ message: "Not Found" });
        } else {
          return res.status(400).send({ message: "Not Found" });
          // return res.status(200).send({ message: "success", data: result });
        }
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  }, //end of getDetail controller
  //add controller
  add: (req, res) => {
    if (
      req.body.title != null &&
      req.body.category != null &&
      req.body.price != null
      // req.body.img != null
    ) {
      const request = {
        ...req.body,
        file: req.files,
      };
      return productsModel
        .add(request)
        .then((result) => {
          return res.status(201).send({ message: "success", data: result });
        })
        .catch((error) => {
          return res.status(500).send({ message: error });
        });
    } else {
      return res.status(400).send({ message: "Fill the field!" });
    }
  }, //end of add controller
  //update controller
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      file: req.files,
    };
    return productsModel
      .update(request)
      .then((result) => {
        if (typeof result.oldImage !== "undefined") {
          for (let index = 0; index < result.oldImage.length; index++) {
            console.log(result.oldImage[index].filename);
            unlink(
              `public/upload/images/${result.oldImage[index].filename}`,
              (err) => {
                console.log(
                  `successfully update ${result.oldImage[index].filename}`
                );
              }
            );
          }
        }
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  }, //end of update controller
  //remove controller
  remove: (req, res) => {
    if (req.params.id != ":id") {
      return productsModel
        .remove(req.params.id)
        .then((result) => {
          for (let index = 0; index < result.length; index++) {
            unlink(`public/upload/images/${result[index].filename}`, (err) => {
              if (err) throw err;
              console.log(`successfully delete ${result[index].filename}`);
            });
          }
          return res.status(200).send({ message: "success", data: result });
        })
        .catch((error) => {
          return res.status(500).send({ message: error });
        });
    } else {
      return res.status(400).send({ message: "Where's the id?" });
    }
  },
}; //end of remove controller

module.exports = productsController; //export the controller module
