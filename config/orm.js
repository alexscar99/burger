var connection = require('./connection.js');

// helper function for sql syntax
function createQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
}

// helper function for sql syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string
  for (var key in ob) {
    var value = ob[key];

    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + '=' + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var queryString = 'SELECT * FROM ' + table + ';';
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(table, columns, values, cb) {
    var queryString =
      'INSERT INTO ' +
      table +
      ' (' +
      columns.toString() +
      ') ' +
      'VALUES (' +
      createQuestionMarks(values.length) +
      ') ';

    console.log(queryString);

    connection.query(queryString, values, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  eatBurger: function(table, object, condition, cb) {
    var queryString =
      'UPDATE ' + table + ' SET ' + objToSql(object) + ' WHERE ' + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;
