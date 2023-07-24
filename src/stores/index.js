import Vue from 'vue';
import { defineStore } from 'pinia';
import { addEmployee, fetchEmployees, fetchEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';
export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        employees: [],
        employee: null,
        singleEmployeeLoading: false,
        employeesLoading: false
    }),
    actions: {
        async fetchEmployees() {
            try {
                this.employeesLoading = true;
                const response = await fetchEmployees();
                this.employees = response.data;
                console.log(this.employees);
            } catch (error) {
                console.log('fetch employees faild', error);
            } finally {
                this.employeesLoading = false;
            }
        },
        async fetchEmployee(employeeId) {
            try {
                this.singleEmployeeLoading = true;
                const response = await fetchEmployee(employeeId);
                this.employee = response.data;
                return this.employee;
            } catch (error) {
                console.log('fetch single employee faild', error);
                throw error;
            } finally {
                this.singleEmployeeLoading = false;
            }
        },
        async addEmployee(employeeData) {
            return await addEmployee(employeeData);
        },
        async deleteEmployee(employeeId) {
            await deleteEmployee(employeeId);
        },
        async updateEmployee(employeeId, employeeData) {
            const response = await updateEmployee(employeeId, employeeData);
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