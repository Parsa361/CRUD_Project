<template>
    <div>
        <span @click="removeEmployee"
            class="material-icons bg-red-500 text-white rounded-md cursor-pointer text-2xl px-2 py-1">delete_forever</span>
    </div>
</template>

<script>
import { deleteEmployee } from '../services/employeeService.js';

export default {
    props: ['singleEmployeeId'],
    methods: {
        async removeEmployee() {
            try {
                await deleteEmployee(this.singleEmployeeId);
                this.$emit('employee-removed');
            } catch (error) {
                console.error('Error removing employee:', error);
                return;
            }
        },
    }
};
</script>

<style scoped></style>