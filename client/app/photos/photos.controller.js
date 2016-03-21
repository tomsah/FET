'use strict';
(function(){

class PhotosComponent {

  constructor($http) {
    this.$http = $http;
    this.awesomePhotos = [];
  }

  $onInit() {
    this.$http.get('/api/photos').then(response => {
      this.awesomePhotos = response.data;
      console.log(this.awesomePhotos);
    });
  }

  addPhoto() {
    if (this.newPhoto) {
      this.$http.post('/api/photos', { name: this.newPhoto });
      this.newPhoto = '';
    }
  }

  deletePhoto(photo) {
    this.$http.delete('/api/photos/' + photo._id);
  }
}

angular.module('fetApp')
  .component('photos', {
    templateUrl: 'app/photos/photos.html',
    controller: PhotosComponent,
    controllerAs: 'photos'
  });

})();
