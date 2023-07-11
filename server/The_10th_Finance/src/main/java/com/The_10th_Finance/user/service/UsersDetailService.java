package com.The_10th_Finance.user.service;


import com.The_10th_Finance.auth.AuthorityUtils;
import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.db.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Component
public class UsersDetailService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AuthorityUtils authorityUtils;

    public UsersDetailService(UserRepository userRepository, AuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> Ouser = userRepository.findByEmail(username);
        User user = Ouser.orElseThrow(()->new NoSuchElementException("sdaf"));
       UserAthentication userAthentication =  new UserAthentication(user);
        log.info("User Authentication: {}", userAthentication);
       return userAthentication;
    }

    public final class UserAthentication extends User implements UserDetails{


        public UserAthentication(User user) {
            setId(user.getId());
            setName(user.getName());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles());

        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthority(this.getRoles());
        }

        @Override
        public String getUsername() {
            return this.getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

        @Override
        public String toString() {
            return "UserAthentication{" +
                    "id=" + getId() +
                    ", name='" + getName() + '\'' +
                    ", email='" + getEmail() + '\'' +
                    ", roles=" + getRoles() +
                    '}';
        }

    }
}
