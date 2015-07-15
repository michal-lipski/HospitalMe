angular.module('app.navigation')
    .factory('Map', function () {
        return {
            get: function (position, elementId, markerIcon) {
                var location = {lat: parseFloat(position.latitude), lng: parseFloat(position.longitude)};
                var mapOptions = {
                    center: location,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById(elementId), mapOptions);

                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    icon: markerIcon
                });
                marker.setClickable(false);

                return map;
            }
        };
    });
