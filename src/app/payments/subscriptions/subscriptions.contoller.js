(function() {
    'use strict';
    angular
        .module('app.payments')
        .controller('SubscriptionsController', subscriptionsController);

    function subscriptionsController() {
        var vm = this;

        vm.paymentsMethods = paymentsMethods;
    }

    var paymentsMethods = [
        { name: 'Visa', cover: 'assets/images/sprite.payment-cards.png' },
        { name: 'Яндекс.Деньги', cover: 'assets/images/sprite.payment-yandexmoney.png' },
        { name: 'PayPal', cover: 'assets/images/sprite.payment-paypal.png' },
        { name: 'WebMoney', cover: 'assets/images/sprite.payment-webmoney.png' },
        { name: 'SMS', cover: '', desc: 'Только для России' },
        { name: 'QIWI', cover: 'assets/images/sprite.payment-qiwi.png' },
        { name: 'Подарочный код', cover: '' },
    ];
})();