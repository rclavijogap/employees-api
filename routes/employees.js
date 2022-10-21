var express = require('express');
const db = require("../models");
const Employee = db.employees;
var router = express.Router();

router.get('/:id', function(req, res, next) {
  Employee.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      if(!data){
        res.statusCode = 404;
        res.send(`Employee with id ${req.params.id} was not found`);
        return;
      }

      res.send(data);
    })
    .catch((error) => {
      res.statusCode = 500;
      res.send(error.message);
    });
});

router.delete('/:id', function(req, res, next) {
  Employee.destroy({
    where: { id: req.params.id },
  })
    .then((found) => {
      if(!found){
        res.statusCode = 404;
        res.send(`Employee with id ${req.params.id} was not found`);
        return;
      }

      res.send(`Employee with id ${req.params.id} was successfully deleted`);
    })
    .catch((error) => {
      res.statusCode = 500;
      res.send(error.message);
    });
});

router.post("/", function (req, res, next) {
  Employee.upsert(req.body)
    .then(([instance, created]) => {
      res.send(instance);
    })
    .catch((error) => {
      res.statusCode = 400;
      res.send(error.message);
    });
});

module.exports = router;
