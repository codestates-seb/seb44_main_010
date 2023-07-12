package com.The_10th_Finance.pagenation;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class API<t> {
    private  t body ;
    private Pagination pagination;
}
