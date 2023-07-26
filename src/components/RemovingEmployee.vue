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
    props: ["employeeInfoId"],
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
            try {
                await this.removeHandler();
                this.$notify({
                    group: 'app',
                    title: 'حذف موفق',
                    text: 'کارمند مورد نظر حذف شد.',
                    type: 'success',
                });
            } catch (error) {
                console.log(error);
                this.$notify({
                    group: 'app',
                    title: 'حذف ناموفق',
                    text: 'کارمند حذف نشد! مشکلی رخ داده است.',
                    type: 'error',
                });
            }
        },
        async removeHandler() {
            this.loading = true;
            await this.employeeStore.deleteEmployee(this.employeeInfoId);
            this.loading = false;
            this.$emit('employeeDeleted');
        }
    },
    components: { BaseButton }
};
</script>

<style scoped></style>