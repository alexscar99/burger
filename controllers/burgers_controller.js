var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function(req, res) {
  burger.all(function(data) {
    var handlebarsObject = {
      burgers: data
    };
    res.render('index', handlebarsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  burger.create(
    ['burger_name', 'devoured'],
    [req.body.data.burger_name, req.body.data.devoured],
    function(result) {
      console.log(result);
      res.json({ id: result.insertValue });
    }
  );
});

router.put('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

module.exports = router;
