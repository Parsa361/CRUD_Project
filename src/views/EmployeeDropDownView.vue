<template>
    <div class="flex flex-col items-center justify-center">
        <div class="relative overflow-x-auto mt-5">
            <div class="w-[748px] flex flex-col justify-center text-lg text-gray-700 dark:text-gray-600">
                <!-- List of employees -->
                <div class="flex justify-start items-center mb-4">
                    <h1 class="text-black font-medium text-2xl">کارمندان</h1>
                    <span v-if="loading" class="loader w-5 h-5 mr-3"></span>
                </div>

                <div v-if="initialLoading" class="flex justify-center items-center">
                    <BaseLoading />
                </div>

                <div v-else>
                    <!-- Here we shows our employees list -->
                    <EmployeeItem v-for="employee in employeeStore.getEmployees" :key="employee.id"
                        :employeeListItem="employee" @employeeUpdated="onEmployeeUpdated"
                        @employeeDeleted="onEmployeeDeleted" />

                    <!-- This button is responsible for set the visibility of the form -->
                    <BaseButton v-if="!isShowForm" type="button" class="bg-emerald-500 mx-auto" @click="showForm">افزودن
                        کارمند
                    </BaseButton>

                    <!-- Employee form -->
                    <AddingEmployee v-if="isShowForm" @notExpanded="cancelAddEmployee"
                        @employeeAdded="fetchEmployeesData" />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '../components/Base/BaseButton.vue';
import BaseLoading from '../components/Base/BaseLoading.vue';
import AddingEmployee from '../components/AddingEmployee.vue';
import EmployeeItem from '../components/EmployeeItem.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';


export default {
    name: "App",
    components: {
        BaseButton,
        AddingEmployee,
        EmployeeItem,
        BaseLoading
    },
    data() {
        return {
            isShowForm: false,
            initialLoading: false,
            loading: false,
        };
    },
    computed: {
        ...mapStores(useEmployeeStore)
    },
    methods: {
        showForm() {
            this.isShowForm = true;
        },
        cancelAddEmployee() {
            this.isShowForm = false;
        },
        onEmployeeAdded() {
            this.fetchEmployeesData();
        },
        onEmployeeUpdated() {
            this.fetchEmployeesData();
        },
        onEmployeeDeleted() {
            this.fetchEmployeesData();
        },
        async fetchEmployeesData() {
            this.loading = true;
            await this.employeeStore.fetchEmployees();
            this.loading = false;
        },
        async initialFetchEmployeesData() {
            try {
                this.initialLoading = true;
                await this.employeeStore.fetchEmployees();
            } catch (error) {
                this.$notify({
                    group: 'app',
                    title: 'بارگیری ناموفق',
                    text: 'بارگیری لیست کارمندان ناموفق بود.',
                    type: 'error',
                });
            } finally {
                this.initialLoading = false;
            }
        },
    },
    mounted() {
        this.initialFetchEmployeesData();
    },
}

</script>

<style scoped></style>