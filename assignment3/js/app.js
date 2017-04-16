(function () {
   'use strict';

   angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .constant('APIBasePath', 'https://davids-restaurant.herokuapp.com')
      .directive('foundItems', FoundItemsDirective);

   //*****************************
   //*** NarrowItDownController
   //*****************************
   NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
   function NarrowItDownController($scope, menuSearchService) {
      var narrowIt = this;
      narrowIt.searchTerm = "";
      narrowIt.foundItems = [];
      narrowIt.message = "";

      // "Narrow It Down For Me!" clicked
      narrowIt.searchItems = function() {
         //check if the user has entered something
         if(!narrowIt.searchTerm) {
            narrowIt.message = "Nothing found";
            return;
         }

         menuSearchService.getMatchedMenuItems(narrowIt.searchTerm)
            .then(function(result) {
               //something was found
               narrowIt.foundItems = result.foundItems;
               narrowIt.message = "";
            }).catch(function (result) {
               //nothing was found
               narrowIt.foundItems = [];
               narrowIt.message = result.message;
            });
      };

      // "Don't want this one!" clicked
      narrowIt.removeItem = function(index) {
         narrowIt.foundItems.splice(index, 1);
      };

   }


   //*****************************
   //*** MenuSearchService
   //*****************************
   MenuSearchService.$inject = ['APIBasePath', '$http', '$q', '$timeout'];
   function MenuSearchService(APIBasePath, $http, $q, $timeout) {
      var service = this;

      service.getMatchedMenuItems = function getMatchedMenuItems(searchTerm) {
         var deferred = $q.defer(); //async method

         $http({
           //make the http request to service
           method: "GET",
           url: (APIBasePath + "/menu_items.json")
         }).then( function(response) {
            //HTTP request was completed

            var found = false; //mark as 'nothing was found'

            var result = {
              foundItems: [], //retains the desired items
              message: "" //message, if something will be wrong
            };

            //response.data is the JSON object returned by http request
            response.data.menu_items.forEach( function(item){
               //check if the description contains the search term
               if(item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
                  result.foundItems.push(item);
                  found = true; //mark as 'something was found'
               }

            });

            //if nothing is found, reject and set the message
            if(found) {
               deferred.resolve(result);
            }else {
               result.message = "Nothing found";
               deferred.reject(result);
            }

         });

         return deferred.promise; //async method
      }

   }

   //*****************************
   //*** FoundItemsDirective
   //*****************************
   function FoundItemsDirective() {
     var ddo = {
       restrict: 'E',
       templateUrl: 'foundItems.html',
       scope: {
         items: '<foundItems',
         message: '@',
         removeItem: '&onRemove'
       },
       controller: function FoundItemsDirectiveController() {},
       controllerAs: 'foundItems',
       bindToController: true
     };

     return ddo;
   }


})();
