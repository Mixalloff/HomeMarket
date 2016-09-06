(function() {
    'use strict';
    angular
        .module('app.payments')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('payments', {
                    abstract: true,
                    template: '<ui-view></ui-view>',
                    controller: 'PaymentsController',
                    controllerAs: 'payments'
                })
                .state('payments.subscriptions', {
                    url: '/',
                    templateUrl: 'app/payments/subscriptions/subscriptions.html',
                    controller: 'SubscriptionsController',
                    controllerAs: 'subscriptions'
                })
            $urlRouterProvider.otherwise('/');
        })
})();