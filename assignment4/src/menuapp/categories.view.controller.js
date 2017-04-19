(function () {
   'use strict';

   angular.module('MenuApp')
   .controller('CategoriesViewController', CategoriesViewController);

   CategoriesViewController.$inject = ['items'];
   function CategoriesViewController(items) {
     var categoriesViewCtrl = this;
     categoriesViewCtrl.items = items.data;
   }

})();
