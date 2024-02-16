import axios from 'axios'

export const getAllWorkers =()=>{
    return axios.get('/http://127.0.0.1:8000/api/workers/')
}
