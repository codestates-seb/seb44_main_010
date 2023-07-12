package com.The_10th_Finance.user.service;


import com.The_10th_Finance.auth.AuthorityUtils;
import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.db.UserRepository;
import com.The_10th_Finance.user.usermapper.UserMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
//    private final imageFileSystemSerive imageFileSystemSerive;

    private final UserRepository userRepository;
    private  final AuthorityUtils authorityUtils;
    private final UserMapper userMapper;

@Transactional
    public User save(User user) {
        user.setUserStates(User.UserStates.MEMBER_ACTIVE);
        user.setRoles(authorityUtils.createRoles(user.getEmail()));
        String EncodePassoword = PasswordEncoderFactories.createDelegatingPasswordEncoder().encode(user.getPassword());
        log.info("{}",EncodePassoword);
        user.setPassword(EncodePassoword);
        return userRepository.save(user);
    }



    public User findById(Long id){
        return userRepository.findById(id).orElseThrow(()->new NoSuchElementException("NO SUCH"));
    }

    public User findByEmail(String name) {
        return userRepository.findByEmail(name).orElseThrow(()->new NoSuchElementException("NO SUCH"));
    }

//    public String getAccessToken(String refreshToken) {
//        String email =jwtTokenizer.getSubjectFromToken(refreshToken);
//        log.info("{}",email);
//        User user =findByEmail(email);
//        String accessToken=jwtTokenizer.reNewToken(user);
//        return accessToken;
//    }


//    public API<List<UserResponseDto>> getAll(Pageable pageable) {
//       var list = userRepository.findAll(pageable);
//        var pagination = Pagination.builder().page(list.getNumber())
//                .size(list.getSize())
//                .currentElements(list.getNumberOfElements())
//                .totalElements(list.getTotalElements())
//                .totalPage(list.getTotalPages())
//                .build();
//        List<User> tempUser = list.getContent();
//        List<UserResponseDto> users = userMapper.listUserTolistUserResponseDto(tempUser);
//
//        return API.<List<UserResponseDto>>builder().body(users).pagination(pagination).build();
//
//    }



    }
