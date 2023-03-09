const usersModel = require("../model/users.model"); //import the products.model module

const usersController = {
  //get controller
  get: (req, res) => {
    return usersModel
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
    return usersModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  }, //end of getDetail controller
  //add controller
  add: (req, res) => {
    return usersModel
      .add(req.body)
      .then((result) => {
        return res.status(201).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  }, //end of add controller
  //update controller
  update: (req, res) => {
    const id = req.params.id;

    return (
      usersModel
        .update(req, id)
        .then((result) => {
          // console.log(result[0]);
          // for (let i = 0; i < result.length; i++) {
          //     unlink(`public/uploads/images/${result[i].img_profile}`, (err) => {
          //         if (err) throw err;
          //     });
          // }
          return res
            .status(200)
            .send({ message: `Successfully update data id=${id}` });
        })
        // Error handling
        .catch((error) => {
          return res.status(400).send({
            Status: 400,
            Message: `${error}`,
          });
        })
    );
  }, //end of update controller
  //remove controller
  remove: (req, res) => {
    return usersModel
      .remove(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
}; //end of remove controller

module.exports = usersController; //export the controller module
