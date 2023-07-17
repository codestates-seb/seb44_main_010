package com.The_10th_Finance.user.model;

import com.The_10th_Finance.property.db.Property;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto  implements Serializable {

    private String name;

    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
