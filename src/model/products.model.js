const db = require("../../helper/connection"); //import the connection.js
const { v4: uuidv4 } = require("uuid"); //import the UUID Version 4 as 'uuidv4'
const productsModel = {
  //query function
  query: (
    queryParams,
    sortType = "asc",
    limit = 5,
    page = 1,
    offset = (page - 1) * limit
  ) => {
    if (queryParams.search && queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' AND category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    } else if (queryParams.search || queryParams.cat) {
      return `WHERE title LIKE '%${queryParams.search}%' OR category LIKE '%${queryParams.cat}%' ORDER BY title ${sortType} LIMIT ${limit} OFFSET ${offset}`;
    } else {
      return `ORDER BY title ${sortType} limit ${limit} OFFSET ${offset}`;
    }
  }, //end of query function
  //get function
  get: function (queryParams) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT products.id, products.title, products.price, products.category,
        json_agg(row_to_json(product_image)) images from products INNER JOIN product_image ON products.id=product_image.id_product GROUP BY products.id ${this.query(
          queryParams,
          queryParams.sortBy,
          queryParams.limit,
          queryParams.offset
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
      db.query(
        `SELECT products.id, products.title, products.price, products.category, products.desc,
      json_agg(row_to_json(product_image)) images FROM products INNER JOIN product_image ON products.id=product_image.id_product WHERE products.id='${id}' GROUP BY products.id `,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  }, //end of getDetail function
  //add function
  add: ({ title, file, price, category, desc }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, title, price, category, desc) VALUES ('${uuidv4()}','${title}','${price}','${category}','${desc}') RETURNING id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            for (let index = 0; index < file.length; index++) {
              db.query(
                `INSERT INTO product_image (id_image, id_product, name, filename) VALUES ($1, $2, $3, $4)`,
                [uuidv4(), result.rows[0].id, title, file[index].filename]
              );
            }
            return resolve({ title, images: file, price, category, desc });
          }
        }
      );
    });
  }, //end of add function
  //update function
  update: ({ id, title, price, category, img, file }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE products SET title = '${
              title || result.rows[0].title
            }', img = '${img || result.rows[0].img}', price = '${
              price || result.rows[0].price
            }', category = '${
              category || result.rows[0].category
            }' WHERE id = '${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                if (file.length <= 0)
                  return resolve({ id, title, img, price, category });

                // for (let index = 0; index < file.length; index++) {
                db.query(
                  `SELECT id_image, filename FROM product_image WHERE id_product='${id}'`,
                  (errOld, resultOld) => {
                    if (errOld) {
                      return reject({ message: errOld });
                    } else if (resultOld.rows.length < file.length) {
                      return reject("fitur tidak tersedia");
                    } else {
                      console.log(resultOld);
                      console.log(file);
                      for (
                        let indexOld = 0;
                        indexOld < file.length;
                        indexOld++
                      ) {
                        db.query(
                          `UPDATE product_image SET filename=$1 WHERE id_image=$2`,
                          [
                            file[indexOld].filename,
                            resultOld.rows[indexOld].id_image,
                          ],
                          (err, result) => {
                            if (err)
                              return reject({
                                message: "Image gagal diupdate",
                              });
                            return resolve({
                              id,
                              title,
                              price,
                              category,
                              oldImage: resultOld.rows,
                              image: file,
                            });
                          }
                        );
                      }
                    }
                  }
                );
                // }
              }
            }
          );
        }
      });
    });
  }, //end of update function
  //remove function
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from products WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `DELETE FROM product_image WHERE id_product='${id}' RETURNING filename`,
            (err, result) => {
              if (err) return reject({ message: "gagal menghapus gambar" });
              return resolve(result.rows);
            }
          );
          // return resolve("success delete");
        }
      });
    });
  },
}; //end of remove function

module.exports = productsModel; //export the model module
