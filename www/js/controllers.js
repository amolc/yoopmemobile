angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  Friends.all().success(function( allfriends ){
  		$scope.friends = allfriends;
  });
  console.log( $scope.friends );
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('HomeCtrl', function($scope) {
})

.controller('RentedCtrl', function($scope) {
})


.controller('MuncipalityCtrl', function( $scope, $stateParams ,Muncipalities) {
	
  Muncipalities.get( $stateParams.Mid ).success(function( muncipalities ){
  	$scope.muncipalities = muncipalities;  	
  });

})

.controller('hassociationCtrl', function( $scope, $stateParams , HAssociation ) {
	$scope.Mid = $stateParams.Mid;
	HAssociation.get( $stateParams.Mid ).success(function( hasscoiations ){
		$scope.hasscoiations = hasscoiations;
	});  
})

.controller('StateController', function($scope, States) {
	States.all().success(function( states ) {
    	$scope.allstates = states;
    	console.log( 'all sates controller' );
 	});

})
.controller('loginCtrl', function( $scope ){
	console.log( 'login ctrl');
});


