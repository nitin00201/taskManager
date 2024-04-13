package com.nitin.controller;

import com.nitin.model.User;
import com.nitin.repository.UserRepository;
import com.nitin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt){
        User user =userService.getUserProfile(jwt);
        System.out.println("user----------------------------------------------------");
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/allProfiles")
    public ResponseEntity<List<User>> getUsers(@RequestHeader("Authorization") String jwt){
        List<User> allUsers= userService.getAllUsers();
        return new ResponseEntity<>(allUsers,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);

    }
}
