angular.module('app.list', [])
    .controller('PharmaciesCtrl', function ($scope, Pharmacies, $http, $rootScope, Navigation, PharmacyParser, Distance, DistanceMatrixService) {

        $scope.travelMode = google.maps.TravelMode.DRIVING;

        $scope.loading = true;
        Pharmacies.all().success(function (data) {
            $rootScope.pharmacies = PharmacyParser.parse(data);
            Navigation.currentPosition(onPositionChanged);
            Navigation.watchPosition(onPositionChanged);
        });

        $rootScope.$on('onApplicationResume', function () {
            Navigation.currentPosition(onPositionChanged);
        });

        function onPositionChanged(position) {
            $scope.loading = false;
            $rootScope.position = position;
            $rootScope.pharmacies = Distance.nearestPlaces($scope.pharmacies, 10, position.coords);
            DistanceMatrixService.calculate($rootScope.position.coords, $rootScope.pharmacies, $scope.travelMode, onDistanceCalculated);
        }

        function onDistanceCalculated(response) {
            for (var j = 0; j < response.elements.length; j++) {
                var element = response.elements[j];
                $scope.pharmacies[j].distance = element.distance;
                $scope.pharmacies[j].duration = element.duration;
            }
            $scope.$apply();
        }

        $scope.calculateNewDistancesCar = function () {
            $scope.travelMode = google.maps.TravelMode.DRIVING;
            DistanceMatrixService.calculate($rootScope.position.coords, $rootScope.pharmacies, $scope.travelMode, onDistanceCalculated);
        };
        $scope.calculateNewDistancesBike = function () {
            $scope.travelMode = google.maps.TravelMode.BICYCLING;
            DistanceMatrixService.calculate($rootScope.position.coords, $rootScope.pharmacies, $scope.travelMode, onDistanceCalculated);
        };
        $scope.calculateNewDistancesWalk = function () {
            $scope.travelMode = google.maps.TravelMode.WALKING;
            DistanceMatrixService.calculate($rootScope.position.coords, $rootScope.pharmacies, $scope.travelMode, onDistanceCalculated);
        };
        $scope.calculateNewDistancesTransit = function () {
            $scope.travelMode = google.maps.TravelMode.TRANSIT;
            DistanceMatrixService.calculate($rootScope.position.coords, $rootScope.pharmacies, $scope.travelMode, onDistanceCalculated);
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
