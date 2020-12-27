const mongoose = require("mongoose");

// Connect to the db
const url = "mongodb+srv://midal_123:121321988754@cluster0.ovmw5.mongodb.net/keloth?retryWrites=true&w=majority";




//Connect methode of mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Connect methode of mongoose

//include employee model

require('./employees_model');