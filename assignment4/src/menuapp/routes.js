(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.view.template.html'
  })

  // Categories list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.view.template.html',
    controller: 'CategoriesViewController as categoriesViewCtrl',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
                                    return MenuDataService.getAllCategories();
                                 }
             ]
    }
  })

  // items
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/items.view.template.html',
    controller: 'ItemsViewController as itemsViewCtrl',
    resolve: {
      categoryItems: [ '$stateParams',
                       'MenuDataService',
                        function($stateParams, MenuDataService) {
                           return MenuDataService
                                    .getItemsForCategory($stateParams.categoryShortName);
                        }
             ]
   }
  });

}

})();
