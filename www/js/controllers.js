angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('HospitalsCtrl', function ($scope, Hospitals) {
        $scope.hospitals = Hospitals.all();

    })

    .controller('HospitalDetailCtrl', function ($scope, $stateParams, Hospitals) {
        $scope.hospital = Hospitals.get($stateParams.hospitalId);
    })

    .controller('AccountCtrl', function ($scope) {

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }

        function onSuccess(position) {
            $scope.settings.position = position;
            $scope.$apply();
        }

        $scope.settings = {
            enableFriends: true
        };
    });
