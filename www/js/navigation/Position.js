angular.module('app.navigation')
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
);