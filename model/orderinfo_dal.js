var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM order_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(order_num, callback) {
    var query = 'SELECT * FROM order_view WHERE order_num = ?';
    var queryData = [order_num];
    console.log(query);

    connection.query(query, queryData, function(err, order_info) {
        //orderCustomerViewById (order_num, function (err, customer) {
            //orderShippingViewById (tracking_num, function (err, shipping) {
                //orderProductQuanViewById (order_num, function (err, order_product) {
                    orderProductViewById(order_num, function (err, order_product) {
                        //callback(err, order_info, customer, shipping, credit_card, product);
                        callback(err, order_info, order_product);
                    //});
                //});
            //});
        });
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

var orderCustomerViewById = function(order_num, callback) {
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

var orderProductQuanViewById = function(product_num, callback) {
    var query = 'SELECT * FROM order_view WHERE order_num = ?';
    connection.query(query, order_num, function (err, result) {
        callback(err, result);
    });
};
module.exports.orderProductQuanViewById = orderProductQuanViewById;*/

var orderProductViewById = function(order_num, callback) {
    var query = 'SELECT * FROM order_view WHERE order_num = ?';
    connection.query(query, order_num, function (err, result) {
        callback(err, result);
    });
};
module.exports.orderProductViewById = orderProductViewById;


exports.insert = function(params, callback) {
    var query = 'INSERT INTO order_info (order_num, email, fname, lname, ifambassador) VALUES (?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var orderData = [params.order_num, params.email, params.fname, params.lname, params.ifambassador];

    connection.query(query, orderData, function(err, result) {
        var order_num = result.insertId;
        orderProductInsert(order_num, params.product_num, function (err, result) {
        });
        callback(err, result);
    });
};
var orderProductInsert = function(order_num, productIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO order_product (order_num, product_num) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var orderProductData = [];
    for(var i=0; i < productIdArray.length; i++) {
        orderProductData.push([order_num, productIdArray[i]]);
    }
    connection.query(query, [orderProductData], function(err, result){
        console.log("INSERTING PRODUCTS");
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.orderProductInsert = orderProductInsert;

exports.update = function(params, callback) {
    var query = 'UPDATE order_info SET order_date = ? coupon_code = ? WHERE order_num = ?';
    var queryData = [params.order_date, params.coupon_code, params.order_num];

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

