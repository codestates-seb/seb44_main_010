package com.The_10th_Finance.dialogflow;

import com.google.cloud.dialogflow.v2.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DialogflowController {

    private final DialogflowService dialogflowService;
    private final String sessionId; // 세션 ID

    @Autowired
    public DialogflowController(DialogflowService dialogflowService, @Value("${dialogflow.session-id}") String sessionId) {
        this.dialogflowService = dialogflowService;
        this.sessionId = sessionId;
    }

    @PostMapping("/dialogflow")
    public String handleDialogflowRequest(@RequestBody String query) {
        QueryResult queryResult = dialogflowService.detectIntent(sessionId, query);
        return queryResult.getFulfillmentText();
    }

}
