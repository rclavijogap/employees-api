var express = require('express');
var router = express.Router();

router.get('/:ID', function(req, res, next) {
  res.send(`respond with a resource ${req.params.ID}`);
});

router.delete('/:ID', function(req, res, next) {
  res.send(`respond with a resource ${req.params.ID}`);
});

router.post('/', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
