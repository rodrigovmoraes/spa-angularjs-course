(function () {
"use strict";

angular.module('common')
.service('UserProfileService', UserProfileService);

UserProfileService.$inject = [];
function UserProfileService() {
  var service = this;
  var _myUserProfile = {};
  var _userAlreadyRegistered = false;

  service.getMyUserProfile = function () {
     return _myUserProfile;
  };

  service.registerMyUserProfile = function (myUserProfile) {
    _myUserProfile = myUserProfile;
    _userAlreadyRegistered = true;
  };

  service.isUserAlreadyRegistered = function() {
     return _userAlreadyRegistered
  };
}

})();
