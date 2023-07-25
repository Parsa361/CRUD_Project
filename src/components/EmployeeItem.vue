<template>
    <div class="bg-white border rounded-sm dark:bg-gray-800 dark:border-gray-700">
        <div @click="toggleExpandedItem"
            class="flex items-center justify-between px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ employeeListItem.firstName + " " + employeeListItem.lastName }}
            <span class="material-icons cursor-pointer">
                {{ isExpanded ? 'expand_less' : 'expand_more' }}
            </span>
        </div>
        <div class="flex justify-center">
            <BaseLoading v-if="isLoading"></BaseLoading>
            <EmployeeDetails v-else-if="isExpanded" :employeeId="employeeListItem.id"
                @employeeDeleted="$emit('employeeDeleted')" @employeeUpdated="$emit('employeeUpdated')" />
        </div>
    </div>
</template>

<script>
import BaseLoading from './Base/BaseLoading.vue';
import EmployeeDetails from './EmployeeDetails.vue';

export default {
    props: ['employeeListItem'],
    data() {
        return {
            isExpanded: false,
            isLoading: false,
        };
    },
    methods: {
        toggleExpandedItem() {
            this.isExpanded = !this.isExpanded; // Toggle the flag
        },
    },
    components: { BaseLoading, EmployeeDetails },
};
</script>

<style scoped></style>