import axios from "axios";
const baseURL = 'http://localhost:3001/api/persons'

const addNewPerson = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id, person) => {
    const request = axios.delete(`${baseURL}/${id}`, person)
    return request.then(response => response.data)
}

const changePhoneNumber = (id, person) => {
    const request = axios.put(`${baseURL}/${id}`, person)
    return request.then(response => response.data)
}

export default {addNewPerson, deletePerson, changePhoneNumber}
