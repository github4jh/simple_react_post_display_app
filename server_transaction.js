const path = require('path');  
var connection = require('../connection/MySQLConnect');  
var fs = require('fs');

function Transaction() {  
    this.postAd = function (req, res) {
        var type  = req.body.type;
        var weight = req.body.weight + " pounds";
        var price = req.body.price + " per pound";
        var description = req.body.description;

        let imageFile = req.files.file;
        let filename = req.body.filename;
        const now = new Date();
        let year = now.getFullYear().toString();
        let month = now.getMonth().toString();
        let date = now.getDate().toString();
        let hour = now.getHours().toString();
        let minutes = now.getMinutes().toString();
        let seconds = now.getSeconds().toString();
        let milliseconds = now.getMilliseconds().toString();
        let date_time = year + month + date + hour + minutes + seconds + milliseconds;
        let directory = "C:\\Projects\\Reactjs\\onetrade_client\\public\\" + req.body.email + date_time;

        try {
            fs.mkdirSync(directory);
            console.log("directory created!");
        }
        catch (err) {
            if(err.code == 'EEXIST') {
                console.log("directory existed!");
            } else {
                console.log(err);
            }
        }

        var absolutePath = directory + "\\" + filename;
        var params = [type, weight, price, description, now, req.body.email + date_time + "/" + filename];
        console.log('dirPath: ' + absolutePath);

        console.log('type: ' + type);
        console.log('weight: ' + weight);
        console.log('price: ' + price);
        console.log('description: ' + description);
        console.log('now: ' + now.toString());
        console.log('image path: ' + req.body.email + date_time + "/" + filename);

        imageFile.mv(  absolutePath , function(err) {
            if(err) {
              console.log('File upload error occurred while copying file to directory');
            }
        });
        
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('INSERT INTO salePosts (type, weight, price, description, post_date, image) VALUES (?, ?, ?, ?, ?, ?)', params, function (err, result) {  
                con.release();
                res.end(JSON.stringify(result));
            });  
        });

        console.log('imageFile is available'); // should appear in console   
        console.log('you posted to /api/postAd'); // should appear in console
        console.log(req.body); // should return the values of {title:  content:  image:} 
        console.log(typeof req.body); //"object"
        console.log(req.method); // "POST"
        res.json({greeting: "hello"}); //should send to the browser
    };   

    // get all users data   
    this.getAllUsers = function (res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT DISTINCT * FROM users', function (err, result) {  
                con.release();  
                                
                res.json(result);
            });  
        });  
    };  

    this.getAllPosts = function (res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT * FROM salePosts', function (err, result) {  
                con.release();  
                
                console.log("result: " + result);

                res.json(result);  
            });  
        });  
    };    

    this.getTransactionById = function (id, res) {  
        // initialize database connection  
        connection.init();  
        // get id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'SELECT date_format(t.TransactionDate,\'%d-%b-%Y\') as date, ' +  
                'CASE WHEN t.amount >= 0 THEN t.amount ' +  
                'ELSE 0 END AS Credit, CASE WHEN t.amount < 0 THEN ' +  
                't.amount ELSE 0 END AS Debit, t.balance FROM ' +  
                'transactions t INNER JOIN users u ON t.userId=u.id WHERE t.userId = ?;';  
            con.query(query, id, function (err, result) {  
                    con.release();  
                    //res.send(result);
                    res.json(result);  
                });  
        });
    };
}

module.exports = new Transaction();