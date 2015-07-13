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
    })
    .factory('Distance', function () {


        return {
            calculateDistance: function (pos1, pos2) {

                function toRad(number) {
                    return number * Math.PI / 180;
                }

                var R = 6371; // km
                var dLat = toRad(pos2.latitude - pos1.latitude);
                var dLon = toRad(pos2.longitude - pos1.longitude);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(toRad(pos1.latitude)) * Math.cos(toRad(pos2.latitude)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                return d;


            }
        }
    })
    .factory('Navigation', function ($rootScope, Distance) {

        var currentPosition = {coords: {latitude: 0, longitude: 0}};

        function getCurrentPosition(onSuccess, onError) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
        }

        function defaultError() {
            alert('Calculating position Error: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

        function onPositionChange(position) {
            function positionHasChanged(position) {

                var distance = Distance.calculateDistance(position.coords, currentPosition.coords);
                var ten_meters = 0.01;
                return distance > ten_meters;
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
    .factory('PharmacyParser', function () {
        return {
            parse: function (data) {
                var parsedData = _.map(data.result.featureMemberList, function (location) {

                    function prop(key, defaultValue) {
                        defaultValue = defaultValue || "";
                        var property = _.find(location.properties, {key: key});
                        return ( property ) ? property.value : defaultValue
                    }

                    return {
                        id: prop("OBJECTID"),
                        position: location.geometry.coordinates[0],
                        name: prop("OPIS", "Apteka"),
                        address: prop("ULICA") + " " + prop("NUMER"),
                        phone: prop("TEL_FAX"),
                        hours: prop("godziny_pracy")
                    }
                });
                return parsedData;
            }
        };
    })
    .factory('DistanceMatrixService', function () {
        return {
            calculate: function (origin, destinations, callback, travelMode) {
                travelMode = travelMode || google.maps.TravelMode.DRIVING;
                try {
                    var service = new google.maps.DistanceMatrixService();
                } catch (ex) {
                    alert("DistanceMatrixService registration error: " + ex);
                }
                service.getDistanceMatrix(
                    {
                        origins: ['' + origin.coords.latitude + "," + origin.coords.longitude],
                        destinations: _.map(destinations, function (h) {
                            return '' + h.position.latitude + "," + h.position.longitude
                        }),
                        travelMode: travelMode,
                        unitSystem: google.maps.UnitSystem.METRIC
                    }, callback);
            }
        }
    })
;
