

describe('Pharmacy',function(){

    beforeEach(module('starter.controllers','starter.services'));

    var http;
    var scope;
    var pharmacy;
    var map;

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        http = $httpBackend;
        pharmacy = {get:function(){}};
        map = {get:function(){}};

        spyOn(pharmacy, 'get').andReturn({address:"03-242 Warszawa, ul. Kondratowicza 8"});
        spyOn(map, 'get').andReturn({lat:123,long:456});

        $controller('PharmacyDetailsCtrl', {
            $scope: scope,
            $stateParams:{id:1},
            Pharmacies:pharmacy,
            Map: map
        });
    }));

    xit("calls google api for location of pharmacy", function () {
        var pharmacyAddress = "03-242%20Warszawa,%20ul.%20Kondratowicza%208";

        http.expectGET("https://maps.googleapis.com/maps/api/geocode/json?address="+pharmacyAddress+"&key=AIzaSyC-OvKegNOWfGExVbG1x1xuMztPsxb3ZSk").respond(200);
        http.flush();

        expect(scope.map).toEqual({ lat : 123, long : 456 });
    });

});