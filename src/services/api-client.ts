import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'c366fdbfdc5d47c697c6211e19273dae'
    }
})