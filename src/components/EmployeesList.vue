<template>
  <div class="relative overflow-x-auto mt-5">
    <div class="w-[748px] text-lg text-gray-700 dark:text-gray-600">
      <!-- List of employees -->
      <h1 class="text-black font-medium text-2xl mb-4">کارمندان</h1>

      <div v-if="!loading">
        <EmployeeItem v-for="employee in employeeStore.getEmployees" :key="employee.id" :employeeListItem="employee"
          @employeeUpdated="$emit('employeeUpdated')" @employeeDeleted="$emit('employeeDeleted')" />
      </div>
      <div v-if="loading" class="flex justify-center items-center">
        <BaseLoading />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeItem from './EmployeeItem.vue';
import BaseLoading from './Base/BaseLoading.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';

export default {
  data() {
    return {
      expandedItemId: null,
      loading: false
    };
  },
  computed: {
    ...mapStores(useEmployeeStore)
  },
  methods: {
    // fetch all employees
    async fetchData() {
      this.loading = true;
      await this.employeeStore.fetchEmployees();
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
  components: { BaseLoading, EmployeeItem }
};
</script>

<style scoped></style>
