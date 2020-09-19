package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.UserCourse;
import com.mycompany.myapp.repository.CourseRepository;
import com.mycompany.myapp.repository.UserCourseRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.dto.CourseDto;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    private CourseRepository courseRepository;
    private UserCourseRepository userCourseRepository;
    private UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, UserCourseRepository userCourseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userCourseRepository = userCourseRepository;
        this.userRepository = userRepository;
    }

    public List<CourseDto> getAllCourses() {
        List<Course> courses  =courseRepository.findAll();
        return courses.stream()
            .map(course -> convert(course))
            .collect(Collectors.toList());
    }

    public void enrollCourse(String courseName, String userName){
        UserCourse userCourse = getUserCourse(courseName, userName);
        userCourseRepository.findFirstByCourseAndUser(userCourse.getCourse(), userCourse.getUser())
            .ifPresent((existingCourse) ->{
                throw new IllegalArgumentException("Course already enrolled");
        });

        userCourseRepository.save(userCourse);
    }

    //去数据库看下课程和用户都存在
    private UserCourse getUserCourse(String courseName, String userName){
        Course course = courseRepository.findByCourseName(courseName)
            .orElseThrow(() -> new IllegalArgumentException("Course not found!"));
        User user = userRepository.findOneByLogin(userName)
            .orElseThrow(() -> new UsernameNotFoundException("User name not found"));
        return new UserCourse(user, course);
    }

    //复用course -> course dto转换
    private CourseDto convert(Course course){
        return CourseDto.builder()
            .courseName(course.getCourseName())
            .courseContent(course.getCourseContent())
            .courseLocation(course.getCourseLocation())
            .teacherId(course.getTeacherId())
            .build();
    }

    public List<CourseDto> getEnrolledCourses(String userName) {
        User user = userRepository.findOneByLogin(userName)
            .orElseThrow(() -> new UsernameNotFoundException("User name not found"));
        List<UserCourse> userCourses = userCourseRepository.findAllByUser(user);
        return userCourses.stream()
            .map(userCourse -> userCourse.getCourse())
            .map(course -> convert(course))
            .collect(Collectors.toList());
    }

    public void withdrawCourse(String courseName, String userName) {
        UserCourse userCourse = getUserCourse(courseName, userName);
        userCourseRepository.deleteByUserAndCourse(userCourse.getUser(), userCourse.getCourse());
    }
}
