<template>
    <div>
        <BaseButton :loading="loading" @click="removeEmployee" class="rounded-lg cursor-pointer bg-red-500"><span
                class="material-icons text-white">delete_forever</span>
        </BaseButton>
    </div>
</template>

<script>
import BaseButton from './Base/BaseButton.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';

export default {
    props: ["singleEmployeeId"],
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapStores(useEmployeeStore)
    },
    methods: {
        async removeEmployee() {
            this.loading = true;
            await this.employeeStore.deleteEmployee(this.singleEmployeeId);
            this.loading = false;
            await this.employeeStore.fetchEmployees();
        },
    },
    components: { BaseButton }
};
</script>

<style scoped></style>