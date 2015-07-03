angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {

    })

    .controller('HospitalsCtrl', function ($scope, Hospitals, $http, $rootScope, Navigation, PharmacyParser, Distance) {

        function parse(data) {
            return PharmacyParser.parse(data);
        }

        Hospitals.all().success(function (data) {
            $scope.hospitals = parse(data);
            Navigation.currentPosition(calculateHospitalsDistance);

        });

        $rootScope.$on('onApplicationResume', function () {
            Navigation.currentPosition(calculateHospitalsDistance);
        });

        $rootScope.$on('positionChanged', function () {
            if ($scope.hospitals && $scope.hospitals.length > 0) {
                Navigation.currentPosition(calculateHospitalsDistance);
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

        function calculateHospitalsDistance(position) {

            $scope.hospitals = filterHospitals($scope.hospitals, 20, position);

            try {
                var service = new google.maps.DistanceMatrixService();
            } catch (ex) {
                alert("DistanceMatrixService registration error: " + ex);
            }
            service.getDistanceMatrix(
                {
                    origins: ['' + position.coords.latitude + "," + position.coords.longitude],
                    destinations: _.map($scope.hospitals, function (h) {
                        return '' + h.position.latitude + "," + h.position.longitude
                    }),
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC
                }, callback);

            function callback(response, status) {
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
        }


    })

    .controller('HospitalDetailCtrl', function ($scope, $stateParams, Hospitals, $http, Map) {


        Hospitals.all().success(function (data) {
            $scope.hospital = _.find(data, {id: $stateParams.hospitalId});
            initialize();
        });

        $scope.openMap = function () {
            window.open('http://maps.google.com/?q=' + $scope.hospital.address);
        };

        $scope.openWWW = function (url) {
            window.open('http://' + url, '_system', 'location=yes');
        };

        function initialize() {
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI($scope.hospital.address) + "&key=AIzaSyC-OvKegNOWfGExVbG1x1xuMztPsxb3ZSk").
                success(function (data, status, headers, config) {
                    var location = data.results[0].geometry.location;
                    //var map = Map.get(location.lat, location.lng);
                    //$scope.map = map;

                    $scope.map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 16,
                        center: {lat: location.lat, lng: location.lng}
                    });

                    var marker = new google.maps.Marker({
                        position: location,
                        map: $scope.map,
                        title: 'Hello World!'
                    });

                    var url = 'http://maps.google.com/?q=' + $scope.hospital.address;
                    var infowindow = new google.maps.InfoWindow({
                        content: '<a target="_blank" href="#" onclick="window.open(\'' + url + '\')">Nawiguj do mapy</a>'
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open($scope.map, marker);
                    });
                }).
                error(function (data, status, headers, config) {
                    alert('Maps error, status = ' + status);
                });
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
