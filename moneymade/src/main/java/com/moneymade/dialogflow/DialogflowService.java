package com.moneymade.dialogflow;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class DialogflowService {

    private final SessionsClient sessionsClient;
    private final String projectId;

    public DialogflowService(@Value("${dialogflow.project-id}") String projectId,
                             @Value("${dialogflow.credentials-file}") String credentialsFile) throws IOException {
        this.projectId = projectId;

        Credentials credentials = GoogleCredentials.fromStream(
                new FileInputStream(credentialsFile)
        );

        sessionsClient = SessionsClient.create(SessionsSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build());
    }

    public QueryResult detectIntent(String sessionId, String query) {
        SessionName session = SessionName.of(projectId, sessionId);
        TextInput.Builder textInput = TextInput.newBuilder().setText(query).setLanguageCode("en-US");
        QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();

        DetectIntentResponse response = sessionsClient.detectIntent(session, queryInput);
        return response.getQueryResult();
    }

    // 다른 메소드들...

}
