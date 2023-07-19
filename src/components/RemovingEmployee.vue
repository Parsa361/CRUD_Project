<template>
    <div>
        <span @click="removeEmployee"
            class="material-icons bg-red-500 text-white rounded-md cursor-pointer text-2xl px-2 py-1">delete_forever</span>
    </div>
</template>

<script>
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';

export default {
    props: ['singleEmployeeId'],
    computed: {
        ...mapStores(useEmployeeStore)
    },
    methods: {
        async removeEmployee() {
            await this.employeeStore.deleteEmployee(this.singleEmployeeId);
        },
    }
};
</script>

<style scoped></style>