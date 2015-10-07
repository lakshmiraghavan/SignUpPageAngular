var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var contactsSchemaModel = require('../model/mongodbApp');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contactlist', function(req, res){
    console.log('I received a ge request');


    contactsSchemaModel.find(function(err, contacts){
       console.log(contacts);
        res.json(contacts);
                   /* if (err) {
                        res.status(500).json({ message: 'Something Broke!' });
                    } else {
                        res.status(200).json(contacts);
                    }*/

    })

    router.post('/contactlist', function(req, res){
        console.log(req.body);
        (new contactsSchemaModel(req.body)).save(function (err, contacts) {
            if(err) res.status(500).json(err);
            else res.status(201).json(contacts);
        })
    })


})
module.exports = router;
