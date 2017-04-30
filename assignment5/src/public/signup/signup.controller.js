(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserProfileService', 'MenuService'];
function SignUpController(UserProfileService, MenuService) {
  var signUpCrtl = this;
  signUpCrtl.userAlreadyRegistered = UserProfileService.isUserAlreadyRegistered();

  //process the signup action
  signUpCrtl.signup = function() {
     //get the favorite dish information and save to profile
     MenuService.getItem(signUpCrtl.user.favoriteDishNumber).then(function(item) {
        signUpCrtl.user.favoriteDish = item;

        UserProfileService.registerMyUserProfile(signUpCrtl.user);
        signUpCrtl.userAlreadyRegistered = true;
     });
  };

}

})();
