<template>
  <div class="relative overflow-x-auto mt-5">
    <div class="w-[748px] text-lg text-gray-700 dark:text-gray-600">
      <!-- List of employees -->
      <h1 class="text-black font-medium text-2xl mb-4">کارمندان</h1>

      <div v-if="!employeeStore.employeesLoading">
        <div v-for="employee in employeeStore.getEmployees" :key="employee.id"
          class="bg-white border rounded-sm dark:bg-gray-800 dark:border-gray-700">
          <div
            class="flex items-center justify-between px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ employee.firstName + " " + employee.lastName }}
            <span class="material-icons cursor-pointer" @click="toggleExpandedItem(employee.id)">
              {{ isExpandedItem(employee.id) ? 'expand_less' : 'expand_more' }}
            </span>
          </div>
          <div v-if="isExpandedItem(employee.id)" class="flex justify-center">
            <BaseLoading v-if="employeeStore.singleEmployeeLoading"></BaseLoading>
            <EmployeesForm v-else :isEditingForm="isEditingForm" :singleEmployee="singleEmployee"
              @employee-removed="removeSingleEmployee" @employee-updated="updateSingleEmployee" />
          </div>
        </div>
      </div>
      <div v-if="employeeStore.employeesLoading" class="flex justify-center items-center">
        <BaseLoading />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeesForm from './EmployeesForm.vue';
import BaseLoading from './BaseLoading.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';

export default {
  data() {
    return {
      singleEmployee: null,
      isEditingForm: false,
      expandedItemId: null
    };
  },
  computed: {
    ...mapStores(useEmployeeStore)
  },
  methods: {
    async fetchEmployeeData(id) {
      await this.employeeStore.fetchEmployee(id);
      this.singleEmployee = this.employeeStore.employee;
      this.splitFamilyMemberName(this.singleEmployee);
      this.isEditingForm = true;
    },
    async removeSingleEmployee() {
      this.singleEmployee = null;
      this.isEditingForm = false;
      this.expandedItemId = null;
      await this.employeeStore.fetchEmployees();
    },
    async updateSingleEmployee() {
      this.isEditingForm = false;
      this.expandedItemId = null;
      await this.employeeStore.fetchEmployees();
    },
    splitFamilyMemberName(singleEmployee) {
      singleEmployee.family.forEach((familyMember) => {
        const [firstname, lastname] = familyMember.name.split("-");
        familyMember.firstname = firstname;
        familyMember.lastname = lastname;
        delete familyMember.name;
      });
    },
    toggleExpandedItem(itemId) {
      if (this.isExpandedItem(itemId)) {
        this.expandedItemId = null;
      } else {
        this.expandedItemId = itemId;
        this.fetchEmployeeData(itemId);
      }
    },
    isExpandedItem(itemId) {
      return this.expandedItemId === itemId;
    },
    // fetch all employees
    async fetchData() {
      await this.employeeStore.fetchEmployees();
    },
  },
  mounted() {
    this.fetchData();
  },
  components: { EmployeesForm, BaseLoading }
};
</script>

<style scoped></style>
