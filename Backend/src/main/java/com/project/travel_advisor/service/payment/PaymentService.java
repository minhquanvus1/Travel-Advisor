package com.project.travel_advisor.service.payment;

import com.project.travel_advisor.dto.PaymentInfo;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface PaymentService {

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
