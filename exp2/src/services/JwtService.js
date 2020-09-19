//自己的axios
import axios from '../axios';

export const JwtService ={
    login: function (username, password){
        return axios.post('/api/authenticate', {
            username,
            password
        });
    }
}