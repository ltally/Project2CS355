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

exports.getById = function(tracking_num, callback) {
    var query = 'SELECT * FROM shipping_view WHERE tracking_num = ?';
    var queryData = [tracking_num];
    console.log(query);

    connection.query(query, queryData, function(err, shipping) {
        shippingBAViewById (tracking_num, function (err, billing_address) {
            shippingSAViewById(tracking_num, function (err, shipping_address) {
                callback(err, shipping, billing_address, shipping_address);
            });
        });
    });
};

var shippingBAViewById = function(tracking_num, callback) {
    var query = 'SELECT * FROM shipping_view WHERE tracking_num = ?';
    connection.query(query, tracking_num, function (err, result) {
        callback(err, result);
    });
};
module.exports.shippingBAViewById = shippingBAViewById;

var shippingSAViewById = function(tracking_num, callback) {
    var query = 'SELECT * FROM shipping_view WHERE tracking_num = ?';
    connection.query(query, tracking_num, function (err, result) {
        callback(err, result);
    });
};
module.exports.shippingSAViewById = shippingSAViewById;

exports.insert = function(params, callback) {
    var query = 'INSERT INTO shipping (tracking_num, ship_date, shipping_address, billing_address) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.tracking_num, params.ship_date, params.shipping_address, params.billing_address];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE shipping SET ship_date = ? WHERE tracking_num = ?';
    var queryData = [params.ship_date, params.tracking_num];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(tracking_num, callback) {
    var query = 'DELETE FROM shipping WHERE tracking_num = ?';
    var queryData = [tracking_num];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};


