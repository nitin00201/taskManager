package com.nitin.controller;

import com.nitin.model.Task;
import com.nitin.model.TaskStatus;
import com.nitin.model.UserDto;
import com.nitin.service.TaskService;
import com.nitin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/home")
@RestController
public class HomeController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;
    @GetMapping("/tasks")
    public ResponseEntity<String> getAssignedUsersTask() throws Exception {


        return new ResponseEntity<>("welcome to task service", HttpStatus.OK);
    }

}
