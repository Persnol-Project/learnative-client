import axios from 'axios';

const AXIOS = axios.create({
    baseURL: "https://learnative-server.herokuapp.com",
    withCredentials: true
});



export default AXIOS;