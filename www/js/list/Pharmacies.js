angular.module('app.list')
    .factory('Pharmacies', function ($http) {

        //var pharmacies = $http.get("https://api.um.warszawa.pl/api/action/wfsstore_get/?id=fd137190-3d65-4306-a85e-5e97e7f29a23&apikey=9b7e14dd-5fb4-4b35-880a-add59b348069");
        var pharmacies = $http.get("http://hospitals.herokuapp.com/pharmacies");

        return {
            all: function () {
                return pharmacies;
            },
            get: function (id) {
                for (var i = 0; i < pharmacies.length; i++) {
                    if (pharmacies[i].id === parseInt(id)) {
                        return pharmacies[i];
                    }
                }
                return null;
            }
        };
    });