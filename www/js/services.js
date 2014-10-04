angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Kate Winslet',
     description : 'Beautiful and witty. I love people who can make me smile.',
      likes : 32,
      url : './profile-pics/kate.jpg' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})


.factory('profile', function($http) {
  // Might use a resource here that returns a JSON array

  return {
    get: function(id) {
      // Simple index lookup
      return $http.get(baseUrl + 'api/userdetail/'+ id );    
    }
  }
});
