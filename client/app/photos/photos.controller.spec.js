'use strict';

describe('Component: PhotosComponent', function () {

  // load the controller's module
  beforeEach(module('fetApp'));

  var PhotosComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PhotosComponent = $componentController('PhotosComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
