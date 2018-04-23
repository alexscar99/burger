var orm = require('../config/orm.js');

var burger = {
  all: function(cb) {
    orm.selectAll('burgers', function(res) {
      cb(res);
    });
  },
  create: function(newBurger, cb) {
    orm.insertOne('burgers', newBurger, function(res) {
      cb(res);
    });
  },
  update: function(condition, cb) {
    orm.eatBurger('burgers', condition, function(res) {
      cb(res);
    });
  }

  // update: function(dataObject, condition, cb) {
  //   orm.updateOne('burgers', dataObject, condition, function(res) {
  //     cb(res);
  //   });
  // }
};

module.exports = burger;
