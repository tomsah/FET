'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.picture = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('api/things/reportDalek').then(response => {
      this.awesomeThings = response.data.tests[0].actions;
      this.socket.syncUpdates('thing', this.awesomeThings);
      console.log(this.awesomeThings);
    });
    //console.log(this.picture);
    // this.$http.get('../../../report/dalek.json').then(response => {  
    //   this.picture = response.data.tests.actions;
    //   this.socket.syncUpdates('picture', this.picture);
    //   console.log(this.picture);
    // }); 

  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }

  runDalek() {
    console.log('Dalek should run', this.newThing);
    this.$http.post('/api/things/runDalek', {url: this.newThing});
    //trying to grab the url from input
    //this.$http.post('/api/things/runDalek', { name: this.newThing });
  }


  readPic() {
      this.$http.get('../../../report/dalek.json').then(response => {
      this.picture = response.data;
      this.socket.syncUpdates('picture', this.picture);
      console.log(this.picture);
      }); 
    }

}

angular.module('fetApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });



})();
