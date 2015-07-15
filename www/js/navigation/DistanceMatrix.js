angular.module('app.navigation')

    .factory('DistanceMatrixService', function () {

        function onDistanceCalculated(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                alert('DistanceMatrixStatus Error was: ' + status);
            } else {

                callback(response);
            }
        }

        return {
            calculate: function (origin, destinations, travelMode, callback) {
                travelMode = travelMode || google.maps.TravelMode.DRIVING;
                var options = {
                    origins: ['' + origin.latitude + "," + origin.longitude],
                    destinations: _.map(destinations, function (dest) {
                        return '' + dest.position.latitude + "," + dest.position.longitude
                    }),
                    travelMode: travelMode,
                    unitSystem: google.maps.UnitSystem.METRIC
                };
                new google.maps.DistanceMatrixService().getDistanceMatrix(options,
                    function onDistanceCalculated(response, status) {
                        if (status != google.maps.DistanceMatrixStatus.OK) {
                            alert('DistanceMatrixStatus Error was: ' + status);
                        } else {
                            callback(response.rows[0]);
                        }
                    });
            }
        }
    });
