package com.The_10th_Finance.user.service;


import com.The_10th_Finance.auth.AuthorityUtils;
import com.The_10th_Finance.error.BusinessLogicException;
import com.The_10th_Finance.error.ExceptionCode;
import com.The_10th_Finance.pagenation.API;
import com.The_10th_Finance.pagenation.Pagination;
import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.db.UserRepository;
import com.The_10th_Finance.user.model.UserResponseDto;
import com.The_10th_Finance.user.usermapper.UserMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;
import java.util.NoSuchElementException;


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
        user.setUserId(1L);
        user.setPassword(EncodePassoword);
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)

    public User findById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }
    @Transactional(readOnly = true)
    public User findByEmail(String name) {
        return userRepository.findByEmail(name).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }


    @Transactional(readOnly = true)
    public User findByUserId(Long userid) {
        return userRepository.findByUserId(userid).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOSUCHFOUND));
    }

    @Transactional(readOnly = true)
    public API<List<UserResponseDto>>findAll(Pageable pageable) {
        var list =  userRepository.findAll((org.springframework.data.domain.Pageable) pageable);
        var page = Pagination.builder().page(list.getNumber())
                .size(list.getSize())
                .currentElements(list.getNumberOfElements())
                .totalElements(list.getTotalElements())
                .totalPage(list.getTotalPages())
                .build();
        List<User> UserList = list.getContent();
        List<UserResponseDto> questions = userMapper.listUserTolistUserResponseDto(UserList);
        var api = API.<List<UserResponseDto>>builder().body(questions).pagination(page).build();
        return api;
    }

    @Transactional(readOnly = true)
    public List<User>findAll2() {
        var list =  userRepository.findAll();
        return list;
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
