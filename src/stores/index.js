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
        async addEmployee(employeeData) {
            try {
                return await addEmployee(employeeData);
            } catch (error) {
                console.log('adding employee faild', error);
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
        async deleteEmployee(employeeId) {
            try {
                await deleteEmployee(employeeId);
            } catch (error) {
                console.log('employee is not deleted!', error);
            }
        },
        async updateEmployee(employeeId, employeeData) {
            try {
                const response = await updateEmployee(employeeId, employeeData);
                console.log(response.data);
            } catch (error) {
                console.log('employee is not updated!', error);
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