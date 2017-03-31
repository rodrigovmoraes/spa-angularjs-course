(function () {
   'use strict';

   angular.module('LunchCheckerApp', [])
      .controller('LunchCheckerController', LunchCheckerController);

   LunchCheckerController.$inject = ['$scope'];
   function LunchCheckerController($scope) {
      $scope.dishes = "";
      $scope.message = "";

      //check how many items are in the list and shows the
      //appropriate message
      $scope.checkList = function () {
         if($scope.dishes.trim() == "") {

               $scope.message = "Please enter data first";
               setRedStyle($scope);

         }else {

            if(countDishes($scope.dishes) <= 3) {
               $scope.message = "Enjoy!";
            }else {
               $scope.message = "Too much!";
            }
            setGreenStyle($scope);
         }
      }

      function setGreenStyle($scope) {
         $scope.redStyle = !($scope.greenStyle = true);
      }

      function setRedStyle($scope) {
         $scope.greenStyle = !($scope.redStyle = true);
      }

      //count how many items are in the list
      //list: a string with the items separated by comma
      //empty item, i.e., `, ,` is not counted.
      //For example, for the string `item 1, item2,,item3`
      //it will return 3
      function countDishes(list){
         var items = list.split(',');
         var count = 0;
         items.forEach(function(item){
            if(item.trim() != "") {
               count++;
            }
         });
         return count;
      }
   }

})();
