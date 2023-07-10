package com.The_10th_Finance.user.usermapper;


import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.model.UserPostDto;
import com.The_10th_Finance.user.model.UserResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToUser(UserPostDto userPostDto);
    UserResponseDto userToUserResponseDto(User user);

    List<UserResponseDto> listUserTolistUserResponseDto(List<User> user);
}
