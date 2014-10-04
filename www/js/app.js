// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','uiSlider', 'starter.services','openfb'])

.run(function($rootScope, $state, $ionicPlatform, $window, OpenFB) {
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


  OpenFB.init('102081083230772','http://node.fountaintechies.com/yoopmemobile/www/oauthcallback.html',$window.localStorage);

        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        // $rootScope.$on('$stateChangeStart', function(event, toState) {
        //     if (toState.name !== "app.login" && toState.name !== "app.logout" && !$window.sessionStorage['fbtoken']) {
        //         $state.go('app.login');
        //         event.preventDefault();
        //     }
        // });

        // $rootScope.$on('OAuthException', function() {
        //     $state.go('app.login');
        // });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    
    .state('landing', {
      url: '/',
      templateUrl: 'templates/tab-home.html',
      controller: 'DashCtrl'      
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "templates/signup.html",
      controller: 'signupCtrl'   
    })
    .state('getuser', {
      url: "/getuser",
      templateUrl: "templates/getuser.html",
      controller: 'getuserCtrl'   
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'   
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
          //controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.create', {
      url: '/create',
      views: {
        'tab-create': {
          templateUrl: 'templates/tab-create.html',
          controller: 'CreateEventCtrl'
        }
      }
    })

    .state('tab.eventpreferences', {
      url: '/eventpreferences',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-eventpreferences.html',
          controller: 'CreateEventPreferencesCtrl'
        }
      }
    })
  
    // .state('eventpreferences', {
    //   url: '/eventpreferences',
    //   templateUrl: 'templates/tab-eventpreferences.html',
    //   controller: 'CreateEventPreferencesCtrl'      
    // })
    .state('tab.profile', {
      url: '/profile/:id',
      views: {
        'tab-profile': {
          templateUrl: 'templates/user-detail.html',
          controller: 'UserProfileCtrl'
        }
      }
    })

    .state('tab.eventdetail', {
      url: '/eventdetail/:id',
      views: {
        'tab-events': {
          templateUrl: 'templates/event-detail.html',
          controller: 'EventDetailCtrl'
        }
      }
    })


    .state('tab.events', {
      url: '/events',
      views: {
        'tab-events': {
          templateUrl: 'templates/tab-events.html',
          controller: 'EventsCtrl'
        }
      }
    })
    .state('tab.eventdetails', {
      url: '/eventdetails',
      views: {
        'tab-eventdetails': {
          templateUrl: 'templates/tab-event-details.html',
          //controller: 'AccountCtrl'
        }
      }
    });
    
 // $urlRouterProvider.when('/eventpreferences', {templateUrl: 'templates/tab-eventpreferences.html'});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

}).directive('fileModel', function ($parse) {
    return function(scope, element, attrs) {

            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                    //console.log( element[0].files[0] );

                });
            });
        }
    
});



