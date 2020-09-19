package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Course;
import lombok.Data;

//POJO - plain old java object
@Data
public class CourseDto {
    private String courseName;
    private String courseLocation;
    private String courseContent;
    private Long teacherId;

    public CourseDto(String courseName, String courseLocation, String courseContent, Long teacherId) {
        this.courseName = courseName;
        this.courseLocation = courseLocation;
        this.courseContent = courseContent;
        this.teacherId = teacherId;
    }

    public static Builder builder(){
        return new Builder();
    }

    //design pattern builder
    public static class Builder{
        private String courseName;
        private String courseLocation;
        private String courseContent;
        private Long teacherId;

        public Builder courseName(String courseName){
            this.courseName = courseName;
            return this;
        }

        public Builder courseLocation(String courseLocation){
            this.courseLocation = courseLocation;
            return this;
        }

        public Builder courseContent(String courseContent){
            this.courseContent=courseContent;
            return this;
        }

        public Builder teacherId(Long teacherId){
            this.teacherId = teacherId;
            return this;
        }

        public CourseDto build(){
            return new CourseDto(courseName, courseLocation, courseContent, teacherId);
        }
    }
}
