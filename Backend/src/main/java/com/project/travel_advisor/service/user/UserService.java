package com.project.travel_advisor.service.user;

import com.project.travel_advisor.dto.UserDto;
import com.project.travel_advisor.entity.User;

import java.util.List;

public interface UserService {

    UserDto createAUser(UserDto userDto, String subject);

    UserDto findUserById(Long id);

    List<UserDto> findAllUsers();

    UserDto findUserBySubject(String subject);

    UserDto updateAnUser(Long id, UserDto userDto);

    void deleteUserById(Long id);
}
