package com.project.travel_advisor.service.payment;

import com.project.travel_advisor.dto.PaymentInfo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {
    public PaymentServiceImpl(@Value("${stripe.key.secret}") String secretKey) {
        Stripe.apiKey = secretKey;
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {

        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.amount());
        params.put("currency", paymentInfo.currency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("description", "Booking Tour for Travel Advisor");
        params.put("receipt_email", paymentInfo.receiptEmail());


        return PaymentIntent.create(params);
    }
}
