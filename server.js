 require('./models/db');

 const express = require('express');

 const bodyParser = require('body-parser');


 const path = require('path');


 const expressHandlebars = require('express-handlebars');

 const employeeController = require('./controller/employeeController');
 const simple = require('./controller/simple');
 const auth = require('./controller/auth');

 const session = require('express-session');
 const MongoDBStore = require('connect-mongodb-session')(session);
 const app = express();
 //configuring the midleware
 const MONGODB_URI = "mongodb+srv://midal_123:121321988754@cluster0.ovmw5.mongodb.net/keloth?retryWrites=true&w=majority";

 const store = new MongoDBStore({
     uri: MONGODB_URI,
     collection: 'sessions'
 });
 app.use(bodyParser.urlencoded({
     extended: true
 }));

 app.use(bodyParser.json());
 app.use(
     session({
         secret: 'my secret',
         resave: false,
         saveUninitialized: false,
         store: store
     })
 );

 //configuring the views
 const PORT = process.env.PORT || 3000;

 app.set('views', path.join(__dirname, '/views/'));
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

 app.listen(PORT, () => {
         console.log(`Server is listening on Port ${PORT}`);




     })
     /*
      app.use((req, res, next) => {
          if (!req.session.user) {
              return next();
          }
          UserSchema.findById(req.session.user._id)
              .then(user => {
                  req.user = user;
                  next();
              })
              .catch(err => console.log(err));
      });
     */
 app.get('/', (req, res) => {
     res.render('employee/index', { layout: 'indexMain.hbs', })

 })


 app.use('/employee', employeeController);
 app.use(simple);
 app.use(auth);