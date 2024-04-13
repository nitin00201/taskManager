package com.nitin.controller;

import com.nitin.modal.Submission;
import com.nitin.modal.UserDto;
import com.nitin.service.SubmissionService;
import com.nitin.service.TaskService;
import com.nitin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
    @Autowired
    private SubmissionService submissionService;
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;
    @PostMapping()
    public ResponseEntity<Submission>submitTask(
            @RequestParam Long taskId,
            @RequestParam String githubLink,
            @RequestHeader ("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        Submission submission = submissionService.submitTask(taskId,githubLink, user.getId(), jwt);
        return new ResponseEntity<>(submission, HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission>getSubmissionById(
            @PathVariable Long id,
            @RequestHeader ("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        Submission submission = submissionService.getTaskSubmissionById(id);
        return new ResponseEntity<>(submission, HttpStatus.CREATED);

    }
    @GetMapping()
    public ResponseEntity<List<Submission>>getAllSubmissions(
            @RequestHeader ("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        List<Submission> submission = submissionService.getAllTaskSubmissions();
        return new ResponseEntity<>(submission, HttpStatus.CREATED);

    }
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>>getAllSubmissions(
            @PathVariable Long taskId,
            @RequestHeader ("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        List<Submission> submission = submissionService.getTaskSubmissionByTaskId(taskId);
        return new ResponseEntity<>(submission, HttpStatus.CREATED);

    }
    @PutMapping("/{id}")
    public ResponseEntity<Submission>acceptOrDeclineSubmission(
            @PathVariable Long id,
            @RequestParam("status") String status,
            @RequestHeader ("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        Submission submission = submissionService.acceptDeclineSubmission(id,status);
        return new ResponseEntity<>(submission, HttpStatus.CREATED);

    }

}
