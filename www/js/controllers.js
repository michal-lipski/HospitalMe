angular.module('starter.controllers', [])

    .controller('HospitalsCtrl', function ($scope, Hospitals, $http, $rootScope, Navigation, PharmacyParser, Distance, DistanceMatrixService) {

        function parse(data) {
            return PharmacyParser.parse(data);
        }

        $scope.travelMode = google.maps.TravelMode.DRIVING;

        //
        Hospitals.all().success(function (data) {
            $rootScope.hospitals = parse(data);
            Navigation.currentPosition(onPositionChanged);
        });


        //$rootScope.hospitals = parse({
        //    result: {
        //        featureMemberList: [
        //            {
        //                geometry: {
        //                    type: "ShapePoint",
        //                    coordinates: [
        //                        {
        //                            latitude: "52.247733",
        //                            longitude: "20.973322"
        //                        }
        //                    ]
        //                },
        //                properties: [
        //                    {
        //                        value: "1634",
        //                        key: "OBJECTID"
        //                    },
        //                    {
        //                        value: "Karowa",
        //                        key: "ULICA"
        //                    },
        //                    {
        //                        value: "5",
        //                        key: "NUMER"
        //                    },
        //                    {
        //                        value: "04-051",
        //                        key: "KOD"
        //                    },
        //                    {
        //                        value: "APTEKA 2",
        //                        key: "OPIS"
        //                    },
        //                    {
        //                        value: "pon.-pt. 08.00-21.00, sob. 09.00-15.00",
        //                        key: "godziny_pracy"
        //                    },
        //                    {
        //                        value: "Praga-Południe",
        //                        key: "DZIELNICA"
        //                    },
        //                    {
        //                        value: "Warszawa",
        //                        key: "JEDN_ADM"
        //                    },
        //                    {
        //                        value: "22 870-68-68",
        //                        key: "TEL_FAX"
        //                    },
        //                    {
        //                        value: "poligonowa@neostrada.pl",
        //                        key: "MAIL"
        //                    },
        //                    {
        //                        value: "czerwiec 2014",
        //                        key: "AKTU_DAN"
        //                    }
        //                ]
        //            },
        //            {
        //                geometry: {
        //                    type: "ShapePoint",
        //                    coordinates: [
        //                        {
        //                            latitude: "52.235154",
        //                            longitude: "20.971456"
        //                        }
        //                    ]
        //                },
        //                properties: [
        //                    {
        //                        value: "1634",
        //                        key: "OBJECTID"
        //                    },
        //                    {
        //                        value: "Poligonowa",
        //                        key: "ULICA"
        //                    },
        //                    {
        //                        value: "1 lok. 2",
        //                        key: "NUMER"
        //                    },
        //                    {
        //                        value: "04-051",
        //                        key: "KOD"
        //                    },
        //                    {
        //                        value: "APTEKA",
        //                        key: "OPIS"
        //                    },
        //                    {
        //                        value: "pon.-pt. 08.00-21.00, sob. 09.00-15.00",
        //                        key: "godziny_pracy"
        //                    },
        //                    {
        //                        value: "Praga-Południe",
        //                        key: "DZIELNICA"
        //                    },
        //                    {
        //                        value: "Warszawa",
        //                        key: "JEDN_ADM"
        //                    },
        //                    {
        //                        value: "22 870-68-68",
        //                        key: "TEL_FAX"
        //                    },
        //                    {
        //                        value: "poligonowa@neostrada.pl",
        //                        key: "MAIL"
        //                    },
        //                    {
        //                        value: "czerwiec 2014",
        //                        key: "AKTU_DAN"
        //                    }
        //                ]
        //            }
        //        ]
        //    }
        //});
        //Navigation.currentPosition(onPositionChanged);

        $rootScope.$on('onApplicationResume', function () {
            Navigation.currentPosition(onPositionChanged);
        });

        $rootScope.$on('positionChanged', function () {
            if ($rootScope.hospitals && $rootScope.hospitals.length > 0) {
                Navigation.currentPosition(onPositionChanged);
            }
        });


        function filterHospitals(hospitals, maxAmount, currentPosition) {
            var nearbyHospitals = _.map(hospitals, function (hospital) {
                hospital.rawDistance = Distance.calculateDistance(hospital.position, currentPosition.coords)
                return hospital
            });
            nearbyHospitals = _.sortBy(nearbyHospitals, function (hospital) {
                return hospital.rawDistance;
            });

            return _.take(nearbyHospitals, maxAmount);
        }

        function onPositionChanged(position) {
            $rootScope.position = position;
            $rootScope.hospitals = filterHospitals($scope.hospitals, 10, position);

            $scope.calculateNewDistances();
        }

        $scope.calculateNewDistances = function () {
            DistanceMatrixService.calculate($rootScope.position, $rootScope.hospitals, onDistanceCalculated, $scope.travelMode);
        };

        function onDistanceCalculated(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                alert('DistanceMatrixStatus Error was: ' + status);
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

    .controller('HospitalDetailCtrl', function ($scope, $rootScope, $stateParams, Hospitals, $http, hospital) {

        $scope.hospital = hospital;
        initialize();

        $scope.openMap = function () {
            window.open('http://www.google.pl/maps/dir/' + $rootScope.position.coords.latitude + "," + $rootScope.position.coords.longitude + "/" + $scope.hospital.position.latitude + "," + $scope.hospital.position.longitude
                , '_system');
        };

        $scope.openWWW = function (url) {
            window.open('http://' + url, '_system', 'location=yes');
        };

        function initialize() {
            var location = {lat: parseFloat($scope.hospital.position.latitude), lng: parseFloat($scope.hospital.position.longitude)};
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: location
            });

            var marker = new google.maps.Marker({
                position: location,
                map: $scope.map,
                title: $scope.hospital.name,
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
