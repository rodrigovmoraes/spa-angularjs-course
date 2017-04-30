(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserProfileService'];
function MyInfoController(UserProfileService) {
  var myInfoCrtl = this;
  myInfoCrtl.myUserProfile = UserProfileService.getMyUserProfile();
  myInfoCrtl.userAlreadyRegistered = UserProfileService.isUserAlreadyRegistered()
}

})();
