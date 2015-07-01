angular.module('starter.services', [])
    .factory('Map', function () {
        return {
            get: function (lat, long) {
                var myLatlng = new google.maps.LatLng(lat, long);
                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                return map;
            }
        };
    })

    .factory('Hospitals', function ($http) {

        var hospitals = $http.get("http://localhost:8080/hospital");

        return {
            all: function () {
                return hospitals;
            },
            get: function (hospitalId) {
                for (var i = 0; i < hospitals.length; i++) {
                    if (hospitals[i].id === parseInt(hospitalId)) {
                        return hospitals[i];
                    }
                }
                return null;
            }
        };
    });
