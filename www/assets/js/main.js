// console.log(window.angular);

app = angular.module('app', ['uiSlider']);



app.controller('PositionCtrl', ['$scope', function($scope){
  $scope.position = {
    name: 'Potato Master',
    minAge: 25,
    maxAge: 40
  };
}]);