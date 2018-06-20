const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

const db = 'mongodb://rita:rita24@ds151530.mlab.com:51530/userdirectory';

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if (err) {
        console.log("Error! " + err);
    }
});

router.get('/users', function(req, res) {
    console.log('Get requests for all users');
    User.find({})
        .exec(function(err, users) {
            if (err) {
                console.log("Error retrieving users");
            } else {
                res.json(users);
            }
        });
});

router.get('/users/:id', function(req, res) {
    console.log('Get requests for a user');
    User.findById(req.params.id)
        .exec(function(err, user) {
            if (err) {
                console.log("Error retrieving user");
            } else {
                res.json(user);
            }
        });
});

router.post('/user', function(req, res) {
    console.log('Post a user');
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.address = req.body.address;
    newUser.contact = req.body.contact;
    newUser.email = req.body.email;
    newUser.save(function(err, insertedUser) {
        if (err) {
            console.log('Error saving user');
        } else {
            res.json(insertedUser);
        }
    });
});

router.put('/user', function(req, res) {
    console.log('Update user');
    console.log(req.body);
    User.findByIdAndUpdate(req.body.id, {
            $set: { username: req.body.username, address: req.body.address, contact: req.body.contact, email: req.body.email }
        }, {
            new: true
        },
        function(err, updatedUser) {
            if (err) {
                res.send("Error updating User");
            } else {
                res.json(updatedUser);
            }
        });
});

router.delete('/user/:id', function(req, res) {
    console.log('Deleting a user');
    User.findByIdAndRemove(req.params.id, function(err, deleteduser) {
        if (err) {
            res.send("Error Deleting user");
        } else {
            res.send(deleteduser);
        }
    })
})
module.exports = router;