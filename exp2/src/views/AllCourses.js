import React from 'react';
import CourseTable from '../components/CourseTable'
import CourseService from '../services/CourseService';
import {TOKEN_COOKIE_NAME} from "../Constant";
import * as cookies from "react-cookies";
import NotificationDialog from "../components/NotificationDialog";

//class component
export default class AllCourses extends React.Component{
    state = {
        courses: [],
        openDialog: false,
        isSucceed: false,
        message: ''
    }

    token = cookies.load(TOKEN_COOKIE_NAME);

    //class component需要加这个bind
    constructor(props){
        super(props);
        this.enrollCourse = this.enrollCourse.bind(this);
    }

    componentDidMount(){

        CourseService.getAllCourses(this.token)
                .then(response => {
                    this.setState({
                        courses: response.data
                    })
                })
                .catch(error =>{
                    console.log(error);
                });
    }
    
    render(){
        return (
            <div>
                <CourseTable courses={this.state.courses}
                             actionButtonLabel="Enroll"
                             handleActionClick={this.enrollCourse}/>
                <NotificationDialog open={this.state.openDialog}
                                    isSucceed={this.state.isSucceed}
                                    message={this.state.message}
                                    handleClose={this.closeDialog.bind(this)} />
            </div>
        )
    }

    //当点击了enroll
    //发送xhr到后端对应的enroll course API
    //根据返回的结果(http status) 通知用户选课成功或失败
    enrollCourse(courseName){
        CourseService.enrollCourse(this.token, courseName)
            .then(response =>{
                //弹窗 成功
                this.setState({
                    openDialog: true,
                    isSucceed: true,
                    message: `Course ${courseName} enrolled successfully!`
                })
            })
            .catch(error =>{
                //弹窗 失败
                this.setState({
                    openDialog: true,
                    isSucceed: false,
                    message: `Course ${courseName} enrollment failed!`
                })
            });
    }

    closeDialog(){
        this.setState({
            openDialog: false
        })
    }
}