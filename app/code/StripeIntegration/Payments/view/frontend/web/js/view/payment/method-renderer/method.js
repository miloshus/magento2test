/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/action/place-order',
        'Magento_Checkout/js/action/select-payment-method',
        'StripeIntegration_Payments/js/action/get-payment-url',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Magento_Checkout/js/model/quote',
        'Magento_Customer/js/customer-data',
        'Magento_Checkout/js/model/full-screen-loader',
        'Magento_Ui/js/model/messageList',
        'mage/translate'
    ],
    function (
        $,
        Component,
        placeOrderAction,
        selectPaymentMethodAction,
        getPaymentUrlAction,
        additionalValidators,
        quote,
        customerData,
        fullScreenLoader,
        globalMessageList,
        $t
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                self: this,
                template: 'StripeIntegration_Payments/payment/redirect_form'
            },
            redirectAfterPlaceOrder: false,

            /** Redirect to Bank */
            placeOrder: function () {
                if (additionalValidators.validate()) {
                    var self = this;
                    selectPaymentMethodAction(this.getData());

                    placeOrderAction(self.getData(), self.messageContainer).done(function () {
                        getPaymentUrlAction(self.messageContainer).always(function () {
                            fullScreenLoader.stopLoader();
                        }).done(function (response) {
                            fullScreenLoader.startLoader();
                            customerData.invalidate(['cart']);
                            $.mage.redirect(response);
                        }).error(function () {
                            globalMessageList.addErrorMessage({
                                message: $t('An error occurred on the server. Please try to place the order again.')
                            });
                        });
                    });

                    return false;
                }
            }
        });
    }
);
