import Vue from 'vue';
import { defineStore } from 'pinia';
import { addEmployee, fetchEmployees, fetchEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';
export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        employees: [],
        employee: null,
    }),
    actions: {
        async fetchEmployees() {
            try {
                const response = await fetchEmployees();
                this.employees = response.data;
                console.log(this.employees);
            } catch (error) {
                console.log('fetch employees faild', error);
                throw error;
            }
        },
        async fetchEmployee(employeeId) {
            try {
                const response = await fetchEmployee(employeeId);
                this.employee = response.data;
                return this.employee;
            } catch (error) {
                console.log('fetch single employee faild', error);
                throw error;
            }
        },
        async addEmployee(employeeData) {
            return await addEmployee(employeeData);
        },
        async deleteEmployee(employeeId) {
            await deleteEmployee(employeeId);
        },
        async updateEmployee(employeeId, employeeData) {
            await updateEmployee(employeeId, employeeData);
        }
    },
    getters: {
        getEmployees(state) {
            return state.employees;
        },
        getEmployee(state) {
            return state.employee;
        }
    }
});