
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('tab.pharmacies', {
                url: '/pharmacies',
                views: {
                    'tab-pharmacies': {
                        templateUrl: 'templates/pharmacies-list.html',
                        controller: 'PharmaciesCtrl'
                    }
                }
            })
            .state('tab.pharmacy-detail', {
                url: '/pharmacies/:id',
                views: {
                    'tab-pharmacies': {
                        templateUrl: 'templates/pharmacy-detail.html',
                        controller: 'PharmacyDetailsCtrl',
                        resolve: {
                            pharmacy: function ($rootScope,$stateParams) {
                                return _.find($rootScope.pharmacies, {id: $stateParams.id});
                            }
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/pharmacies');

    })
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
