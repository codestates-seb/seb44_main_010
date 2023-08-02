package com.The_10th_Finance.error;

import lombok.Getter;

public enum ExceptionCode {
    NOSUCHFOUND(404, "Member Not Found"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error"),
    NOTYPE(500,"THERES NO TYPE");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
