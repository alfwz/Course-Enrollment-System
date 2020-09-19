//自定义axios

import axios from "axios"
export default axios.create({
    baseURL: 'http://5bbc3580-default-courseenr-858e-35771635.us-west-2.elb.amazonaws.com'
});