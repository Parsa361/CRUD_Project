import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const headers = {
    authorization: token,
};

export async function addEmployee(employeeData) {
    try {
        const response = await axios.post(apiUrl, employeeData, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}
export async function fetchEmployees() {
    try {
        const response = await axios.get(apiUrl, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function fetchEmployee(employeeId) {
    try {
        const response = await axios.get(`${apiUrl + '/' + employeeId}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function updateEmployee(employeeId, employeeData) {
    try {
        const response = await axios.put(`${apiUrl + '/' + employeeId}`, employeeData, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export async function deleteEmployee(employeeId) {
    try {
        const response = await axios.delete(`${apiUrl + '/' + employeeId}`, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}