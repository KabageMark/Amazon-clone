import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-b6543/us-central1/api' //the api url (cloud function)
})

export default instance;