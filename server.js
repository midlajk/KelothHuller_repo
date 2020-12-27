 require('./models/db');

 const express = require('express');

 const bodyParser = require('body-parser');

 const path = require('path');

 const expressHandlebars = require('express-handlebars');

 const employeeController = require('./controller/employeeController');


 const app = express();
 //configuring the midleware

 app.use(bodyParser.urlencoded({
     extended: true
 }));

 app.use(bodyParser.json());

 //configuring the views

 app.set('views', path.join(__dirname, '/views/'))
 app.use(express.static('.'));
 app.engine('hbs', expressHandlebars({
     extname: 'hbs',
     defaultLayout: 'mainLayout',
     layoutsDir: __dirname + '/views/layouts/',
     runtimeOptions: {
         allowProtoPropertiesByDefault: true,
         allowProtoMethodsByDefault: true,

     },
 }))

 app.set('view engine', 'hbs'); //configured

 /*
 app.engine(
 2
   "handlebars",
 3
   exphbs({
 4
     defaultLayout: "main",
 5
     runtimeOptions: {
 6
       allowProtoPropertiesByDefault: true,
 7
       allowProtoMethodsByDefault: true,
 8
     },
 9
   })
 10
 );
 11
 app.set("view engine", "handlebars");

 */
 // configuring the route 


 app.listen(3000, () => {
     console.log("Server is listening on Port 3000");
 })

 app.use('/employee', employeeController);