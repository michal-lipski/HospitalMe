angular.module('app.navigation')

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
    });