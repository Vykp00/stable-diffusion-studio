import axios from 'axios'

// Sett withCredentials on $axios before creating instance
axios.defaults.withCredentials = true

const HTTP = axios.create({
    withCredentials: true
})

export default HTTP