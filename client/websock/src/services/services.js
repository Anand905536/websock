import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:4000/api"
})

export const register = (name, email, password, address, phoneNumber) => {
    return api.post('/auth/register',
        {
            name: name,
            email: email,
            password: password,
            address: address,
            phoneNumber: phoneNumber
        })
}

export const login = (email, password) => {
    return api.post('/auth/login',
        {
            email: email,
            password: password
        }
    )
}