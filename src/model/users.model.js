const db = require("../../helper/connection"); //import the connection.js
const { v4: uuidv4 } = require("uuid"); //import the UUID Version 4 as 'uuidv4'
const usersModel = {
  //query function
  query: (queryParams, sortType = "asc", limit = 5) => {
    if (queryParams.search && queryParams.cat) {
      return `WHERE username LIKE '%${queryParams.search}%' AND gender LIKE '%${queryParams.cat}%' ORDER BY username ${sortType} LIMIT ${limit}`;
    } else if (queryParams.search || queryParams.cat) {
      return `WHERE username LIKE '%${queryParams.search}%' OR gender LIKE '%${queryParams.cat}%' ORDER BY username ${sortType} LIMIT ${limit}`;
    } else {
      return `ORDER BY username ${sortType} limit ${limit}`;
    }
  }, //end of query function
  //get function
  get: function (queryParams) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from auth ${this.query(
          queryParams,
          queryParams.sortBy,
          queryParams.limit
        )}`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  }, //end of get function
  //getDetail function
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from auth WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  }, //end of getDetail function
  //add function
  add: ({
    username,
    email,
    phone,
    adress,
    displayName,
    firstName,
    lastName,
    birthDate,
    gender,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO auth (id, username, email, phone, adress, displayName, firstName, lastName, birthDate, gender) VALUES ('${uuidv4()}','${username}','${email}','${phone}','${adress}','${displayName}','${firstName}','${lastName}','${birthDate}','${gender}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({
              username,
              email,
              phone,
              adress,
              displayName,
              firstName,
              lastName,
              birthDate,
              gender,
            });
          }
        }
      );
    });
  }, //end of add function
  //update function
  update: (req, id) => {
    return new Promise((resolve, reject) => {
      const {
        username,
        email,
        phone,
        address,
        displayname,
        firstname,
        lastname,
        birthday,
        gender,
      } = req.body;
      db.query(`SELECT * FROM auth WHERE id ='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          if (result.rows.length < 1) {
            return failed("Id not found!");
          } else {
            db.query(
              `UPDATE auth SET 
            username='${username || result.rows[0].username}',
            email='${email || result.rows[0].email}',
            phone='${phone || result.rows[0].phone}',
            address='${address || result.rows[0].adress}',
            displayname='${displayname || result.rows[0].displayname}',
            firstname='${firstname || result.rows[0].firstname}', 
            lastname='${lastname || result.rows[0].lastname}',
            birthday='${birthday || result.rows[0].birthday}',
            gender='${gender || result.rows[0].gender}',
            profile_image='${
              req.file != undefined
                ? req.file.filename
                : result.rows[0].profile_image
            }' where id='${id}'`,
              (err, result) => {
                if (err) {
                  return reject(err.message);
                } else {
                  return resolve(result.rows);
                }
              }
            );
          }
        }
      });
    });
  }, //end of update function
  //remove function
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from auth WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
}; //end of remove function

module.exports = usersModel; //export the model module
