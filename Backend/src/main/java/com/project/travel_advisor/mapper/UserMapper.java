package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.UserDto;
import com.project.travel_advisor.entity.User;

public class UserMapper {

    public static UserDto mapToUserResponseDto(User user) {

        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getCity(),
                user.getCountry(),
                user.getImageUrl()
        );
    }
}
