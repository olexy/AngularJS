'use strict';

/**
 * @ngdoc function
 * @name pubChatApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the pubChatApp
 */
angular.module('pubChatApp')
  .controller('JoinCtrl', ['$scope', '$rootScope', '$location', 'PubNub', function ($scope, $rootScope, $location, PubNub) {
   $scope.data = {
     username: 'User_' +Math.floor(Math.random() * 1000)    //Generate username with User & numbers btw 0 and 1000
   };
    $scope.joinChat = function() {
      console.log('Joining...');
      var _ref, _ref1;
      $rootScope.data || ($rootScope.data = {});
      $rootScope.data.username = (_ref = $scope.data) != null ? _ref.username : void 0; //store the username in $rootScope.data.username if its not null
      $rootScope.data.city = (_ref1 = $scope.data) != null ? _ref1.city : void 0;       //store the city in $rootScope.data.city if its not null
      $rootScope.data.uuid = Math.floor(Math.random() * 1000000) + '__' + $scope.data.username;
      console.log($rootScope);

      PubNub.init({
        subscribe_key: 'sub-c-710e558c-bc72-11e6-b490-02ee2ddab7fe',
        publish_key: 'pub-c-4da6d429-b8b9-4172-b001-42d1adbc513d',
        uuid: $rootScope.data.uuid
      });
      return $location.path('/main');

    }
  }]);
