// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

	// setup an abstract state for the tabs directive
    .state('home', {
      name: 'home',
      url: "/home",
      //abstract: true,
      templateUrl: "templates/start.html"
    })

    /*.state('home.home', {
      url: '/home',
      views: {
        'home-page': {
          templateUrl: 'templates/home-home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    */  
   
   // setup an abstract state for the tabs directive
    .state('rented', {
      url: "/rented",
      abstract: true,
      templateUrl: "templates/rented.html"
    })

    
    .state('rented.rented', {
      url: '/rented',
      views: {
        'rented-page': {
          templateUrl: 'templates/home-rented.html',
          controller: 'RentedCtrl'
        }
      }
    })
    
    
    // setup an abstract state for the tabs directive
    .state('second', {
      url: "/second",
       abstract: true,
      templateUrl: "templates/rented.html"
      
    })

    // Each tab has its own nav history stack:
	
	// setup an abstract state for the tabs directive
    /*.state('country', {
      url: "/country",
      abstract: true,
      templateUrl: "templates/country.html"
    })
*/
    // Each tab has its own nav history stack:

    .state('states', {
      url: '/states',
      templateUrl: 'templates/state.html',
      controller: 'StateController'
      
    })
	
	 .state('muncipality', {
      url: '/muncipality/:Mid',
      templateUrl: 'templates/muncipality.html',
      controller: 'MuncipalityCtrl'  
    })
    
    .state('housingassociation', {
      url: '/housingassociation/:Mid',
      templateUrl: 'templates/housingassociation.html',
      controller: 'hassociationCtrl'
  
    })
	   
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      //controller: 'hassociationCtrl'
  
    }) 
	 
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });
    
    
    
    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('home');

});

