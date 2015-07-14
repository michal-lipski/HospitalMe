angular.module('app.navigation')

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
                        destinations: _.map(destinations, function (dest) {
                            return '' + dest.position.latitude + "," + dest.position.longitude
                        }),
                        travelMode: travelMode,
                        unitSystem: google.maps.UnitSystem.METRIC
                    }, callback);
            }
        }
    });
