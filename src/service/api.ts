import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 10000
})