(function() {
    'use strict';
    angular
        .module('app.payments')
        .controller('SubscriptionsController', subscriptionsController);

    function subscriptionsController() {
        var vm = this;
        // Секция выбора метода
        vm.paymentsMethods = paymentsMethods;
        vm.currentPaymentMethod = null;
        vm.isCurrentMethod = isCurrentMethod;
        vm.setCurrentPaymentMethod = setCurrentPaymentMethod;
        vm.setCover = setCover;
        vm.isMethodDisabled = isMethodDisabled;

        vm.giftSubscriptionShow = giftSubscriptionShow;

        // Секция выбора срока оплаты
        vm.tariffs = tariffs;
        vm.isCurrentTariff = isCurrentTariff;
        vm.currentTariff = null;
        vm.setCurrentTariff = setCurrentTariff;

        // Установка выбранного способа оплаты
        function setCurrentPaymentMethod(method) {
            if (!isMethodDisabled(method)) {
                vm.currentPaymentMethod = method;
            }
        }

        // Сравнение переданного метода с текущим
        function isCurrentMethod(method) {
            if (vm.currentPaymentMethod) {
                return vm.currentPaymentMethod.id === method.id && !isMethodDisabled(method);
            }
            return false;
        }

        // Устанавливает изображение для способа оплаты (в зависимости от выбранного)
        function setCover(method) {
            return (!vm.isCurrentMethod(method) && vm.currentPaymentMethod) ?  method.inactive_cover : method.active_cover;
        }
        // Проверяет, является ли метод оплаты недоступным
        function isMethodDisabled(method) {
            return method.id == 'giftcode' && vm.isGiftSubscription;
        }
        // Управление отображением флага "Покупка подписки в подарок"
        function giftSubscriptionShow() {
            return vm.currentPaymentMethod ? vm.currentPaymentMethod.id != 'giftcode' : true;
        }


        function setCurrentTariff(tariff) {
            vm.currentTariff = tariff;
        }
        function isCurrentTariff(tariff) {
            if (vm.currentTariff) {
                return vm.currentTariff.id == tariff.id;
            }
            return false;
        }
        
    }

    var paymentsMethods = [
        { id: 'visa', name: 'Visa', active_cover: 'assets/images/sprite.payment-cards.png', inactive_cover: 'assets/images/sprite.payment-cards-bw.png' },
        { id: 'ymoney', name: 'Яндекс.Деньги', active_cover: 'assets/images/sprite.payment-yandexmoney.png', inactive_cover: 'assets/images/sprite.payment-yandexmoney-bw.png' },
        { id: 'paypal', name: 'PayPal', active_cover: 'assets/images/sprite.payment-paypal.png', inactive_cover: 'assets/images/sprite.payment-paypal-bw.png' },
        { id: 'webmoney', name: 'WebMoney', active_cover: 'assets/images/sprite.payment-webmoney.png', inactive_cover: 'assets/images/sprite.payment-webmoney-bw.png' },
        { id: 'sms', name: 'SMS', active_cover: '', inactive_cover: '', desc: 'Только для России' },
        { id: 'qiwi', name: 'QIWI', active_cover: 'assets/images/sprite.payment-qiwi.png', inactive_cover: 'assets/images/sprite.payment-qiwi-bw.png'  },
        { id: 'giftcode', name: 'Подарочный код', active_cover: '' },
    ];

    var tariffs = [
        { id: 'two_years', duration: '2 года', amount: 2880, month_pay: 120, card_cover: 'assets/images/discount_card.png' },
        { id: 'one_year', duration: '1 год', amount: 1500, month_pay: 125, card_cover: 'assets/images/discount_card.png' },
        { id: 'half_year', duration: '6 месяцев', amount: 780, month_pay: 130, card_cover: 'assets/images/discount_card.png' },
    ]
})();