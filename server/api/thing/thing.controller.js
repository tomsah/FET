/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 * PUT     /api/things/:id          ->  update
 * DELETE  /api/things/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Thing from './thing.model';
var fs = require('fs')
var readFile = require('fs-readfile-promise')


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


// run dalek test
export function runDalek(req, res){
  //console.log('Req Body', req.body);
  var url = req.body.url;
  // pickup parameter from Angular / HTTP request
  const spawn = require('child_process').spawn;
  // pass it to dalek/screenshot in -u parameter
  const ls = spawn('dalek', ['dalek/screenshot.js', '-r console,json', '-a=' + url]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
    //console.log("RUN dalekxxxxx", Thing);
}

var file2watch = __dirname + '/../../../report/dalek.json'; // which file to watch
// Read report/dalekjs and return it on http://localhost:9000/api/things/reportDalek
export function reportDalek(req, res) {
  //return res.send('YO MAMA!');
  return readFile(file2watch)
    .then(function(buffer) {
      res.write(buffer.toString());
      res.end();
    })
    .catch(err => console.log(err.message))


  //  fs.readFile( file2watch, 'utf8', function (err,data) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(data);
  //     //res.JSON.parse(data);  
  //     //var body = JSON.parse(data);
  //     //res.send(JSON.parse(data));
  //     res.write(data);
  //     res.end();
  //     //x = data.toString();
  //     //res.json(data);

  // });

}

  function iSeeYou(curr, prev){
    if(curr.size != prev.size){ // if there's been a change to the file (size change)
    fs.readFile(file2watch,'utf8', reportDalek) // read the file contents, call readDalekReport
    }
  }
fs.watchFile(file2watch, iSeeYou); // add a watcher to a file



// Gets a list of Things
export function index(req, res) {
  return Thing.find().sort({_id:-1}).limit(20).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thing from the DB
export function show(req, res) {
  return Thing.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thing in the DB
export function create(req, res) {
  return Thing.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Thing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Thing.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Thing from the DB
export function destroy(req, res) {
  return Thing.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}











