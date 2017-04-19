(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$q', '$http']
function MenuDataService($q, $http) {

  var service = this;

  service.getAllCategories = function () {
     return  $http({
         //make the http request to service
         method: "GET",
         url: "https://davids-restaurant.herokuapp.com/categories.json"
     });
  };

  service.getItemsForCategory = function (categoryShortName) {
     return  $http({
         //make the http request to service
         method: "GET",
         url: "https://davids-restaurant.herokuapp.com/menu_items.json",
         params: { category: categoryShortName }
     });
  };

}

})();
