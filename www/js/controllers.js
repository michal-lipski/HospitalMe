angular.module('starter.controllers', [])

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

    })

    .controller('PharmacyDetailsCtrl', function ($scope, $rootScope, $stateParams, Pharmacies, $http, pharmacy) {

        $scope.pharmacy = pharmacy;
        initialize();

        $scope.openMap = function () {
            window.open('http://www.google.pl/maps/dir/' + $rootScope.position.coords.latitude + "," + $rootScope.position.coords.longitude + "/" + $scope.pharmacy.position.latitude + "," + $scope.pharmacy.position.longitude
                , '_system');
        };

        $scope.openWWW = function (url) {
            window.open('http://' + url, '_system', 'location=yes');
        };

        function initialize() {
            var location = {lat: parseFloat($scope.pharmacy.position.latitude), lng: parseFloat($scope.pharmacy.position.longitude)};
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: location
            });

            var marker = new google.maps.Marker({
                position: location,
                map: $scope.map,
                title: $scope.pharmacy.name,
                icon: "img/nav_open.png"
            });
            marker.setClickable(false);
        }


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
