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
                this.employeesLoading = false;
                this.employees = response.data;
                console.log(this.employees);
            } catch (error) {
                console.log('fetch employees faild', error);
                this.employeesLoading = false;
            }
        },
        async addEmployee(employeeData) {
            try {
                this.employeesLoading = true;
                await addEmployee(employeeData);
                await fetchEmployees();
            } catch (error) {
                console.log('adding employee faild', error);
                this.isLoading = false;
            }
        },
        async fetchEmployee(employeeId) {
            try {
                this.singleEmployeeLoading = true;
                const response = await fetchEmployee(employeeId);
                this.singleEmployeeLoading = false;
                this.employee = response.data;
            } catch (error) {
                console.log('fetch single employee faild', error);
                this.singleEmployeeLoading = false;
            }
        },
        async deleteEmployee(employeeId) {
            try {
                this.employeesLoading = true;
                await deleteEmployee(employeeId);
                await fetchEmployees();
            } catch (error) {
                console.log('employee is not deleted!', error);
                this.employeesLoading = false;
            }
        },
        async updateEmployee(employeeId, employeeData) {
            try {
                this.employeesLoading = true;
                const response = await updateEmployee(employeeId, employeeData);
                console.log(response.data);
                await fetchEmployees();
            } catch (error) {
                console.log('employee is not updated!', error);
                this.employeesLoading = false;
            }
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