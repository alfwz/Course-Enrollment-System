import axios from '../axios';

export default class CourseService{
    static getAllCourses(token){
        return axios.get('/api/courses', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });

    }
    
    static getEnrolledCourses(token){
        return axios.get('/api/enrolled-courses', {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
    }

    static enrollCourse(token, courseName){
        return axios.post('/api/courses', {
            courseName
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    static withdrawCourse(token, courseName){
            return axios.delete('/api/enrolled-courses', {
                data:{
                    courseName
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    }
}