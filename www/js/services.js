angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function( $http ) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = {};
  /*var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];
*/
  return {
    all: function() {
      return $http.get(baseURL + 'state');
      
      
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

/**
 * A simple example service that returns some data.
 */

.factory('States', function( $http ) {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return $http.get(baseURL + 'state');
    }
  }
})
.factory('Muncipalities', function( $http ) {
  // Might use a resource here that returns a JSON array
  return {
      get : function(stateid){
          return $http.get(baseURL + 'municipality/'+ stateid );    
      }
    }
    
})
.factory('HAssociation', function( $http ) {
  // Might use a resource here that returns a JSON array
  return {
      get : function(m_id){
          return $http.get(baseURL + 'housingAssociation/'+ m_id );    
      }
    }
    
});


