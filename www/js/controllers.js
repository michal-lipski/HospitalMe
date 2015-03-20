angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {

    })

    .controller('HospitalsCtrl', function ($scope, Hospitals, $http) {
        $scope.hospitals = Hospitals.all();
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});

        function onError(error) {
            alert('Error: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

        function onSuccess(position) {
            //$scope.hospitals = Hospitals.all();
            try {
                var service = new google.maps.DistanceMatrixService();
            }catch(ex){
                alert(ex);
            }
            service.getDistanceMatrix(
                {
                    origins: ['' + position.coords.latitude + "," + position.coords.longitude],
                    destinations: _.pluck($scope.hospitals, 'address'),
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC
                }, callback);

            function callback(response, status) {
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    alert('Error was: ' + status);
                } else {

                    var row = response.rows[0];

                    for (var j = 0; j < row.elements.length; j++) {
                        var element = row.elements[j];
                        $scope.hospitals[j].distance = element.distance;
                        $scope.hospitals[j].duration = element.duration;
                    }
                    $scope.$apply();
                }
            }
        }


    })

    .controller('HospitalDetailCtrl', function ($scope, $stateParams, Hospitals, $http, Map) {
        $scope.hospital = Hospitals.get($stateParams.hospitalId);

        $scope.openMap = function () {
            window.open('http://maps.google.com/?q=' + $scope.hospital.address);
        };

        $scope.openWWW = function (url) {
            window.open('http://' + url, '_system', 'location=yes');
        };


    })

    .controller('AccountCtrl', function ($scope) {

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});

        function onError(error) {
            alert('Error code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

        function onSuccess(position) {
            $scope.settings.position = position;
            $scope.$apply();
        }

        $scope.settings = {
            enableFriends: true
        };
    });
