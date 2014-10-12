if (document.location.hostname == "localhost"){
 var base = window.location.origin;
 var baseUrl = 'http://localhost:4000/';
} else {
  var baseUrl = "http://node.fountaintechies.com:4000/"; 
}
 var baseUrl = "http://node.fountaintechies.com:4000/"; 
 
angular.module('starter.controllers', [])

.controller('DashCtrl', function($stateParams,$rootScope,$scope, $location, $http,OpenFB) {
  
	
  var user = { };
  $scope.setting = '';
  $scope.setting.user_agegroup = '';
  $rootScope.id =$rootScope.id;
  
  $http.get(baseUrl+"api/userdetail/"+$rootScope.id, user).success(function(res) {
        
           
       $scope.setting = res.data;
      
       var str = $scope.setting.user_agegroup;
       var res = str.split("_");
       $scope.position = {
          name: 'age group',
          minAge: res[0],
          maxAge: res[1]
        };

        $scope.distance = {
          cost: $scope.setting.user_distance
        };

        setInterval(function(){
            $scope.updatesettngs();
          }, 10000);

        showGenderpref(1);
      

      }).error(function(error) {
        
        console.log(error);

      });


 $scope.updatesettngs = function()
   {
      
          var one = $("#first_scale").val();
          var two = $("#second_scale").val();
        if(one){
          var user = {
             "user_id" : $rootScope.id,
             "user_agegroup" : one+"_"+two,
             "user_meet" : $("#gendervalue").val(),
             "user_distance" : $scope.distance.cost
          };

          var data = user;
          console.log(data);
         
            $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
            $http.post(baseUrl+"api/updatesettings", data).success(function(res) {
              
              console.log(res);

            }).error(function(error) {
              
              console.log(error);

            });
          }
     };
   
    $scope.position = {
          name: 'age group',
          minAge: 20,
          maxAge: 40
        };

        $scope.distance = {
          cost: 30
        };


  $scope.currencyFormatting = function(value) { return value.toString(); };
})

.controller('LoginCtrl', function($rootScope,$scope, $location, $http,OpenFB) {
 $rootScope.profileimage = '';
	$scope.facebookLogin = function () {

            OpenFB.login('email,read_stream,publish_actions').then(
                function () {
                    $scope.getfblogin();
                },
                function () {
                    alert('OpenFB login failed');
                });
        };


    $scope.getfblogin = function(){
    
      OpenFB.get('/me').success(function (user) {
      	
           $scope.fblogin(user);

 $rootScope.profileimage = "https://graph.facebook.com/"+user.id+"/picture?width=300&height=300";
          // $rootScope.profileimage = "https://graph.facebook.com/10205337293770681/picture";
        });
    };


    $scope.fblogin = function(user){
      
      alert("success") ;
   	  
      $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/newfbuser", user).success(function(res) {
          	$rootScope.id = res.data.id;
          	 alert($rootScope.id) ;
	        $location.path("/tab/profile/"+$rootScope.id);
      }).error(function(error) {
      	     alert(error);
        	 console.log(error);
      });
   }; // fb login sope
    
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


.controller('UserProfileCtrl', function( $stateParams,$rootScope,$scope, $location, $http, profile) {
//$rootScope.profileimage = "https://graph.facebook.com/10205337293770681/picture?width=300&height=300";
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
    event.user_id = $rootScope.id;
    event.event_no_of_people = $("#gender").val();
    event.event_invite = $("#invitepeoplevalue").val();
    event.event_place = $("#event_place").val();
    event.event_age = '25_24';
    event.event_meet = 'men';
    event.event_friends = 'yes';
    event.event_personal = 'yes';

    var data = event;

      $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/newevent", data).success(function(res) {
          
        $rootScope.event_id = res.data.id;

        $location.path("/tab/eventpreferences");

      }).error(function(error) {
        
        console.log(error);

      });
   }; // event sope
})
.controller('EventsCtrl', function($stateParams,$rootScope,$scope, $location, $http) {
//$rootScope.id=1;
      $scope.showprofile = function(userid)
      {
          $location.path("/tab/profiledata/"+userid);
         
      };

      $scope.joinevent = function(eventid)
      {
          //eventjoin
          var data = {
                      "user_id" : $rootScope.id,
                      "event_id" : eventid
                     };

                  $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
                  $http.post(baseUrl+"api/eventjoin", data).success(function(res) {
                    
                    alert(res.message);

                  }).error(function(error) {
                    
                    alert(error);

                  });
      };

      $scope.eventdata = function(val){

        console.log(val);
        //alert(val);
       
        if(val == 'nearby'){
                  $("#myevents").hide();
                  $("#nearevents").show();
                  
                  $(".two").removeClass('active');
                  $(".one").addClass('active');
                  
            }else{
                  $("#nearevents").hide();
                  $("#myevents").show();
                  $(".one").removeClass('active');
                  $(".two").addClass('active');
                  
                   var data = {
                      "user_id" : $rootScope.id
                    };

                    //alert('send request');

                  $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
                  $http.post(baseUrl+"api/myevents", data).success(function(res) {
                    
                    $scope.myevents = res;

                    console.log(res);
                    //alert(res.length);

                  }).error(function(error) {
                    
                    console.log(error);

                  });
            }
      };

      $scope.events = '';
      $scope.myevents = '';
      var data = {
        "user_id" : 1
      };


      $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/allevents", data).success(function(res) {
        
        $scope.events = res;

        $("#myevents").hide();

      }).error(function(error) {
        
        console.log(error);

      });
      
     

      

})
.controller('CreateEventPreferencesCtrl', function($stateParams,$rootScope,$scope, $location, $http) {

  
   $scope.position = {
    name: 'age group',
    minAge: 25,
    maxAge: 40
  };

  $scope.wasim = '';
  $scope.change = function()
   {
      
          var one = $("#first_scale").val();
          var two = $("#second_scale").val();
        if(one){
          var event = {
             "event_id" : $rootScope.event_id,
             "event_age" : one+"_"+two,
             "event_meet" : $("#gendervalue").val(),
             "event_friends" : $("#invitefriendvalue").val(),
             "event_personal" : $("#personalinvitevalue").val()
          };

          var data = event;
         
            $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
            $http.post(baseUrl+"api/updateevent", data).success(function(res) {
              
              console.log(res);

            }).error(function(error) {
              
              console.log(error);

            });
        }
     };

   setInterval(function(){
      $scope.change();
    }, 10000);

})

.controller('UserDataProfileCtrl', function($stateParams,$rootScope,$scope, $location, $http,OpenFB) {
  
  var user = { };

  $http.get(baseUrl+"api/userdetail/"+$stateParams.id, user).success(function(res) {
        
          
      $scope.profiledataimage = "https://graph.facebook.com/"+res.data.user_media_id+"/picture?width=300&height=300";
      $scope.profile = res.data;
      
      $scope.likes = 2;

      }).error(function(error) {
        
        console.log(error);

      });

}) 

.controller('UserEventProfileCtrl', function($stateParams,$rootScope,$scope, $location, $http,OpenFB) {
  
  var user = { };

  $http.get(baseUrl+"api/userdetail/"+$stateParams.id, user).success(function(res) {
        
          
      $scope.profiledataimage = "https://graph.facebook.com/"+res.data.user_media_id+"/picture?width=300&height=300";
      $scope.profile = res.data;
      
      $scope.likes = 2;

      }).error(function(error) {
        
        console.log(error);

      });

})

.controller('EventDetailCtrl', function($stateParams,$rootScope,$scope, $location, $http,OpenFB) {
  
      $scope.eventpeople = '';
      var data = {
        "event_id" : $stateParams.id
      };

      var user = { };

      $http.get(baseUrl+"api/eventdetail/"+$stateParams.id, user).success(function(res) {
      
      $scope.event = res.data;
      

      }).error(function(error) {
        
        console.log(error);

      });


      $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
      $http.post(baseUrl+"api/eventpeople", data).success(function(res) {
        
        $scope.eventpeople = res;
        console.log(res);

      }).error(function(error) {
        
        console.log(error);

      });

      $scope.selectunselect = function(uid,status,select_status)
      {
        var data = {
          "event_id" : $stateParams.id,
          "user_id" : uid,
          "status_val":status,
          "select_status":select_status
        };

        $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
        $http.post(baseUrl+"api/selectunselect", data).success(function(res) {
          
          alert(res.massage);
          console.log(res);
          select_status = parseInt(select_status);

          var searchVal = uid;
          var searchField = "user_id";
          var obj = $scope.eventpeople;
          for (var i=0 ; i < obj.length ; i++)
          {
              if(obj[i][searchField] == searchVal)
                {
                  
                  $scope.eventpeople[i].select_status = select_status;
                  break;
                }
          }
          console.log($scope.eventpeople);
          // if(select_status == 0)
          // {
          //   $("."+uid+"unsel").hide();
          //   $("."+uid+"sel").show();
          // }
          //  else
          //      {
          //       $("."+uid+"sel").hide();
          //       $("."+uid+"unsel").show();
          //      }

        }).error(function(error) {
          
          console.log(error);

        });
      };

      $scope.showprofile = function(userid)
      {
          $location.path("/tab/profileevent/"+userid);
         
      };

      $scope.sendmessage = function(){
          alert('Message Sent');
      };

});