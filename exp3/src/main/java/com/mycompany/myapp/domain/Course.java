package com.mycompany.myapp.domain;

import lombok.Data;

import javax.persistence.*;
//绑orm
@Entity
@Table(name = "course")
@Data
public class Course {
    @Id //Primary key
    @GeneratedValue //auto increment
    @Column(name = "id")
    private Long id;

    @Column(name = "course_name")
    private String courseName; //camel case

    @Column(name = "course_location")
    private String courseLocation; //camel case

    @Column(name = "course_Content")
    private String courseContent; //camel case

    @Column(name = "teacher_id")
    private Long teacherId;
}
