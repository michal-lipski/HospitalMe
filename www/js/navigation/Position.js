angular.module('app.navigation')
    .factory('Navigation', function ($rootScope, Distance) {

        var currentPosition = {coords: {latitude: 0, longitude: 0}};

        function getCurrentPosition(onSuccess, onError) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
        }

        function defaultError() {
            alert('Calculating position Error: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

        function positionHasChanged(position,position2) {
            var maxDistance = 0.1;
            var distance = Distance.calculateDistance(position.coords, position2.coords);
            return distance > maxDistance;
        }

        return {
            currentPosition: function (onSuccess, onError) {
                onError = onError || defaultError;
                return getCurrentPosition(onSuccess, onError);
            },
            watchPosition: function (callback) {
                navigator.geolocation.watchPosition(function (newPosition) {
                    if (positionHasChanged(newPosition, currentPosition)) {
                        currentPosition = newPosition;
                        callback(newPosition)
                    }
                }, defaultError, {timeout: 30000});

            }
        }

    }
);