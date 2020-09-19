package com.mycompany.myapp.domain;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="user_course")
public class UserCourse {
    public UserCourse(){

    }

    public UserCourse(User user, Course course){
        this.user=user;
        this.course=course;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @JoinColumn(name ="user_id", referencedColumnName = "id") //Foreign key
    @ManyToOne
    private User user;

    @JoinColumn(name ="course_id", referencedColumnName = "id")
    @ManyToOne
    private Course course;
}
