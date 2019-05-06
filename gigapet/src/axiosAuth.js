import axios from 'axios';

//Function for setting up our headers for requests to protected endpoints

export default function() {
    const token = localStorage.getItem('token');

    return axios.create({
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    })
}
