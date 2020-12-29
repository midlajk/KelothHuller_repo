const mongoose = require('mongoose');


var Schema = mongoose.Schema;


var employeeSchema = new Schema({
    date: String,
    name: String,
    sack: String,
    kooli: String,
    worker: String,
    perHead: String,
    workername: []

});
var emp = new Schema({
    names: String,
    details: [{
        date: String,
        kooli: String,
        chack: String,
        sellername: String
    }]

});
var attend = new Schema({
    name: String,
    date: []


});
var markattend = new Schema({
    date: String,
    worker: []


});
var dateAttend = new Schema({
    date: String,
    name: String,
    load: String,
    rent: String,
    chack: String






});
var UserSchema = new Schema({
    username: String,

});

var Userschema = mongoose.model('Userschema', UserSchema);
var Personal = mongoose.model('Personal', dateAttend);
var Mark = mongoose.model('Mark', markattend);
var Attendance = mongoose.model('Attendance', attend);
var Individual = mongoose.model('Individual', emp);
var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Userschema;
module.exports = Personal;
module.exports = Mark;
module.exports = Attendance;
module.exports = Individual;
module.exports = Employee;