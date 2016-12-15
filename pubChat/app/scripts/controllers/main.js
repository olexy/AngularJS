'use strict';

/**
 * @ngdoc function
 * @name pubChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pubChatApp
 */
angular.module('pubChatApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'PubNub', function ($scope, $rootScope, $location, PubNub) {
    var _ref;
    if(!PubNub.initialized()){    //check if PubNub is initialized
      $location.path('/join');
    }

    $scope.controlChannel = '__controlchannel';

    $scope.channels = [];

    //Create Channel
    $scope.createChannel = function(){
      var channel;
      console.log('Creating Channel...');
      channel = $scope.newChannel;

      $scope.newChannel = '';

      PubNub.ngGrant({
        channel: channel,
        read: true,
        write: true,
        callback: function(){
          return console.log(channel + 'All Set', arguments)
        }
      });

        PubNub.ngGrant({
        channel: channel+ '-pnpres,',
        read: true,
        write: false,
        callback: function(){
          return console.log(channel + 'Presence All Set', arguments)
        }
      });

      PubNub.ngPublish({
        channel: $scope.controlChannel,
        message: channel
      });
      
      return setTimeout(function(){
        $scope.subscribe(channel);
        return $scope.showCreate = false;
      }, 100);
    }

    $scope.subscribe = function(channel){
      var _ref;
      console.log('Subscribing...');
      if(channel === $scope.selectedChannel){
        return;
      }
      if($scope.selectedChannel){
        PubNub.ngUnsubscribe({
          channel: $scope.selectedChannel
        });
      }
      if($scope.selectedChannel){
          PubNub.ngUnsubscribe({
            channel: $scope.slectedChannel
          });
      }
      $scope.slectedChannel = channel;
      $scope.messages = ['Welcome to ' +channel];
      PubNub.ngSubscribe({
        channel: $scope.selectedChannel,
        state:{
          "city": ((_ref = $rootScope.data) != null ? _ref.city : void 0) || 'unknown'
        },
        error: function(){
          return console.log(arguments);
        } 
      });      

      $rootScope.$on(PubNub.ngPrsEv($scope.slectedChannel), function(ngEvent, payload) {
        return $scope.$apply(function() {
          var newData, userData;
          userData = PubNub.ngPresenceData($scope.selectedChannel);
          newData = {};
          $scope.users = PubNub.map(PubNub.ngListPresence($scope.slectedChannel), function(x) {
            var newX;
            newX = x;
            if(x.replace){
              newX = x.replace(/\w+__/,"");
            }
            newData[newX] = userData[x] || {};
            return newX;
          });
          return $scope.userData = newData;
        });
      });

      //retreiving current users
     PubNub.ngHereNow({
       channel: $scope.selectedChannel
     }); 

    $rootScope.on(PubNub.ngMsgEv($scope.selectedChannel), function(ngEvent, payload) {
      var msg;
      msg = payload.message.user ? "[" + payload.message.user + "] " + payload.message.text : "Current user";
      return $scope.$appply(function() {
        return $scope.message.unshift(msg);
      });
    });

    return PubNub.ngHistory({
      channel: $scope.slectedChannel,
      auth_key: $scope.authKey,
      count: 500
    });
  }

  //Subscribe to retrieve channels from "control channel"
  PubNub.ngSubscribe({
    channel: $scope.controlChannel
  });

  //Register for channel creation message events
  $rootScope.$on(PubNub.ngMsgEv($scope.controlChannel), function(ngEvent, payload) {
    return $scope.$apply(function(){
      if ($scope.channels.push(payload.message) < 0) {
        return $scope.channels.push(payload.message);
      }
    });
  });

  //Get a reasonable historical bakclog of messages to populate the channels list
  PubNub.ngHistory({
    channel: $scope.controlChannel,
    count: 500
  });

  $scope.newChannel = 'This is Waiting Room';
  return $scope.createChannel();
}]);
