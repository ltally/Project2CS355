var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM product_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(product_num, callback) {
    var query = 'SELECT * FROM product_view WHERE product_num = ?';
    var queryData = [product_num];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        //orderCustomerViewById (order_num, function (err, customer) {
        //orderShippingViewById (tracking_num, function (err, shipping) {
        //orderCreditViewById (card_number, function (err, credit_card) {
        //orderProductViewById(product_num, function (err, product) {
        //callback(err, order_info, customer, shipping, credit_card, product);
        callback(err, result);
        //});
        //});
        //});
        //});
    });
};

/*var customerProductGetById = function(order_num, callback) {
 var query = 'SELECT * FROM customer_order_view WHERE order_num = ?';
 connection.query(query, order_num, function (err, result) {
 callback(err, result);
 });
 };
 module.exports.customerOrderGetById = customerProductGetById;

 var customerQuantityGetById = function(order_num, callback) {
 var query = 'SELECT * FROM customer_order_view WHERE order_num = ?';
 connection.query(query, order_num, function (err, result) {
 callback(err, result);
 });
 };
 module.exports.customerOrderGetById = customerQuantityGetById;
 */
/*var orderCustomerViewById = function(order_num, callback) {
 var query = 'SELECT * FROM order_view WHERE tracking_num = ?';
 connection.query(query, order_num, function (err, result) {
 callback(err, result);
 });
 };
 module.exports.orderCustomerViewById = orderCustomerViewById;

 var orderShippingViewById = function(tracking_num, callback) {
 var query = 'SELECT * FROM order_view WHERE tracking_num = ?';
 connection.query(query, tracking_num, function (err, result) {
 callback(err, result);
 });
 };
 module.exports.orderShippingViewById = orderShippingViewById;

 var orderCreditViewById = function(card_number, callback) {
 var query = 'SELECT * FROM order_view WHERE card_number = ?';
 connection.query(query, card_number, function (err, result) {
 callback(err, result);
 });
 };
 module.exports.orderCreditViewById = orderCreditViewById;

 var orderProductViewById = function(product_num, callback) {
 var query = 'SELECT * FROM order_view WHERE product_num = ?';
 connection.query(query, product_num, function (err, result) {
 callback(err, result);
 });
 };
 module.exports.orderProductViewById = orderProductViewById;*/


exports.insert = function(params, callback) {
    var query = 'INSERT INTO product (product_num, product_name, price) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.product_num, params.product_name, params.price];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE product SET product_name = ?, price = ? WHERE product_num = ?';
    var queryData = [params.product_name, params.price, params.product_num];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(product_num, callback) {
    var query = 'DELETE FROM product WHERE product_num = ?';
    var queryData = [product_num];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

