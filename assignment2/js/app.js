(function () {
   'use strict';

   angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

   //*****************************
   //*** ToBuyController
   //*****************************
   ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
   function ToBuyController($scope, slcoService) {
      var buyCtrl = this;

      //the list of "to-buy" items
      buyCtrl.toBuyList = slcoService.getToBuyList();

      //mark the item as already bought
      buyCtrl.markItemAsBought = function(itemIndex) {
         //delegate to ShoppingListCheckOffService
         slcoService.markItemAsBought(itemIndex);
      }
   }

   //*****************************
   //*** AlreadyBoughtController
   //*****************************
   AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
   function AlreadyBoughtController($scope, slcoService) {

      var boughtCtrl = this;
      //the list of bought items
      boughtCtrl.boughtList = slcoService.getBoughtList();
   }

   //*****************************
   //*** ShoppingListCheckOffService
   //*****************************
   function ShoppingListCheckOffService() {
      var service = this;
      //initial to-buy list
      var toBuyList = [ { name: "cookies A", quantity: 101 },
                        { name: "cookies B", quantity: 102 },
                        { name: "cookies C", quantity: 103 }
                      ];

      var boughtList = [];

      service.getToBuyList = function() {
         return toBuyList;
      };

      service.getBoughtList = function() {
         return boughtList;
      };

      //mark an item as bought,
      //move the item from to-buy list to bought list
      service.markItemAsBought = function(itemIndex) {
         //check if itemIndex is in array's bounds
         if(itemIndex >= 0 && itemIndex < toBuyList.length) {
            var item = toBuyList.splice(itemIndex, 1); //splice removes items from
                                                       //the array and
                                                       //returns the removed items
            boughtList.push(item[0]);
         }
      };

   }

})();
