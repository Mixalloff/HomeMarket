(function() {
    'use strict';
    angular
        .module('app.payments')
        .controller('SubscriptionsController', subscriptionsController);

    function subscriptionsController() {
        var vm = this;
        // Секция выбора метода
        vm.PayMethod = {};
        vm.PayMethod.paymentMethods = config.paymentMethods;
        vm.PayMethod.currentPaymentMethod = null;
        vm.PayMethod.isCurrentMethod = isCurrentMethod;
        vm.PayMethod.setCurrentPaymentMethod = setCurrentPaymentMethod;
        vm.PayMethod.setCover = setCover;
        vm.PayMethod.isMethodDisabled = isMethodDisabled;
        vm.PayMethod.giftSubscriptionShow = giftSubscriptionShow;

        // Секция выбора срока оплаты
        vm.Tariff = {};
        vm.Tariff.tariffs = config.tariffs;
        vm.Tariff.isCurrentTariff = isCurrentTariff;
        vm.Tariff.currentTariff = null;
        vm.Tariff.setCurrentTariff = setCurrentTariff;
        vm.Tariff.isAutoProlongAvailable = isAutoProlongAvailable;

        // Секция итогов
        vm.Total = {};
        vm.Total.totalAmount = 0;
        vm.Total.discountSubscriptionPrice = config.discountSubscriptionPrice;
        vm.Total.addDiscountChanged = calculateCurrentAmount;
        vm.Total.calculateCurrentAmount = calculateCurrentAmount;
        vm.Total.isAddDiscount = false;

        // Установка выбранного способа оплаты
        function setCurrentPaymentMethod(method) {
            if (!isMethodDisabled(method)) {
                vm.PayMethod.currentPaymentMethod = method;
            }
            vm.Tariff.isAutoProlong = vm.Tariff.isAutoProlong && isAutoProlongAvailable();
        }

        // Сравнение переданного метода с текущим
        function isCurrentMethod(method) {
            if (vm.PayMethod.currentPaymentMethod) {
                return vm.PayMethod.currentPaymentMethod.id === method.id && !isMethodDisabled(method);
            }
            return false;
        }

        // Устанавливает изображение для способа оплаты (в зависимости от выбранного)
        function setCover(method) {
            return (!vm.PayMethod.isCurrentMethod(method) && vm.PayMethod.currentPaymentMethod) ?  method.inactive_cover : method.active_cover;
        }
        // Проверяет, является ли метод оплаты недоступным
        function isMethodDisabled(method) {
            return method.id == 'giftcode' && vm.PayMethod.isGiftSubscription;
        }
        // Управление отображением флага "Покупка подписки в подарок"
        function giftSubscriptionShow() {
            return vm.PayMethod.currentPaymentMethod ? vm.PayMethod.currentPaymentMethod.id != 'giftcode' : true;
        }

        // Установка текущего тарифа
        function setCurrentTariff(tariff) {
            vm.Tariff.currentTariff = tariff;
            calculateCurrentAmount();
        }
        // Проверка, является ли тариф текущим
        function isCurrentTariff(tariff) {
            if (vm.Tariff.currentTariff) {
                return vm.Tariff.currentTariff.id == tariff.id;
            }
            return false;
        }
        // Проверяет, есть ли возможность автопродления подписки
        function isAutoProlongAvailable() {
            return vm.PayMethod.currentPaymentMethod && 
                   vm.PayMethod.currentPaymentMethod.auto_prolong &&
                   !vm.PayMethod.isGiftSubscription;
        }
        
        // Вычисление текущей суммы
        function calculateCurrentAmount() {
            if (vm.Tariff.currentTariff) {
                vm.Total.totalAmount = vm.Tariff.currentTariff.amount + vm.Total.isAddDiscount * vm.Total.discountSubscriptionPrice;
            }
            return vm.Total.totalAmount;
        }

    }

    var config = {
        paymentMethods: [
            { id: 'visa', name: 'Visa', active_cover: 'assets/images/sprite.payment-cards.png', inactive_cover: 'assets/images/sprite.payment-cards-bw.png', auto_prolong: true },
            { id: 'ymoney', name: 'Яндекс.Деньги', active_cover: 'assets/images/sprite.payment-yandexmoney.png', inactive_cover: 'assets/images/sprite.payment-yandexmoney-bw.png', auto_prolong: true },
            { id: 'paypal', name: 'PayPal', active_cover: 'assets/images/sprite.payment-paypal.png', inactive_cover: 'assets/images/sprite.payment-paypal-bw.png', auto_prolong: true },
            { id: 'webmoney', name: 'WebMoney', active_cover: 'assets/images/sprite.payment-webmoney.png', inactive_cover: 'assets/images/sprite.payment-webmoney-bw.png' },
            { id: 'sms', name: 'SMS', active_cover: '', inactive_cover: '', desc: 'Только для России', auto_prolong: true },
            { id: 'qiwi', name: 'QIWI', active_cover: 'assets/images/sprite.payment-qiwi.png', inactive_cover: 'assets/images/sprite.payment-qiwi-bw.png'  },
            { id: 'giftcode', name: 'Подарочный код', active_cover: '' },
        ],
        tariffs: [
            { id: 'two_years', duration: '2 года', amount: 2880, month_pay: 120, card_cover: 'assets/images/discount_card.png' },
            { id: 'one_year', duration: '1 год', amount: 1500, month_pay: 125, card_cover: 'assets/images/discount_card.png' },
            { id: 'half_year', duration: '6 месяцев', amount: 780, month_pay: 130, card_cover: 'assets/images/discount_card.png' },
        ],
        discountSubscriptionPrice: 150
    }
})();