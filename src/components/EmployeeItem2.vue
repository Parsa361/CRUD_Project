<template>
    <div class="bg-white border rounded-sm dark:bg-gray-800 dark:border-gray-700">
        <div
            class="flex items-center justify-between px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ employeeListItem.firstName + " " + employeeListItem.lastName }}
            <BaseButton class="bg-gray-500 cursor-pointer"
                :to="{ name: 'EmployeeInformation', params: { employeeId: this.employeeListItem.id } }">جزئیات</BaseButton>
        </div>
    </div>
</template>

<script>
import BaseButton from './Base/BaseButton.vue';
import BaseLoading from './Base/BaseLoading.vue';

export default {
    props: ['employeeListItem'],
    components: { BaseLoading, BaseButton },
};
</script>

<style scoped></style>