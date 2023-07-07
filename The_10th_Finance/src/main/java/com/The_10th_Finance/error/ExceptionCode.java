package com.The_10th_Finance.error;

import lombok.Getter;

public enum ExceptionCode {
    USERNOTFOUND(404, "Member Not Found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
