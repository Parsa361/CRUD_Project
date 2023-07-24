<template>
    <!-- container for entire form -->
    <div class="relative  px-8 py-2 w-[748px] dark:bg-gray-800 dark:border-gray-700"
        :class="isEditingForm ? 'bg-white mt-0' : 'mt-10 border-2 rounded-md'">

        <p v-if="!isEditingForm" class="font-medium text-2xl absolute top-[-20px] right-6 bg-gray-50 px-4">
            افزودن کارمند
        </p>
        <!-- Removing employee component -->
        <div v-if="isEditingForm" class="my-10 flex justify-end" :class="{ 'my-2': isEditingForm }">
            <RemovingEmployee :singleEmployeeId="singleEmployee.id" />
        </div>

        <!-- Employee Form -->
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(submitForm)" class="mt-4">
                <!-- employee's personal information form -->
                <PersonalForm :employee="employee" />
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
                    @employee-updated="updateInformation" @submit-form="submitForm" :loading="loading" />
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import PersonalForm from './PersonalForm.vue';
import FamilyMembersForm from './FamilyMembersForm.vue';
import BaseButton from './Base/BaseButton.vue';
import RemovingEmployee from './RemovingEmployee.vue';
import FormButtons from './FormButtons.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';

export default {
    name: 'EmployeesForm',
    props: ['isEditingForm', 'singleEmployee'],
    data() {
        return {
            employee: { "firstName": "parsa", "lastName": "ali", "email": "mamaloo@gmail.com", "dateOfBirth": "2023-06-30", "family": [{ "firstname": "آمنه", "lastname": "فدایی", "dateOfBirth": "2023-07-11", "relation": "son" }] },
            loading: false,
        };
    },
    computed: {
        ...mapStores(useEmployeeStore)
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
        async submitForm() {
            try {
                console.log('is working');
                await this.submitFormHandler();
                this.$notify({
                    group: 'app',
                    title: 'افزودن موفق',
                    text: 'کارمند با موفقیت اضافه شد.',
                    type: 'success',
                    duration: 3000
                });
            } catch (error) {
                this.$notify({
                    group: 'app',
                    title: 'افزودن ناموفق',
                    text: 'کارمند اضافه نشد! مشکلی رخ داده است.',
                    type: 'errror',
                    duration: 3000
                });
                console.error('Error adding employee:', error);
            }
        },
        async submitFormHandler() {
            this.joinFamilyMemberName();
            this.loading = true;
            const response = await this.employeeStore.addEmployee(this.employee);
            this.loading = false;
            this.cancelAdding();
            await this.employeeStore.fetchEmployees();
            console.log('employee is added: ', response);
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
                await this.updateHandler();
                Vue.notify({
                    group: 'app',
                    title: 'آپدیت موفق',
                    text: 'اطلاعات کارمند بروزرسانی شد.',
                    type: 'success',
                });
            } catch (error) {
                Vue.notify({
                    group: 'app',
                    title: 'آپدیت ناموفق',
                    text: 'اطلاعات کارمند بروزرسانی نشد.',
                    type: 'info',
                });
            }
        },
        async updateHandler() {
            this.joinFamilyMemberName();
            this.loading = true;
            await this.employeeStore.updateEmployee(this.singleEmployee.id, this.employee);
            this.loading = false;
            await this.employeeStore.fetchEmployees();
        }
    },
    components: { BaseButton, RemovingEmployee, PersonalForm, FamilyMembersForm, FormButtons },
};
</script>

<style scoped></style>