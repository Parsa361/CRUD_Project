<template>
    <div>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onUpdate)" class="mt-4">
                <!-- employee's personal information form -->
                <PersonalForm :employee="modelEmployeeInfo" />
                <!-- inner section, family members of employee -->
                <div class="relative mt-10 border-2 rounded-sm px-8 py-6 w-[680px] dark:bg-gray-800 dark:border-gray-700">
                    <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-[#F9FAFB] px-4">
                        اعضای خانواده
                    </p>
                    <!-- employee's Family members form -->
                    <FamilyMembersForm :employeeFamily="modelEmployeeInfo.family" />
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
            modelEmployeeInfo: null
        };
    },
    methods: {
        async onUpdate() {
            try {
                this.loading = true;
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
            } finally {
                this.loading = false;
            }
        },
        async updateHandler() {
            this.joinFamilyMemberName();
            await this.employeeStore.updateEmployee(this.modelEmployeeInfo.id, this.modelEmployeeInfo);
            this.$emit('employeeUpdated', this.modelEmployeeInfo);
        },
        // This function does make the employee.family.name from firstname-lastname
        joinFamilyMemberName() {
            this.modelEmployeeInfo.family.forEach((familyMember) => {
                familyMember.name = `${familyMember.firstname}-${familyMember.lastname}`;
            });
        },
    },
    watch: {
        employeeInfo: {
            // This handler will be triggered when the 'employeeInfo' prop changes
            immediate: true, // This option will trigger the handler immediately on component mount
            // The handler function will receive the new value of 'employeeInfo'
            handler(newEmployeeInfo) {
                // You can deep clone the newEmployeeInfo if needed
                this.modelEmployeeInfo = _.cloneDeep(newEmployeeInfo);
            },
        },
    },
    computed: {
        ...mapStores(useEmployeeStore)
    },
    beforeMount() {
        this.modelEmployeeInfo = _.cloneDeep(this.employeeInfo);
    },
    components: { BaseButton, PersonalForm, FamilyMembersForm },
};
</script>

<style scoped></style>