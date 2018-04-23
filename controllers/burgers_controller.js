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
  burger.create({ burger_name: req.body.data }, function(result) {
    console.log(result);
    res.json({ id: result.insertValue });
  });
});

router.put('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  console.log('condition', condition);

  burger.update(condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// router.put('/api/burgers/:id', function(req, res) {
//   var condition = 'id = ' + req.params.id;

//   console.log(condition);

//   burger.updateOne(
//     {
//       devoured: req.body.devoured
//     },
//     condition,
//     function(result) {
//       if (result.changedRows === 0) {
//         return res.status(404).end();
//       }
//       res.status(200).end();
//     }
//   );
// });

module.exports = router;
