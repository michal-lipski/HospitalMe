angular.module('app.details')
    .controller('PharmacyDetailsCtrl', function ($scope, $rootScope, pharmacy, Map) {

        $scope.pharmacy = pharmacy;
        initializeMap();

        $scope.openMap = function () {
            window.open('http://www.google.pl/maps/dir/' + $rootScope.position.coords.latitude + "," + $rootScope.position.coords.longitude + "/" + $scope.pharmacy.position.latitude + "," + $scope.pharmacy.position.longitude
                , '_system');
        };

        $scope.openWWW = function (url) {
            window.open('http://' + url, '_system', 'location=yes');
        };

        function initializeMap() {
            $scope.map = Map.get($scope.pharmacy.position, "map", "img/nav_open.png");
        }

    });