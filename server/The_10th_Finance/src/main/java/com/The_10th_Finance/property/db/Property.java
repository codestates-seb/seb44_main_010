package com.The_10th_Finance.property.db;

import com.The_10th_Finance.user.db.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "property")
@Table(name = "property")
public class Property implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id", nullable = false, unique = true)
    private Long propertyId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "property_type", nullable = false)
    private String propertyType;

    @Column(name = "user_id", nullable = false)
    private Long userId;

//    public enum PropertyType{
//        CAR("자동차"),
//        CASH("현금"),
//        REALESTATE("부동산");
//
//        private String type;
//
//        PropertyType(String type) {
//            this.type = type;
//        }
//    }
}
