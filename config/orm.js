var connection = require('./connection.js');

function questionMarksToString(num) {
  var array = [];

  for (var i = 0; i < num; i++) {
    array.push('?');
  }

  return array.toString();
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
      ' ( (' +
      columns.toString() +
      ') ' +
      'VALUES (' +
      printQuestionMarks(values.length) +
      ') ';

    console.log(queryString);

    connection.query(queryString, values, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: function(table, dataObject, condition, cb) {
    var queryString =
      'UPDATE ' +
      table +
      ' SET ' +
      objToSql(dataObject) +
      ' WHERE ' +
      condition;

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
