package com.The_10th_Finance.user.db;

import com.The_10th_Finance.accounts.db.Accounts;
import com.The_10th_Finance.audit.Audit;

import lombok.*;

import javax.persistence.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "users")
@Table(name = "users")

public class User extends Audit implements Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true, updatable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Lob
    @Column(name = "profile")
    private byte[] profile;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_states", nullable = false)
    private UserStates userStates;



    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "roles")
    private List<String> roles = new ArrayList<>();



    public enum UserStates{
        MEMBER_ACTIVE("활동중"),
        MEMBER_HUMAN("휴먼계정"),
        MEMBER_DELETED("삭제됨");

        @Getter
        private String states;

        UserStates(String states) {
            this.states = states;
        }
    }

    public enum UserRole {
        ROLE_USER,
        ROLE_ADMIN
    }


}
