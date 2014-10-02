angular.controller('signupCtrl', function( $scope, $http  ) {
    $scope.userdetails ={
      'first_name' : '',
      'last_name' : '',
      'email' : '',
      'password' : ''
    }
    $scope.signupform = function( userdetails ){
      $http.post(baseUrl+"api/newsuser", userdetails).success(function(res) {
        $rootScope.id = res.data.id;
        $location.path("/tab/profile/"+$rootScope.id);
      }).error(function(error) {
          console.log(error);
      });
        
      };
});
