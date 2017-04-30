(function () {
"use strict";

angular.module('common').filter('phoneNumber', PhoneNumberFilter);

function PhoneNumberFilter() {
   return function (number) {
      if (!number) {
         return '';
      }
      var strValue = number.toString();

      if(strValue.length != 10) {
         return strValue;
      }else{
         return "(" + strValue.substring(0, 3) + ") " + strValue.substring(3, 6) + "-" + strValue.substring(6);
      }
   }
}

})();
