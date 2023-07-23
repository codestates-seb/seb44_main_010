package com.The_10th_Finance.payment.mapper;

import com.The_10th_Finance.payment.db.Payment;
import com.The_10th_Finance.payment.db.Payment.PaymentBuilder;
import com.The_10th_Finance.payment.model.PaymentPatch;
import com.The_10th_Finance.payment.model.PaymentPost;
import com.The_10th_Finance.payment.model.PaymentResponse;
import com.The_10th_Finance.payment.model.PaymentResponse.PaymentResponseBuilder;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-21T11:35:48+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 17.0.5 (Amazon.com Inc.)"
)
@Component
public class PaymentMapperImpl implements PaymentMapper {

    @Override
    public Payment paymentPostToPayment(PaymentPost paymentPost) {
        if ( paymentPost == null ) {
            return null;
        }

        PaymentBuilder payment = Payment.builder();

        payment.paymentTime( paymentPost.getPaymentTime() );
        payment.paymentType( paymentPost.getPaymentType() );
        payment.counterPartyName( paymentPost.getCounterPartyName() );
        payment.amount( paymentPost.getAmount() );
        payment.purpose( paymentPost.getPurpose() );
        payment.category( paymentPost.getCategory() );
        payment.accountId( paymentPost.getAccountId() );

        return payment.build();
    }

    @Override
    public PaymentResponse paymentToPaymentResponse(Payment payment) {
        if ( payment == null ) {
            return null;
        }

        PaymentResponseBuilder paymentResponse = PaymentResponse.builder();

        paymentResponse.paymentId( payment.getPaymentId() );
        paymentResponse.paymentTime( payment.getPaymentTime() );
        paymentResponse.paymentType( payment.getPaymentType() );
        paymentResponse.counterPartyName( payment.getCounterPartyName() );
        paymentResponse.amount( payment.getAmount() );
        paymentResponse.purpose( payment.getPurpose() );
        paymentResponse.category( payment.getCategory() );
        paymentResponse.accountId( payment.getAccountId() );

        return paymentResponse.build();
    }

    @Override
    public void paymentPatch(PaymentPatch paymentPatch, Payment payment) {
        if ( paymentPatch == null ) {
            return;
        }

        payment.setPaymentTime( paymentPatch.getPaymentTime() );
        payment.setPaymentType( paymentPatch.getPaymentType() );
        payment.setCounterPartyName( paymentPatch.getCounterPartyName() );
        payment.setAmount( paymentPatch.getAmount() );
        payment.setPurpose( paymentPatch.getPurpose() );
        payment.setCategory( paymentPatch.getCategory() );
    }

    @Override
    public List<PaymentResponse> paymentListToPaymentResponseList(List<Payment> paymentList) {
        if ( paymentList == null ) {
            return null;
        }

        List<PaymentResponse> list = new ArrayList<PaymentResponse>( paymentList.size() );
        for ( Payment payment : paymentList ) {
            list.add( paymentToPaymentResponse( payment ) );
        }

        return list;
    }
}
