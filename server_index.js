const express = require('express');  
const bodyparser = require('body-parser');  
const fileUpload = require('express-fileupload');  
const routes = require('./routes/route');  
const path = require('path');
const cors = require('cors');  
// creating server instance  
const app = express();  
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

// for posting nested object if we have set extended true  
app.use(bodyparser.urlencoded({ extended : true}));  
  
// parsing JSON  
app.use(bodyparser.json());  

app.use(fileUpload());

//app.use('/public', express.static(__dirname + '/public'));

//set application route with server instance  
routes.configure(app);  
  
// listening application on port 3006  
var server = app.listen(3006, function(){  
    console.log('Server Listening on port ' + server.address().port);  
});
