package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.CourseService;
import com.mycompany.myapp.service.dto.CourseDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/api")
public class CourseController {

    private CourseService courseService;
    //spring 传进来一个course service bean
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping(path = "/courses")
    //DTO - Data transfer object 前段和controller交互
    public List<CourseDto> getAllCourses(){
        return courseService.getAllCourses();
    }

    @PostMapping(path = "/courses")
    public void enrollCourse(@RequestBody CourseDto courseDto){
        String courseName = courseDto.getCourseName();
        if(courseName == null){
            throw new IllegalArgumentException("Course name cannot be null!");
        }
        courseService.enrollCourse(courseName, getUserName());
    }

    @DeleteMapping(path = "/enrolled-courses")
    public void withdrawCourses(@RequestBody CourseDto courseDto){
        String courseName = courseDto.getCourseName();
        if(courseName == null){
            throw new IllegalArgumentException("Course name cannot be null!");
        }
        courseService.withdrawCourse(courseName, getUserName());
    }
    @GetMapping(path = "/enrolled-courses")
    public List<CourseDto> getEnrolledCourses(){
        return courseService.getEnrolledCourses(getUserName());
    }

    private String getUserName(){
        String userName;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails){
            userName = ((UserDetails)principal).getUsername();
        }else{
            userName=principal.toString();
        }
        return userName;
    }

}
