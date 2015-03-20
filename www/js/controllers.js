angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HospitalsCtrl', function($scope, Hospitals) {
  $scope.hospitals = Hospitals.all();

})

.controller('HospitalDetailCtrl', function($scope, $stateParams, Hospitals) {
  $scope.hospital = Hospitals.get($stateParams.hospitalId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
