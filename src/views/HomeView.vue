<template>
  <div class="flex flex-col items-center">
    <!-- Here we shows our employees list -->
    <EmployeesList :employees="employees" @new-employee-list="updateList" />

    <!-- This button is responsible for set the visibility of the form -->
    <BaseButton v-if="!isShowingForm" type="button" class="bg-emerald-500" @click="showForm">افزودن کارمند</BaseButton>

    <!-- Employee form -->
    <EmployeesForm v-if="isShowingForm" :isShowingForm="isShowingForm" @cancel-add-employee="cancelAddEmployee"
      @new-employee-list="updateList" />
  </div>
</template>

<script>
import EmployeesList from '../components/EmployeesList.vue';
import BaseButton from '../components/BaseButton.vue';
import EmployeesForm from '../components/EmployeesForm.vue';
import { fetchEmployees } from "../services/employeeService.js";

export default {
  name: "App",
  components: {
    BaseButton,
    EmployeesList,
    EmployeesForm
  },
  data() {
    return {
      isShowingForm: false,
      employees: null
    };
  },
  methods: {
    showForm() {
      this.isShowingForm = true;
    },
    cancelAddEmployee() {
      this.isShowingForm = false;
    },
    // fetch all employees
    async fetchData() {
      try {
        const response = await fetchEmployees();
        this.employees = response;
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async updateList() {
      await this.fetchData();
    }
  },
  mounted() {
    // Call the fetchData method when the component is mounted
    this.fetchData();
  },
}

</script>

<style scoped></style>