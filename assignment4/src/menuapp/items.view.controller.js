(function () {
   'use strict';

   angular.module('MenuApp')
   .controller('ItemsViewController', ItemsViewController);

   ItemsViewController.$inject = ['$stateParams', 'categoryItems']
   function ItemsViewController($stateParams, categoryItems) {
     var itemsViewCtrl = this;

     itemsViewCtrl.items = categoryItems.data.menu_items;
     itemsViewCtrl.category = categoryItems.data.category;
   }

})();
