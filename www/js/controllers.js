var baseUrl = 'http://node.fountaintechies.com:4000/';

angular.module('starter.controllers', [])

.controller('DashCtrl', function($rootScope,$scope, $location, $http,OpenFB) {
	OpenFB.get('/me').success(function (user) {
           console.log(user);
        });
})

.controller('LoginCtrl', function($rootScope,$scope, $location, $http,OpenFB) {

	$scope.facebookLogin = function () {

            OpenFB.login('email,read_stream,publish_stream').then(
                function () {
                    $location.path('/login');
                },
                function () {
                    alert('OpenFB login failed');
                });
        };
    
    $scope.login = function(type){
	  var user = {
       "user_media_id" : "1234567",
       "user_email" : "wasim@wasim.com",
       "user_type" : type,
       "user_name" : 'wasim',
       "user_url" : 'url',
       "user_likes" : 'likes',
       "user_description" : 'pakstan',
       "user_bio" : "asdsda",
       "user_location" : "lahore pakistan"

	  };

	    $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/newsuser", user).success(function(res) {
          
      	$rootScope.id = res.data.id;

       $location.path("/tab/profile/"+$rootScope.id);

      }).error(function(error) {
        
        console.log(error);

      });
   }; // login sope
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('UserProfileCtrl', function( $stateParams,$rootScope,$scope, $location, $http, profile) {

	var user = { };

	$rootScope.id = $stateParams.id;
  
  $http.get(baseUrl+"api/userdetail/"+$rootScope.id, user).success(function(res) {
        
      	   console.log(res);
		  $scope.profile = res.data;
		  $scope.likes = 2;

      

      }).error(function(error) {
        
        console.log(error);

      });

      $scope.showtext = function(field){
          $("#"+field).hide();
          $("#"+field+"_text").show();
         };

      $scope.updatedata = function(field){


          $("#"+field+"_text").hide();
           $("#"+field).show();

      };

  
  
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.profile = Friends.get($stateParams.friendId);
})

.controller('CreateCtrl', function($scope) {
})
.controller('AccountCtrl', function($scope) {
});
