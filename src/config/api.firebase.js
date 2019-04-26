import * as axios from 'axios';

const apiFirebase = axios.create({
  baseURL: 'https://todo-r-c17.firebaseio.com/'
})

export default apiFirebase;