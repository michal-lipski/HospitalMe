angular.module('app.list', [])
    .controller('PharmaciesCtrl', function ($scope, Pharmacies, $http, $rootScope, Navigation, PharmacyParser, Distance, DistanceMatrixService) {

        function parse(data) {
            return PharmacyParser.parse(data);
        }

        $scope.travelMode = google.maps.TravelMode.DRIVING;

        Pharmacies.all().success(function (data) {
            $rootScope.pharmacies = parse(data);
            Navigation.currentPosition(onPositionChanged);
        });


        $rootScope.$on('onApplicationResume', function () {
            Navigation.currentPosition(onPositionChanged);
        });

        $rootScope.$on('positionChanged', function () {
            if ($rootScope.pharmacies && $rootScope.pharmacies.length > 0) {
                Navigation.currentPosition(onPositionChanged);
            }
        });


        function filterHospitals(pharmacies, maxAmount, currentPosition) {
            var nearbyHospitals = _.map(pharmacies, function (pharmacy) {
                pharmacy.rawDistance = Distance.calculateDistance(pharmacy.position, currentPosition.coords)
                return pharmacy
            });
            nearbyHospitals = _.sortBy(nearbyHospitals, function (pharmacy) {
                return pharmacy.rawDistance;
            });

            return _.take(nearbyHospitals, maxAmount);
        }

        function onPositionChanged(position) {
            $rootScope.position = position;
            $rootScope.pharmacies = filterHospitals($scope.pharmacies, 10, position);

            $scope.calculateNewDistances();
        }

        $scope.calculateNewDistances = function () {
            DistanceMatrixService.calculate($rootScope.position, $rootScope.pharmacies, onDistanceCalculated, $scope.travelMode);
        };

        function onDistanceCalculated(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                alert('DistanceMatrixStatus Error was: ' + status);
            } else {

                var row = response.rows[0];

                for (var j = 0; j < row.elements.length; j++) {
                    var element = row.elements[j];
                    $scope.pharmacies[j].distance = element.distance;
                    $scope.pharmacies[j].duration = element.duration;
                }
                $scope.$apply();
            }
        }

        $scope.calculateNewDistancesCar = function () {
            $scope.travelMode = google.maps.TravelMode.DRIVING;
            $scope.calculateNewDistances();
        };
        $scope.calculateNewDistancesBike = function () {
            $scope.travelMode = google.maps.TravelMode.BICYCLING;
            $scope.calculateNewDistances();
        };
        $scope.calculateNewDistancesWalk = function () {
            $scope.travelMode = google.maps.TravelMode.WALKING;
            $scope.calculateNewDistances();
        };
        $scope.calculateNewDistancesTransit = function () {
            $scope.travelMode = google.maps.TravelMode.TRANSIT;
            $scope.calculateNewDistances();
        };

        $scope.isTravelModeDriving = function () {
            return $scope.travelMode == google.maps.TravelMode.DRIVING;
        };

        $scope.isTravelModeTransit = function () {
            return $scope.travelMode == google.maps.TravelMode.TRANSIT;
        };

        $scope.isTravelModeWalk = function () {
            return $scope.travelMode == google.maps.TravelMode.WALKING;
        };

        $scope.isTravelModeBike = function () {
            return $scope.travelMode == google.maps.TravelMode.BICYCLING;
        };

    });
