<template>
    <div class="relative px-8 py-2 border-2 mt-10 w-[748px] dark:bg-gray-800 dark:border-gray-700">
        <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-gray-50 px-4">
            افزودن کارمند
        </p>

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
                <div>
                    <div class="flex justify-between">
                        <BaseButton class="bg-emerald-500" :loading="loading">افزودن
                        </BaseButton>
                        <BaseButton @click="cancelAdding" class="bg-gray-500" type="button">انصراف</BaseButton>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import PersonalForm from './PersonalForm.vue';
import FamilyMembersForm from './FamilyMembersForm.vue';
import BaseButton from './Base/BaseButton.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';

export default {
    data() {
        return {
            loading: false,
            employee: { "firstName": "parsa", "lastName": "ali", "email": "mamaloo@gmail.com", "dateOfBirth": "2023-06-30", "family": [{ "firstname": "آمنه", "lastname": "فدایی", "dateOfBirth": "2023-07-11", "relation": "son" }] },
        };
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
                });
            } catch (error) {
                this.$notify({
                    group: 'app',
                    title: 'افزودن ناموفق',
                    text: 'کارمند اضافه نشد! مشکلی رخ داده است.',
                    type: 'errror',
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
            this.fetchingAgain();
            console.log('employee is added: ', response);
        },
        cancelAdding() {
            this.$emit('notExpanded');
        },
        fetchingAgain() {
            this.$emit('employeeAdded');
        },
        joinFamilyMemberName() {
            this.employee.family.forEach((familyMember) => {
                familyMember.name = `${familyMember.firstname}-${familyMember.lastname}`;
                // delete the firstname, lastname properties from employee data
                delete familyMember.firstname;
                delete familyMember.lastname;
            });
        },
    },
    computed: {
        ...mapStores(useEmployeeStore)
    },
    components: { BaseButton, PersonalForm, FamilyMembersForm },

};
</script>

<style scoped></style>