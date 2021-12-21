import axios from 'axios';

const AXIOS = axios.create({
    baseURL: "https://learnative-server.herokuapp.com/api",
    withCredentials: true
});



export default AXIOS;