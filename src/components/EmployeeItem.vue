<template>
    <div class="bg-white border rounded-sm dark:bg-gray-800 dark:border-gray-700">
        <div @click="toggleExpandedItem"
            class="flex items-center justify-between px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ employee.firstName + " " + employee.lastName }}
            <span class="material-icons cursor-pointer">
                {{ isExpanded ? 'expand_less' : 'expand_more' }}
            </span>
        </div>
        <div class="flex justify-center">
            <BaseLoading v-if="isLoading"></BaseLoading>
            <EmployeesForm v-else-if="isExpanded && singleEmployee" :isEditingForm="isExpanded"
                :singleEmployee="singleEmployee" @employeeUpdated="$emit('employeeUpdated')"
                @employeeDeleted="$emit('employeeDeleted')" />
        </div>
    </div>
</template>

<script>
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';
import EmployeesForm from './EmployeesForm.vue';
import BaseLoading from './Base/BaseLoading.vue';

export default {
    props: ['employee'],
    data() {
        return {
            isExpanded: false,
            isLoading: false,
            singleEmployee: null
        };
    },
    methods: {
        toggleExpandedItem() {
            this.isExpanded = !this.isExpanded; // Toggle the flag
            if (this.isExpanded) {
                this.fetchEmployeeData(this.employee.id);
            } else {
                this.removeSingleEmployee();
            }
        },
        async removeSingleEmployee() {
            this.singleEmployee = null;
        },
        async fetchEmployeeData(id) {
            try {
                this.isLoading = true;
                this.singleEmployee = await this.employeeStore.fetchEmployee(id);
                this.splitFamilyMemberName(this.singleEmployee);
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        splitFamilyMemberName(singleEmployee) {
            singleEmployee.family.forEach((familyMember) => {
                const [firstname, lastname] = familyMember.name.split("-");
                familyMember.firstname = firstname;
                familyMember.lastname = lastname;
                delete familyMember.name;
            });
        },
    },
    computed: {
        ...mapStores(useEmployeeStore)
    },
    components: { EmployeesForm, BaseLoading },
};
</script>

<style scoped></style>