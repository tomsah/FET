
var fs = require('fs');
var path = require('path');

var diretoryTreeToObj = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err){
        	return done(err);	
        }
            

        var pending = list.length;

        if (!pending){
        	return done(null, {name: path.basename(dir), type: 'folder', children: results});
        }
            

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (!--pending){
                        	done(null, results);
                        }
                            
                    });
                }
                else {
                    results.push({
                        type: 'file',
                        name: path.basename(file)
                    });
                    if (!--pending){
                    	done(null, results);
                    }
                        
                }
            });
        });
    });
};

//create a json object of the images run node tree.js
//TODO make it available to angular
var dirTree = ('pics/');
diretoryTreeToObj(dirTree, function(err, res){
    if(err){
    console.error(err);	
    }  
    console.log(JSON.stringify(res));
});


var http = require('http');

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }, null, 3));
});
app.listen(3000);








