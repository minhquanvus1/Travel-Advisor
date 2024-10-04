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
    public UserDto createAUser(UserDto userDto, String subject) {

        if(subject == null) {
            throw new BadRequestException("User Subject must be provided");
        }

        userRepository.findBySubject(subject).ifPresent((foundUser) -> {throw new BadRequestException("This User with Subject " + subject + " already exists");});

        User mappedUser = UserMapper.mapToUser(userDto);
        mappedUser.setSubject(subject);
        User savedUser = userRepository.save(mappedUser);

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
    public UserDto findUserBySubject(String subject) {

        User foundUser = userRepository.findBySubject(subject).orElseThrow(() -> new ResourceNotFoundException("This User with subject " + subject + " does not exist in database"));

        return UserMapper.mapToUserResponseDto(foundUser);
    }

    @Override
    public UserDto updateAnUser(Long id, UserDto userDto) {

        User foundUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This User with id " + id + " does not exist"));

        User mappedUser = UserMapper.mapToUser(userDto);

        if(mappedUser.getSubject() != null) {
            throw new BadRequestException("User Subject can not be update");
        }

        foundUser.setFirstName(mappedUser.getFirstName());
        foundUser.setLastName(mappedUser.getLastName());
        foundUser.setCountry(mappedUser.getCountry());
        foundUser.setCity(mappedUser.getCity());
        foundUser.setImageUrl(mappedUser.getImageUrl());

        return UserMapper.mapToUserResponseDto(userRepository.save(foundUser));
    }

    @Override
    public void deleteUserById(Long id) {

        User foundUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("This User with id " + id + " does not exist"));

        foundUser.getAttractionReviews().clear();

        foundUser.getTourBookings().clear();

        foundUser.getNotifications().clear();

        userRepository.deleteById(id);

    }
}
