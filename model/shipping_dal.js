var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM shipping_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(order_num, callback) {
    var query = 'SELECT * FROM shipping_view WHERE order_num = ?';
    var queryData = [order_num];
    console.log(query);

    connection.query(query, queryData, function(err, shipping) {
        shippingBAViewById (order_num, function (err, billing_address) {
            shippingSAViewById(order_num, function (err, shipping_address) {
                callback(err, shipping, billing_address, shipping_address);
            });
        });
    });
};

var shippingBAViewById = function(order_num, callback) {
    var query = 'SELECT * FROM shipping_view WHERE order_num = ?';
    connection.query(query, order_num, function (err, result) {
        callback(err, result);
    });
};
module.exports.shippingBAViewById = shippingBAViewById;

var shippingSAViewById = function(order_num, callback) {
    var query = 'SELECT * FROM shipping_view WHERE order_num = ?';
    connection.query(query, order_num, function (err, result) {
        callback(err, result);
    });
};
module.exports.shippingSAViewById = shippingSAViewById;

exports.insert = function(params, callback) {
    var query = 'INSERT INTO order_info (order_num, email, fname, lname, ifambassador) VALUES (?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.order_num, params.email, params.fname, params.lname, params.ifambassador];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.update = function(params, callback) {
    var query = 'UPDATE order_info SET email = ?, fname = ?, lname = ?, ifambassador = ? WHERE order_num = ?';
    var queryData = [params.email, params.fname, params.lname, params.ifambassador, params.order_num];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(order_num, callback) {
    var query = 'DELETE FROM order_info WHERE order_num = ?';
    var queryData = [order_num];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};


