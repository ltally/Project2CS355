var express = require('express');
var router = express.Router();
var product_dal = require('../model/product_dal');


// View All orders
router.get('/all', function(req, res) {
    product_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('product/productViewAll', { 'result':result });
        }
    });

});

// View the order_info for the given id
router.get('/', function(req, res){
    if(req.query.product_num == null) {
        res.send('product_num is null');
    }
    else {
        product_dal.getById(req.query.product_num, function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('product/productViewById', {'result': result});
            }
        });
    }
});

// Return the add a new order_info form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    orderinfo_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('order_info/orderinfoAdd', {'order_info': result});
        }
    });
});

// insert an order_info record
router.get('/insert', function(req, res){
    //simple validation
    if(req.query.email == null) {
        res.send('Email must be provided.');
    }
    else if(req.query.fname == null){
        res.send('A first name must be selected');
    }
    else if(req.query.lname == null){
        res.send('A last name must be selected');
    }
    else if(req.query.ifambassador == null){
        res.send('You must select whether or not this order_info is an ambassador');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        orderinfo_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/order_info/all');
            }
        });
    }
});

// Delete an order_info for the given order_num
router.get ('/delete', function(req, res){
    if(req.query.order_num == null) {
        res.send('order_num is null');
    }
    else {
        orderinfo_dal.delete(req.query.order_num, function(err,result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/order_info/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    orderinfo_dal.update(req.query, function (err, result) {
        res.redirect(302, '/order_info/all');
    });
});

module.exports = router;

router.get('/edit2', function(req, res){
    if(req.query.order_num == null) {
        res.send('A coupon code is required');
    }
    else {
        orderinfo_dal.getById(req.query.order_num, function(err, result){
            res.render('order_info/orderinfoUpdate', {'result': result});
        });
    }
});

module.exports = router;

