

describe('Hospital',function(){

    beforeEach(module('starter.controllers','starter.services'));

    var http;
    var scope;
    var hospital;
    var map;

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        http = $httpBackend;
        hospital = {get:function(){}};
        map = {get:function(){}};

        spyOn(hospital, 'get').andReturn({address:"03-242 Warszawa, ul. Kondratowicza 8"});
        spyOn(map, 'get').andReturn({lat:123,long:456});

        $controller('HospitalDetailCtrl', {
            $scope: scope,
            $stateParams:{id:1},
            Hospitals:hospital,
            Map: map
        });
    }));

    xit("calls google api for location of hospital", function () {
        var hospitalAddress = "03-242%20Warszawa,%20ul.%20Kondratowicza%208";

        http.expectGET("https://maps.googleapis.com/maps/api/geocode/json?address="+hospitalAddress+"&key=AIzaSyC-OvKegNOWfGExVbG1x1xuMztPsxb3ZSk").respond(200);
        http.flush();

        expect(scope.map).toEqual({ lat : 123, long : 456 });
    });

});