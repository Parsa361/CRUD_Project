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
            <!-- employee's personal information fields -->
            <div class="flex flex-wrap justify-between">
                <!-- firstname container -->
                <div class="flex flex-col mb-4">
                    <label for="firstname" class="mr-4">نام</label>
                    <input id='firstname' type="text" placeholder="احسان" v-model.trim="employee.firstName"
                        class="rounded-sm w-[300px] outline-none custom-input"
                        :class="firstNameErrorMsg ? 'border-red-500' : ''" />
                    <div v-if="firstNameErrorMsg" class="text-red-500">{{ firstNameErrorMsg }}</div>
                </div>
                <!-- lastname container-->
                <div class="flex flex-col mb-4">
                    <label for="lastname" class="mr-4">نام خانوادگی</label>
                    <input id='lastname' type="text" placeholder="رجبی" v-model.trim="employee.lastName"
                        class="rounded-sm w-[300px] outline-none custom-input"
                        :class="lastNameErrorMsg ? 'border-red-500' : ''" />
                    <div v-if="lastNameErrorMsg" class="text-red-500">{{ lastNameErrorMsg }}</div>
                    <!-- birth container -->
                </div>
                <div class="flex flex-col mb-4">
                    <label for="dateOfBirth" class="mr-4">تاریخ تولد</label>
                    <input type="date" id="dateOfBirth" placeholder="انتخاب کنید" v-model="employee.dateOfBirth"
                        class="rounded-sm w-[300px] outline-none custom-input" />
                </div>
                <!-- email container -->
                <div class="flex flex-col mb-4">
                    <label for="email" class="mr-4">ایمیل</label>
                    <input id='email' type="email" v-model.trim="employee.email"
                        class="rounded-sm w-[300px] outline-none custom-input"
                        :class="emailErrorMsg ? 'border-red-500' : ''" />
                    <div v-if="emailErrorMsg" class="text-red-400">{{ emailErrorMsg }}</div>
                </div>
            </div>

            <!-- inner section, family members of employee -->
            <div class="relative mt-10 border-2 rounded-sm px-8 py-6 w-[680px] dark:bg-gray-800 dark:border-gray-700">
                <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-gray-50 px-4">
                    اعضای خانواده
                </p>
                <div v-for="(familyMember, index) in employee.family" :key="index"
                    class="relative border-2 rounded-sm px-8 pt-8 pb-2 mt-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex items-center justify-center">
                        <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-gray-50 px-4">
                            #{{ index + 1 }}
                        </p>

                        <p class="absolute top-[-20px] right-20 bg-gray-50 px-4">
                            <span class="material-icons bg-red-500 text-white rounded-md cursor-pointer p-1"
                                @click="deleteFamilyMember(index)">delete_forever</span>
                        </p>
                    </div>
                    <div class="flex flex-wrap justify-between">
                        <!-- family member name -->
                        <div class="flex flex-col mb-4">
                            <label :for="'family-name-' + index" class="mr-4">نام</label>
                            <input :id="'family-name-' + index" type="text" v-model.trim="familyMember.firstname"
                                placeholder="مریم" class="rounded-sm w-full outline-none custom-input" />
                        </div>
                        <!-- family member last name -->
                        <div class="flex flex-col mb-4">
                            <label :for="'family-lastname-' + index" class="mr-4">نام خانوادگی</label>
                            <input :id="'family-lastname-' + index" type="text" v-model.trim="familyMember.lastname"
                                placeholder="قربانی" class="rounded-sm w-full outline-none custom-input" />
                        </div>
                        <!-- family member birth -->
                        <div class="flex flex-col mb-4">
                            <label :for="'family-dateOfBirth-' + index" class="mr-4">تاریخ تولد</label>
                            <input :id="'family-dateOfBirth-' + index" type="date" v-model="familyMember.dateOfBirth"
                                placeholder="انتخاب کنید" class="rounded-sm w-full outline-none custom-input" />
                        </div>
                        <!-- family member relatin -->
                        <div class="flex flex-col mb-4">
                            <label :for="'relation-' + index" class="mr-4">نسبت</label>
                            <select :id="'relation-' + index" v-model="familyMember.relation"
                                class="rounded-sm w-[210px] outline-none custom-input">
                                <option value="spouse" selected>همسر</option>
                                <option value="son">پسر</option>
                                <option value="daughter">دختر</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- Add more family member input -->
                <BaseButton class="bg-blue-500" type="button" @click="addFamilyMember">افزودن عضو</BaseButton>
            </div>
            <!-- BaseButton container for submiting form or canceling it -->
            <div v-if="!isEditingForm" class="flex justify-between">
                <BaseButton class="bg-emerald-500">افزودن</BaseButton>
                <BaseButton class="bg-gray-500" type="button" @click="cancelAdding">انصراف</BaseButton>
            </div>
            <div v-if="isEditingForm" class="flex justify-center">
                <BaseButton type="button" class="bg-emerald-500" @click="updateInformation">بروزرسانی</BaseButton>
            </div>
        </form>
        <div v-if="employeeIsAdded" class="text-lg text-red-500 flex justify-center">{{ employeeIsAdded }}</div>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import RemovingEmployee from './RemovingEmployee.vue';
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
            return response;
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

        addFamilyMember() {
            this.employee.family.push({
                name: "",
                dateOfBirth: "",
                relation: "",
            });
        },

        deleteFamilyMember(index) {
            this.employee.family.splice(index, 1);
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
    components: { BaseButton, RemovingEmployee },
};
</script>

<style scoped>
.custom-input:focus {
    outline: none;
    border-color: #cbd5e0;
}
</style>