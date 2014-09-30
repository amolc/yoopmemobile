//var baseUrl = 'http://node.fountaintechies.com:4000/';

//var baseUrl = 'http://localhost:4000/';
 if (document.location.hostname == "localhost"){
 var base = window.location.origin;
 var baseUrl = base +":4000/";

} else {
  var baseUrl = "http://node.fountaintechies.com:4000/"; 
}

angular.module('starter.controllers', [])

.controller('DashCtrl', function($rootScope,$scope, $location, $http,OpenFB) {
	// OpenFB.get('/me').success(function (user) {
 //           console.log(user);
 //        });
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


    // $scope.getlogin = function(){
    //   OpenFB.get('/me').success(function (user) {
    //        console.log(user);
    //     });
    // };
    
    $scope.login = function(type){
	  var user = {
       "user_media_id" : "1234567",
       "user_email" : "wasim@wasim.com",
       "user_type" : type,
       "user_name" : 'wasim',
       "user_url" : 'url',
       "user_age" : '2',
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
  //$scope.friends = Friends.all();
})

.controller('UserProfileCtrl', function( $stateParams,$rootScope,$scope, $location, $http, profile) {



	var user = { };

	$rootScope.id = $stateParams.id;
  
  $http.get(baseUrl+"api/userdetail/"+$rootScope.id, user).success(function(res) {
        
      	   console.log(res);
      if(res.data.user_url == '')
      {
        res.data.user_url = './profile-pics/upload.png';
      }
		  $scope.profile = res.data;
      
		  $scope.likes = 2;

      

      }).error(function(error) {
        
        console.log(error);

      });

      $scope.showtext = function(field){
          $("#"+field).hide();
          $("#"+field+"_text").show();
          $("#"+field+"_text").focus();
         };

      $scope.updatedata = function(field){


          $("#"+field+"_text").hide();
          $("#"+field).show();
          
          $scope.updateuser($rootScope.id,$scope.profile)

      };


      $scope.showtextsocial = function(field){
        
          $(".btnssocial").hide();
          $(".textfieldssocial").show();
          
          $(".edittext").hide();
          $("#"+field).show();
          $("#"+field).focus();

         };

      $scope.updatesocial = function(field){
          
          $("#"+field).hide();
          $(".textfieldssocial").hide();
          
          $(".btnssocial").show();

          $scope.updateuser($rootScope.id,$scope.profile);


      };

       $scope.showtextstylelocation = function(field){
        
          $(".showlocbio").hide();
          $("."+field).show();

         };

      $scope.updatestylelocation = function(field){
          
          $(".showlocbio").show();
          
          $("."+field).hide();

          $scope.updateuser($rootScope.id,$scope.profile);


      };


   $scope.updateuser = function(id,value){
    var user = {
       "user_id" : id,
       "fieldvaue" : value

    };

      $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/updateprofile", user).success(function(res) {
       

      }).error(function(error) {
       
      });
   }; // update sope

   $scope.uploadupdatelogo = function(element){
      var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("assologo").files[0]);

        oFReader.onload = function (oFREvent) {

            
            var file = element.files[0];
             $("#friend-list").append('<div  class="col"><a><img id="'+file.name+'" ng-src="" alt="" /></a></div>');

          document.getElementById(file.name).src = oFREvent.target.result;
           // var file = $scope.myFile;
            //console.log(file);
        if( file ){
          var fd = new FormData();
          fd.append('file', file );
              
              $http.post( baseUrl + 'api/imageuplaod/', fd, { transformRequest: angular.identity,
                  headers: {'Content-Type': undefined } } ).success(function(res) {
            
            console.log(res);

            var user = {
               "user_id" : $rootScope.id,
               "image" : res

            };

              $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
              $http.post(baseUrl+"api/newimage", user).success(function(res) {
                }).error(function(error) {
                 
                });
            
          }).error(function() {
            alert("Upload Failed.");
          });
        }
         else{
          alert('no file found');
         }
        };
      
    }
   


   $scope.uploadprofilepic = function(element){
      var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("profileupload").files[0]);

        oFReader.onload = function (oFREvent) {

            
            var file = element.files[0];
          
          
          document.getElementById("imgprofile").src = oFREvent.target.result;
           // var file = $scope.myFile;
            //console.log(file);
        if( file ){
          var fd = new FormData();
          fd.append('file', file );
              
              $http.post( baseUrl + 'api/imageuplaod/', fd, { transformRequest: angular.identity,
                  headers: {'Content-Type': undefined } } ).success(function(res) {
            
            console.log(res);

            var user = {
               "user_id" : $rootScope.id,
               "image" : res

            };

              $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
              $http.post(baseUrl+"api/profileimage", user).success(function(res) {
                }).error(function(error) {
                 
                });
            
          }).error(function() {
            alert("Upload Failed.");
          });
        }
         else{
          alert('no file found');
         }
        };
      
    }
  
  
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.profile = Friends.get($stateParams.friendId);
})

.controller('CreateEventCtrl', function($stateParams,$rootScope,$scope, $location, $http) {
  //$scope.event = '';
  $scope.newevent = function(event){

    if(!event)
    {
      alert('Please fill the form first');
      return;
    }
    //console.log(event);
    event.user_id = 1;
    event.event_no_of_people = $("#gender").val();
    event.event_invite = $("#invitepeoplevalue").val();
    event.event_place = $("#event_place").val();
    event.event_age = '';
    event.event_meet = 'men';
    event.event_friends = '0';
    event.event_personal = '0';

    var data = event;

      $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/newevent", data).success(function(res) {
          
        $rootScope.id = res.data.id;

        $location.path("/tab/account");

      }).error(function(error) {
        
        console.log(error);

      });
   }; // event sope
})
.controller('EventsCtrl', function($stateParams,$rootScope,$scope, $location, $http) {
      $scope.events = '';
      var data = {
        "user_id" : 1
      };

      $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/allevents", data).success(function(res) {
          
        //console.log(res);
        $scope.events = res;

      }).error(function(error) {
        
        console.log(error);

      });

})
.controller('CreateCtrl', function($scope) {
});

