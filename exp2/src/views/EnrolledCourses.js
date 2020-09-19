import React, { useState, useEffect } from 'react';
import CourseTable from '../components/CourseTable';
import CourseService from '../services/CourseService';
import {TOKEN_COOKIE_NAME} from "../Constant";
import * as cookies from "react-cookies";
import NotificationDialog from "../components/NotificationDialog";

//function component
export default function EnrolledCourses(){
    const [courses, setCourses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isSucceed, setSucceed] = useState(false);
    const [message, setMessage] = useState('')
    const token = cookies.load(TOKEN_COOKIE_NAME);

    useEffect(()=>{
        CourseService.getEnrolledCourses(token)
                .then(response => {
                    // this.setState({
                    //     courses: response.data
                    // })
                    setCourses(response.data);
                })
                .catch(error =>{
                    console.log(error);
                });
    }, []);

    return(
        <div>
            <CourseTable courses={courses}
                         actionButtonLabel="Withdraw"
                         handleActionClick={withdrawCourse}/>
            <NotificationDialog open={openDialog}
                                isSucceed={isSucceed}
                                message={message}
                                handleClose={closeNotificationDialog} />
        </div>
    );

    function withdrawCourse(courseName){
        CourseService.withdrawCourse(token, courseName)
            .then(response => {
                setOpenDialog(true);
                setSucceed(true);
                setMessage(`Course ${courseName} withdraw successfully!`)
            })
            .catch(error => {
                setOpenDialog(true);
                setSucceed(false);
                setMessage(`Course ${courseName} withdraw failed!`)
            });
    }

    function closeNotificationDialog(){
        setOpenDialog(false);
        window.location.reload();
    }
}