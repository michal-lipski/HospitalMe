angular.module('app.details', [])
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

    });