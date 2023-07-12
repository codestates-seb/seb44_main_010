
package com.The_10th_Finance.config;



import com.The_10th_Finance.auth.AuthorityUtils;
import com.The_10th_Finance.handler.MemberAuthenticationFailureHandler;
import com.The_10th_Finance.handler.MemberAuthenticationSuccessHandler;
import com.The_10th_Finance.jwt.JwtAuthenticationFilter;
import com.The_10th_Finance.jwt.JwtTokenizer;
import com.The_10th_Finance.jwt.JwtVerificationFilter;
import com.The_10th_Finance.user.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final AuthorityUtils authorityUtils;
    private final UserService userService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, AuthorityUtils authorityUtils, UserService userService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userService = userService;
    }

    //Oauth2 프로젝트 ID와 비밀번호
//    @Value("${spring.security.oauth2.client.registration.google.clientId}")
//    private String clientId;
//
//    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
//    private String clientSecret;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.
                headers().frameOptions().sameOrigin() // (1)
                .and()
                .csrf().disable()        // (2)
                .cors(cors -> cors
                        .configurationSource(request -> {
                            CorsConfiguration configuration = new CorsConfiguration();
                            configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
                            configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE","OPTIONS")); // 특정 HTTP 메서드 허용
                            configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 헤더 허용
//                            configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type", "Refresh"));
                            configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));
                            configuration.setAllowCredentials(true);
                            configuration.setExposedHeaders(Arrays.asList("Access-Control-Allow-Origin",
                                    "Access-Control-Allow-Methods",
                                    "Access-Control-Allow-Headers")); // CORS 관련 헤더 포함
                            return configuration;
                        }))
//                .cors().disable()
//                .and()
                .formLogin().disable()   // (4)
                .httpBasic().disable()   // (5)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
//                .oauth2Login(oauth2 -> oauth2
//                .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, userService)))
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/{accesstocken}/{refreshtocken}","/api/v1/chat-gpt/question").permitAll()
                        .antMatchers("/payment/complete","/payment/sum","/account/post","/main/{userId}/{Month}").permitAll()
                        .antMatchers("/user/profile","/user/captcha","/user/sign-up","/user/login","/user/RefreshToken").permitAll()
                        .antMatchers("/user/emailConfirm","/property/post").permitAll()
                        .antMatchers("/oauth2/authorization/google","oauth2/authorization/github").permitAll()
                        .antMatchers("/login/oauth2/code/google","/oauth2/authorization/github").permitAll()
                        .antMatchers("/h2-console/**","/login/error").permitAll()
                        .antMatchers("/user/mypage").hasRole("USER")
//                        .antMatchers(HttpMethod.OPTIONS,"/**").permitAll() // OPTIONS 요청 허
                        .anyRequest().authenticated())
                .apply(new CustomFilterConfigurer());
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }



    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // (3) 추가
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());  // (4) 추가// (2-5)

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);  // (2) 추가

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);  // (2-6)

        }
    }
}



