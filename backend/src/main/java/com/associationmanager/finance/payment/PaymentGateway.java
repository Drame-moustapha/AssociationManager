package com.associationmanager.finance.payment;

import java.math.BigDecimal;
import java.util.UUID;

/** Provider-agnostic checkout port. Implement this with the payment vendor selected for deployment. */
public interface PaymentGateway {
    CheckoutSession createCheckout(CheckoutRequest request);
    boolean verifyWebhook(String rawPayload, String signature);

    record CheckoutRequest(UUID contributionId, BigDecimal amount, String currency,
                           String successUrl, String cancelUrl) {}
    record CheckoutSession(String provider, String providerReference, String checkoutUrl) {}
}
