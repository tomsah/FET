'use strict';

angular.module('fetApp.auth', [
  'fetApp.constants',
  'fetApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
