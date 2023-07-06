<template>
    <!-- container for entire form -->
    <div class="relative mt-10 border-2 rounded-sm px-8 py-2 w-[748px] dark:bg-gray-800 dark:border-gray-700"
        :class="{ 'mt-0 bg-white': isEditingForm }">

        <p v-if="!isEditingForm" class="font-medium text-2xl absolute top-[-20px] right-6 bg-gray-50 px-4">
            افزودن کارمند
        </p>
        <!-- Removing employee component -->
        <div v-if="isEditingForm" class="my-10 flex justify-end" :class="{ 'my-2': isEditingForm }">
            <RemovingEmployee :singleEmployeeId="singleEmployee.id" @employee-removed="employeeRemoved" />
        </div>

        <!-- Employee Form -->
        <form @submit.prevent="submitForm" class="mt-4">

            <!-- employee's personal information form -->
            <PersonalForm :employee="employee" :firstNameErrorMsg="firstNameErrorMsg" :lastNameErrorMsg="lastNameErrorMsg"
                :emailErrorMsg="emailErrorMsg" />

            <!-- inner section, family members of employee -->
            <div class="relative mt-10 border-2 rounded-sm px-8 py-6 w-[680px] dark:bg-gray-800 dark:border-gray-700">
                <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-[#F9FAFB] px-4">
                    اعضای خانواده
                </p>

                <!-- employee's Family members form -->
                <FamilyMembersForm :employeeFamily="employee.family" />
            </div>

            <!-- BaseButton container for submiting form or canceling it -->
            <FormButtons :isEditingForm="isEditingForm" @cancel-add-employee="cancelAdding"
                @employee-updated="updateInformation" @submit-form="submitForm" />
        </form>
        <div v-if="employeeIsAdded" class="text-lg text-red-500 flex justify-center">{{ employeeIsAdded }}</div>
    </div>
</template>

<script>
import PersonalForm from './PersonalForm.vue';
import FamilyMembersForm from './FamilyMembersForm.vue';
import BaseButton from './BaseButton.vue';
import RemovingEmployee from './RemovingEmployee.vue';
import FormButtons from './FormButtons.vue';
import { addEmployee, updateEmployee } from '../services/employeeService.js';

export default {
    name: 'EmployeesForm',
    props: ['isShowingForm', 'isEditingForm', 'singleEmployee'],
    data() {
        return {
            employee: {
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: "",
                family: [
                    {
                        firstname: "",
                        lastname: "",
                        dateOfBirth: "",
                        relation: ""
                    }
                ]
            },
            emailErrorMsg: '',
            firstNameErrorMsg: '',
            lastNameErrorMsg: '',
            employeeIsAdded: ''
        };
    },
    computed: {
        isEmailValid() {
            return this.validateEmail(this.employee.email);
        }
    },
    // This watcher is for handling the employee editing mode and
    // it is updating the employee data with singleEmployee data came from EmployeeList
    watch: {
        singleEmployee: {
            immediate: true,
            deep: true,
            handler(newSingleEmployee) {
                if (newSingleEmployee) {
                    this.employee = {
                        firstName: newSingleEmployee.firstName || '',
                        lastName: newSingleEmployee.lastName || '',
                        email: newSingleEmployee.email || '',
                        dateOfBirth: newSingleEmployee.dateOfBirth || '',
                        family: newSingleEmployee.family || [],
                    };
                }
            },
        },
    },
    methods: {
        validateEmail(email) {
            // Email validation logic
            const emailRegex = /^\S+@\S+\.\S+$/;
            return emailRegex.test(email);
        },

        validateForm() {
            let isValid = true;

            if (!this.employee.firstName) {
                this.firstNameErrorMsg = 'نام را وارد کنید.';
                isValid = false;
            }

            if (!this.employee.lastName) {
                this.lastNameErrorMsg = 'نام خانوادگی را وارد کنید.';
                isValid = false;
            }

            if (!this.isEmailValid) {
                this.emailErrorMsg = 'ایمیل صحیح نیست.';
                isValid = false;
            }

            return isValid;
        },
        async submitForm() {
            this.firstNameErrorMsg = '';
            this.lastNameErrorMsg = '';
            this.emailErrorMsg = '';
            this.employeeIsAdded = '';

            const isValid = this.validateForm();

            if (!isValid) {
                return;
            }

            try {
                await this.submitFormHandler();
                this.cancelAdding();
                this.$emit('new-employee-list');
            } catch (error) {
                console.error('Error adding employee:', error);
                this.employeeIsAdded = 'کارمند اضافه نشد, مشکلی رخ داده است.';
            }
        },
        async submitFormHandler() {
            this.joinFamilyMemberName();
            const response = await addEmployee(this.employee);
            console.log('employee is added: ', response);
            return response;
        },
        emitNewEmployeeList() {
            this.$emit('new-employee-list');
        },
        // This function does make the employee.family.name from firstname-lastname
        joinFamilyMemberName() {
            this.employee.family.forEach((familyMember) => {
                familyMember.name = `${familyMember.firstname}-${familyMember.lastname}`;
                // delete the firstname, lastname properties from employee data
                delete familyMember.firstname;
                delete familyMember.lastname;
            });
        },

        cancelAdding() {
            this.$emit('cancel-add-employee');
        },

        async updateInformation() {
            try {
                this.joinFamilyMemberName();
                await updateEmployee(this.singleEmployee.id, this.employee);
                this.$emit('employee-updated');
            } catch (error) {
                console.log('Error updating employee:', error);
                return;
            }
        },
        employeeRemoved() {
            this.$emit('employee-removed');
        }
    },
    components: { BaseButton, RemovingEmployee, PersonalForm, FamilyMembersForm, FormButtons },
};
</script>

<style scoped>
.custom-input:focus {
    outline: none;
    border-color: #cbd5e0;
}
</style>