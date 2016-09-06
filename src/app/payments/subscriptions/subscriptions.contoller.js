(function() {
    'use strict';
    angular
        .module('app.payments')
        .controller('SubscriptionsController', subscriptionsController);

    function subscriptionsController() {
        var vm = this;

        vm.paymentsMethods = paymentsMethods;
        vm.currentPaymentMethod = null;
        vm.isCurrentMethod = isCurrentMethod;
        vm.setCurrentPaymentMethod = setCurrentPaymentMethod;
        vm.setCover = setCover;
        vm.isMethodDisabled = isMethodDisabled;

        vm.giftSubscriptionChanged = giftSubscriptionChanged;
        vm.giftSubscriptionShow = giftSubscriptionShow;

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
        // Обработка установки/снятия флажка "Покупаю подписку в подарок"
        function giftSubscriptionChanged() {
            // if (vm.isGiftSubscription && vm.currentPaymentMethod && vm.currentPaymentMethod.id == 'giftcode') {
            //     vm.currentPaymentMethod = null;
            // }
        }
        function giftSubscriptionShow() {
            // if (vm.currentPaymentMethod) {
            //     return vm.currentPaymentMethod.id != 'giftcode';
            // } 
            return vm.currentPaymentMethod ? vm.currentPaymentMethod.id != 'giftcode' : true;
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
})();