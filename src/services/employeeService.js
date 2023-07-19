import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const headers = {
    authorization: token,
};

export function addEmployee(employeeData) {
    return axios.post(apiUrl, employeeData, { headers });
}
export function fetchEmployees() {
    return axios.get(apiUrl, { headers });
}

export function fetchEmployee(employeeId) {
    return axios.get(`${apiUrl + '/' + employeeId}`, { headers });
}

export function updateEmployee(employeeId, employeeData) {
    return axios.put(`${apiUrl + '/' + employeeId}`, employeeData, { headers });
}

export function deleteEmployee(employeeId) {
    return axios.delete(`${apiUrl + '/' + employeeId}`, { headers });
}