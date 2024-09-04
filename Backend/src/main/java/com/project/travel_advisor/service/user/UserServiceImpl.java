package com.project.travel_advisor.service.user;

import com.project.travel_advisor.dto.UserDto;
import com.project.travel_advisor.entity.User;
import com.project.travel_advisor.exception.BadRequestException;
import com.project.travel_advisor.exception.ResourceNotFoundException;
import com.project.travel_advisor.mapper.UserMapper;
import com.project.travel_advisor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public UserDto createAUser(User user) {

        userRepository.findBySubject(user.getSubject()).ifPresent((foundUser) -> {throw new BadRequestException("This User with Subject " + user.getSubject() + " already exists");});

        if(user.getSubject() == null) {
            throw new BadRequestException("User Subject must be provided");
        }

        User savedUser = userRepository.save(user);

        return UserMapper.mapToUserResponseDto(savedUser);
    }

    @Override
    public UserDto findUserById(Long id) {

        User foundUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This User with id " + id + " does not exist"));

        return UserMapper.mapToUserResponseDto(foundUser);
    }

    @Override
    public List<UserDto> findAllUsers() {

        List<User> allUsers = userRepository.findAll();

        return allUsers.stream().map(UserMapper::mapToUserResponseDto).toList();
    }

    @Override
    public UserDto updateAnUser(Long id, User user) {

        User foundUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This User with id " + id + " does not exist"));

        if(user.getSubject() != null) {
            throw new BadRequestException("User Subject can not be update");
        }

        foundUser.setFirstName(user.getFirstName());
        foundUser.setLastName(user.getLastName());
        foundUser.setCountry(user.getCountry());
        foundUser.setCity(user.getCity());
        foundUser.setImageUrl(user.getImageUrl());

        return UserMapper.mapToUserResponseDto(userRepository.save(foundUser));
    }

    @Override
    public void deleteUserById(Long id) {

        User foundUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This User with id " + id + " does not exist"));

        foundUser.getAttractionReviews().clear();

        userRepository.deleteById(id);

    }
}
