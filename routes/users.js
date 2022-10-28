var express = require('express');
const db = require("../models");
var router = express.Router();
const User = db.users;
const security = require('../utils/security');

router.post("/signup", async function (req, res, next) {
    let hash = security.encryptPassword(req.body.password);
    req.body.password = hash;
    User.create(req.body)
    .then(([instance, created]) => {
      res.send(instance);
    })
    .catch((error) => {
      res.statusCode = 400;
      res.send(error.message);
    });
});

router.post("/signin", function (req, res, next) {
    let hash = security.encryptPassword(req.body.password);
    User.findOne({
        where: { email: req.body.email, password: hash}
    })
    .then((data) => {
        if(!data){
          res.statusCode = 404;
          res.send(`There are no users with the given email [${req.body.email}]`);
          return;
        }
        const token = security.generateAccessToken(data.get({ plain: true }));

        res.send({token});
      })
      .catch((error) => {
        res.statusCode = 500;
        res.send(error.message);
      });
});

module.exports = router;
