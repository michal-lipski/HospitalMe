angular.module('app.navigation')
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
    });
