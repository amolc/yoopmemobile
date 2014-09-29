angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  //$scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.profile = Friends.get($stateParams.friendId);
})

.controller('CreateCtrl', function($scope) {
})
.controller('AccountCtrl', function($scope) {
});
