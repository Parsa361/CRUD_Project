<template>
  <div class="relative overflow-x-auto mt-5">
    <div class="w-[748px] text-lg text-gray-700 dark:text-gray-600">
      <!-- List of employees -->
      <h1 class="text-black font-medium text-2xl mb-4">کارمندان</h1>
      <div v-for="employee in employees" :key="employee.id"
        class="flex items-center justify-between bg-white border rounded-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ employee.firstName + " " + employee.lastName }}
        </div>
        <div class="px-6 py-4">
          <span class="material-icons cursor-pointer" @click="toggleExpandedItem(employee.id)">
            {{ isExpandedItem(employee.id) ? 'expand_less' : 'expand_more' }}
          </span>
        </div>
      </div>
      <EmployeesForm v-if="isExpandedItem(singleEmployee?.id)" :isEditingForm="isEditingForm"
        :singleEmployee="singleEmployee" @employee-removed="removeSingleEmployee"
        @employee-updated="updateSingleEmployee" />
    </div>
  </div>
</template>

<script>
import EmployeesForm from './EmployeesForm.vue';
import { fetchEmployee } from '../services/employeeService.js';

export default {
  props: ["employees"],
  data() {
    return {
      singleEmployee: null,
      isEditingForm: false,
      expandedItemId: null
    };
  },
  methods: {
    async fetchEmployeeData(id) {
      try {
        const response = await fetchEmployee(id);
        this.singleEmployee = response;
        this.loadFamilyData(this.singleEmployee);
        this.isEditingForm = true;
      } catch (error) {
        console.error("Error fetching single employee:", error);
      }
    },
    removeSingleEmployee() {
      this.singleEmployee = null;
      this.isEditingForm = false;
      this.expandedItemId = null;
      this.$emit('new-employee-list');
    },
    updateSingleEmployee() {
      this.isEditingForm = false;
      this.expandedItemId = null;
      this.$emit('new-employee-list');
    },
    loadFamilyData(singleEmployee) {
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
    }
  },
  components: { EmployeesForm }
};
</script>

<style scoped></style>
