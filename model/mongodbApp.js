/**
 * Created by lakshmi on 8/14/15.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) console.log('could not connect to mongdb ... ');
    else console.log('connected to mongodb');
});
var contactsSchemaModel = mongoose.model('contacts', {
    firstName: String,
    lastName: String,
    password: String,
    dob:Date,
    email: {
        type: String,
        unique: true,
        required: true
    }
}); // this will show up on the DB as contacts



module.exports = contactsSchemaModel;

