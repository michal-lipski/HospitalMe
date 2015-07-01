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

        var hospitals = $http.get("http://hospitals.herokuapp.com/hospital");

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
    })
    .factory('Navigation', function ($rootScope) {

        var currentPosition = {coords:{latitude:0,longitude:0}};

        function getCurrentPosition(onSuccess, onError) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
        }

        function defaultError() {
            alert('Error: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

        function onPositionChange(position) {
            function positionHasChanged(position) {
                function calculateDistance(lat1, lon1, lat2, lon2) {
                    var R = 6371; // km
                    var dLat = (lat2 - lat1).toRad();
                    var dLon = (lon2 - lon1).toRad();
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c;
                    return d;
                }

                Number.prototype.toRad = function () {
                    return this * Math.PI / 180;
                };

                var distance = calculateDistance(position.coords.latitude, position.coords.longitude, currentPosition.coords.latitude, currentPosition.coords.longitude);
                return distance > 0.01;
            }

            if (positionHasChanged(position)) {
                currentPosition = position;
                $rootScope.$broadcast('positionChanged');
            }
        }



        navigator.geolocation.watchPosition(onPositionChange, defaultError, {timeout: 30000});

        return {
            currentPosition: function (onSuccess, onError) {
                onError = onError || defaultError;
                return getCurrentPosition(onSuccess, onError);
            }
        }

    }
)
;
