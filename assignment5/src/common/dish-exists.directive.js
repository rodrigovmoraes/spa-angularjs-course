(function() {
"use strict";

var app = angular.module('common')
.directive('dishExists', DishExistsDirective);

DishExistsDirective.$inject = ['MenuService']
function DishExistsDirective(MenuService) {
   return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attr, ctrl) {

          //function responsible to check the value
          function checkIfTheDishExists(dishNumber) {
            MenuService.getItem(dishNumber).then(function(data) {
               ctrl.$setValidity('dishExists', true);
            }).catch(function(data) {
               ctrl.$setValidity('dishExists', false);
            });
            return dishNumber;
          }

          //put the checker function in the list of functions wich
          //will be executed every time the input value changes
          ctrl.$parsers.push(checkIfTheDishExists);
        }
   };
}


})();
