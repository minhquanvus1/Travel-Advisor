package com.project.travel_advisor.service.user;

import com.project.travel_advisor.dto.UserDto;
import com.project.travel_advisor.entity.User;

import java.util.List;

public interface UserService {

    UserDto createAUser(User user);

    UserDto findUserById(Long id);

    List<UserDto> findAllUsers();

    UserDto updateAnUser(Long id, User user);

    void deleteUserById(Long id);
}
