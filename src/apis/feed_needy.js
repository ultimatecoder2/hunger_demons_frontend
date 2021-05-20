import axios from 'axios';

const record =  axios.create({
    baseURL:'http://localhost:3001'
})
const authRecord =(token) => axios.create({
    baseURL: 'http://localhost:3001',
    headers: {'Authorization': 'Bearer '+ token}
  });
export {authRecord, record}