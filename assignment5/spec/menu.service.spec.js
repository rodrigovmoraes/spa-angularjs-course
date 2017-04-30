describe('MenuService', function () {

  var mService;
  var $httpBackend;
  var ApiBasePath;
  var itemA3Json = {"id":3,"short_name":"A3","name":"Chicken Corn Soup","description":"clear chicken broth with creamy corn and egg drop with white meat chicken pieces","price_small":2.75,"price_large":5.5,"small_portion_name":"pint","large_portion_name":"quart","created_at":"2017-04-30T18:39:23.242Z","updated_at":"2017-04-30T18:39:23.242Z","category_short_name":"A","image_present":true};
  var notExistItem = {"status":"500","error":"Internal Server Error"};

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      mService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('should return the item', function() {
    $httpBackend.whenGET(ApiBasePath + '/menu_items/A3.json').respond(itemA3Json);
    mService.getItem('A3').then(function(result) {
      expect(result).toEqual(itemA3Json);
    });
    $httpBackend.flush();
  });

  it('should detect that the item doest not exist', function() {
     $httpBackend.whenGET(ApiBasePath + '/menu_items/notexistitem.json').respond(500, notExistItem);
     mService.getItem('notexistitem').then(function(result) {
        fail('The service must reject a request for an item that does not exist');
     }).catch(function(result) {
        expect(result.data).toEqual(notExistItem);
     });
    $httpBackend.flush();
  });

});
