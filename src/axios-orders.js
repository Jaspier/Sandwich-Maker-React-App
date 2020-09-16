import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sandwich-maker-44d7c.firebaseio.com/'
});

export default instance;