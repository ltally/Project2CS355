var express = require('express');
var router = express.Router();
var shipping_dal = require('../model/shipping_dal');
var orderinfo_dal = require('../model/orderinfo_dal');


// View All orders
router.get('/all', function(req, res) {
    shipping_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('shipping/shippingViewAll', { 'result':result });
        }
    });

});

// View the order_info for the given id
router.get('/', function(req, res){
    if(req.query.tracking_num == null) {
        res.send('tracking_num is null');
    }
    else {
        shipping_dal.getById(req.query.tracking_num, function(err, shipping, billing_address, shipping_address) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('shipping/shippingViewById', {shipping: shipping, billing_address: billing_address, shipping_address: shipping_address});
            }
        });
    }
});

// Return the add a new shipping form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    shipping_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('shipping/shippingAdd', {'shipping': result});
        }
    });
});

// insert an shipping record
router.get('/insert', function(req, res){
    //simple validation
    if(req.query.ship_date == null) {
        res.send('Date must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        shipping_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/shipping/all');
            }
        });
    }
});

// Delete an order_info for the given tracking_num
router.get ('/delete', function(req, res){
    if(req.query.tracking_num == null) {
        res.send('tracking_num is null');
    }
    else {
        shipping_dal.delete(req.query.tracking_num, function(err,result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/shipping/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    shipping_dal.update(req.query, function (err, result) {
        res.redirect(302, '/shipping/all');
    });
});

module.exports = router;

router.get('/edit2', function(req, res){
    if(req.query.tracking_num == null) {
        res.send('A tracking number is required');
    }
    else {
        shipping_dal.getById(req.query.tracking_num, function(err, result){
            res.render('shipping/shippingUpdate', {'result': result});
        });
    }
});

module.exports = router;

