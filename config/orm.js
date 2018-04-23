var connection = require('./connection.js');

var orm = {
  selectAll: function(table, cb) {
    var queryString = 'SELECT * FROM ' + table + ';';
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(table, tableData, cb) {
    var queryString = 'INSERT INTO ' + table + ' SET ?';

    console.log(queryString);

    connection.query(queryString, tableData, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  eatBurger: function(table, condition, cb) {
    var queryString =
      'UPDATE ' + table + ' SET devoured = true  WHERE ' + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = 'DELETE FROM ' + table + ' WHERE ' + condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;
