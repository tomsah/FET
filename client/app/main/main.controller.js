'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });
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
    console.log('Dalek should run');
    this.$http.get('/api/things/runDalek');
    this.$http.post('/api/things/runDalek', { name: this.newThing });
  }


  readPic() {
      this.$http.get('../../../report/dalek.json').then(response => {
      this.picture = response.data;
      this.socket.syncUpdates('picture', this.picture);
      console.log(this.picture, 'hello');
      });

    // this.$http.get('../../../report/dalek.json').success(function(data) {
    //   this.$scope.tests = data;
    //     console.log(data);
    // });
    }

}

angular.module('fetApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
