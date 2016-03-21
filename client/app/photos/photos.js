'use strict';

angular.module('fetApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('photos', {
        url: '/photos',
        template: '<photos></photos>'
      });
  });
