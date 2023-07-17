package com.The_10th_Finance.user.usermapper;

import com.The_10th_Finance.user.db.User;
import com.The_10th_Finance.user.db.User.UserBuilder;
import com.The_10th_Finance.user.model.UserPostDto;
import com.The_10th_Finance.user.model.UserResponseDto;
import com.The_10th_Finance.user.model.UserResponseDto.UserResponseDtoBuilder;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-10T14:23:47+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(UserPostDto userPostDto) {
        if ( userPostDto == null ) {
            return null;
        }

        UserBuilder user = User.builder();

        user.name( userPostDto.getName() );
        user.email( userPostDto.getEmail() );
        user.password( userPostDto.getPassword() );

        return user.build();
    }

    @Override
    public UserResponseDto userToUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDtoBuilder userResponseDto = UserResponseDto.builder();

        userResponseDto.name( user.getName() );
        userResponseDto.email( user.getEmail() );
        userResponseDto.createdAt( user.getCreatedAt() );
        userResponseDto.updatedAt( user.getUpdatedAt() );

        return userResponseDto.build();
    }

    @Override
    public List<UserResponseDto> listUserTolistUserResponseDto(List<User> user) {
        if ( user == null ) {
            return null;
        }

        List<UserResponseDto> list = new ArrayList<UserResponseDto>( user.size() );
        for ( User user1 : user ) {
            list.add( userToUserResponseDto( user1 ) );
        }

        return list;
    }
}
