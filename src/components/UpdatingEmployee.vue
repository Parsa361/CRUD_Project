<template>
    <div>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onUpdate)" class="mt-4">
                <!-- employee's personal information form -->
                <PersonalForm :employee="modelemployeeInfo" />
                <!-- inner section, family members of employee -->
                <div class="relative mt-10 border-2 rounded-sm px-8 py-6 w-[680px] dark:bg-gray-800 dark:border-gray-700">
                    <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-[#F9FAFB] px-4">
                        اعضای خانواده
                    </p>
                    <!-- employee's Family members form -->
                    <FamilyMembersForm :employeeFamily="modelemployeeInfo.family" />
                </div>
                <!-- BaseButton container for submiting form or canceling it -->
                <div>
                    <div class="flex justify-between">
                        <BaseButton class="bg-emerald-500" :loading="loading">بروزرسانی
                        </BaseButton>
                        <BaseButton class="bg-gray-500" type="button" @click="$emit('cancelUpdate')">
                            انصراف</BaseButton>
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
import _ from 'lodash/lang';

export default {
    props: ['employeeInfo'],
    data() {
        return {
            loading: false,
            modelemployeeInfo: null
        };
    },
    methods: {
        async onUpdate() {
            try {
                await this.updateHandler();
                this.$notify({
                    group: 'app',
                    title: 'آپدیت موفق',
                    text: 'اطلاعات کارمند بروزرسانی شد.',
                    type: 'info',
                });
            } catch (error) {
                this.$notify({
                    group: 'app',
                    title: 'آپدیت ناموفق',
                    text: 'اطلاعات کارمند بروزرسانی نشد.',
                    type: 'error',
                });
            }
        },
        async updateHandler() {
            this.joinFamilyMemberName();
            this.loading = true;
            await this.employeeStore.updateEmployee(this.modelemployeeInfo.id, this.modelemployeeInfo);
            this.loading = false;
            this.$emit('employeeUpdated', this.modelemployeeInfo);
        },
        // This function does make the employee.family.name from firstname-lastname
        joinFamilyMemberName() {
            this.modelemployeeInfo.family.forEach((familyMember) => {
                familyMember.name = `${familyMember.firstname}-${familyMember.lastname}`;
                // delete the firstname, lastname properties from employee data
                delete familyMember.firstname;
                delete familyMember.lastname;
            });
        },
    },
    // This watcher is for handling the employee editing mode and
    // it is updating the employee data with employeeInfo data came from EmployeeList
    watch: {
        employeeInfo: {

        },
    },
    computed: {
        ...mapStores(useEmployeeStore)
    },
    beforeMount() {
        this.modelemployeeInfo = _.cloneDeep(this.employeeInfo);
    },
    components: { BaseButton, PersonalForm, FamilyMembersForm },
};
</script>

<style scoped></style>