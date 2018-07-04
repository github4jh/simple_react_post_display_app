var transactions = require('../data_access/transaction');  

module.exports = {  
    //set up route configuration that will be handle by express server  
    configure: function (app) {  
  
        // adding route for users, here app is express instance which provide use  
        // get method for handling get request from http server.   
        app.post('/api/postAd', function (req, res) {  
            transactions.postAd(req, res);
        });
        
        app.get('/api/users', function (req, res) {  
            transactions.getAllUsers(res);  
        });  
  
        // here we gets id from request and passing to it transaction method.  
        app.get('/api/transactions/:id/', function (req, res) {  
            transactions.getTransactionById(req.params.id, res);  
        });  

        app.get('/api/posts', function (req, res) {  
            transactions.getAllPosts(res);  
        });
    }  
};