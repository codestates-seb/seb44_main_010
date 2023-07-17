package com.The_10th_Finance.response;

import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.pagenation.Pagination;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Getter
@Setter
public class Response{

    @Getter
    @Setter
    @AllArgsConstructor
    public static class SuccessResponse<T> implements Serializable {
        private T data;
        private HttpStatus states;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class ErrorResponse {
        private BusinessLogicException businessLogicException;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class API<t> {
        private  t body ;
        private Pagination pagination;
    }
}
