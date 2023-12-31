<template>
    <div class="px-8 py-2 dark:bg-gray-800 dark:border-gray-700">
        <div v-if="!loading">
            <!-- Removing employee component -->
            <div class="my-10 flex justify-end items-center gap-x-2">
                <RemovingEmployee :employeeInfoId="employeeInfo.id" @employeeDeleted="$emit('employeeDeleted')" />
                <!-- edit information icon -->
                <BaseButton v-if="!isEditingForm" @click="isEditingForm = !isEditingForm" class="bg-blue-400"><span
                        class="material-icons">
                        edit_note
                    </span>
                </BaseButton>
                <slot name="pushBack"></slot>
            </div>

            <UpdatingEmployee v-if="isEditingForm" :employeeInfo="employeeInfo" @employeeUpdated="onEmployeeUpdated"
                @cancelUpdate="onCancelUpdate" />

            <div v-else>
                <!-- Personal info section -->
                <div class="flex flex-wrap justify-between">
                    <BaseDiv labelName="نام" :value="employeeInfo.firstName" class="w-[300px] h-[42.46]" />
                    <BaseDiv labelName="نام خانوادگی" :value="employeeInfo.lastName" class="w-[300px] h-[42.46]" />
                    <BaseDiv labelName="تاریخ تولد" :value="employeeInfo.dateOfBirth" class="w-[300px] h-[42.46]" />
                    <BaseDiv labelName="ایمیل" :value="employeeInfo.email" class="w-[300px] h-[42.46]" />
                </div>
                <div class="relative mt-10 border-2 rounded-sm px-8 py-6 w-[680px] dark:bg-gray-800 dark:border-gray-700">
                    <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-[#F9FAFB] px-4">
                        اعضای خانواده
                    </p>
                    <!-- Family member info section -->
                    <div v-for="(familyMember, index) in employeeInfo.family" :key="index"
                        class="relative border-2 rounded-sm px-8 pt-8 pb-2 mt-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-center">
                            <div class="flex items-center justify-center">
                                <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-[#F9FAFB] px-4">
                                    #{{ index + 1 }}
                                </p>
                                <div class="flex flex-wrap justify-between">
                                    <BaseDiv labelName="نام" :value="familyMember.firstname"
                                        class="w-[250.48px] h-[42.46]" />
                                    <BaseDiv labelName="نام خانوادگی" :value="familyMember.lastname"
                                        class="w-[250.48px] h-[42.46]" />
                                    <BaseDiv labelName="تاریخ تولد" :value="familyMember.dateOfBirth"
                                        class="w-[250.48px] h-[42.46]" />
                                    <BaseDiv labelName="نسبت" :value="translateFamilyRelation(familyMember.relation)"
                                        class="w-[250.48px] h-[42.46]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading -->
        <div class="flex justify-center items-center" v-else>
            <BaseLoading />
        </div>
    </div>
</template>

<script>
import BaseDiv from './Base/BaseDiv.vue';
import UpdatingEmployee from './UpdatingEmployee.vue';
import AddingEmployee from './AddingEmployee.vue';
import BaseLoading from './Base/BaseLoading.vue';
import BaseButton from './Base/BaseButton.vue';
import RemovingEmployee from './RemovingEmployee.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';

export default {
    props: ['employeeId'],
    data() {
        return {
            isEditingForm: false,
            employeeInfo: null,
            loading: false
        };
    },
    methods: {
        onCancelUpdate() {
            this.isEditingForm = false;
        },
        onEmployeeUpdated(copyemployeeInfo) {
            this.employeeInfo = copyemployeeInfo;
            this.isEditingForm = false;
            this.$emit('employeeUpdated');
        },
        async fetchEmployeeData(id) {
            try {
                this.loading = true;
                this.employeeInfo = await this.employeeStore.fetchEmployee(id);
                this.splitFamilyMemberName(this.employeeInfo);
                console.log(this.employeeInfo);
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        splitFamilyMemberName(employeeInfo) {
            employeeInfo.family.forEach((familyMember) => {
                const [firstname, lastname] = familyMember.name.split("-");
                familyMember.firstname = firstname;
                familyMember.lastname = lastname;
                delete familyMember.name;
            });
        },
        translateFamilyRelation(relation) {
            if (relation === 'spouse') {
                return relation = 'همسر';
            } else if (relation === 'son') {
                return relation = 'پسر';
            } else {
                return relation = 'دختر';
            }
        },
    },
    computed: {
        ...mapStores(useEmployeeStore)
    },
    beforeMount() {
        this.fetchEmployeeData(this.employeeId);
    },
    components: { BaseDiv, BaseButton, RemovingEmployee, BaseLoading, UpdatingEmployee, AddingEmployee },
};
</script>

<style scoped></style>