(function() {
    'use strict';
    angular
        .module('app.subscriptions')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('subscriptions', {
                    url: '/',
                    templateUrl: 'app/subscriptions/subscriptions.html',
                    controller: 'SubscriptionsController',
                    controllerAs: 'subscriptions'
                })
            $urlRouterProvider.otherwise('/');
        })
})();