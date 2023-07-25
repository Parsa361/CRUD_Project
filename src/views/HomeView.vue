<template>
  <div class="flex flex-col items-center">
    <!-- Here we shows our employees list -->
    <EmployeesList @employeeUpdated="onEmployeeUpdated" @employeeDeleted="onEmployeeDeleted" />

    <!-- This button is responsible for set the visibility of the form -->
    <BaseButton v-if="!isShowForm" type="button" class="bg-emerald-500" @click="showForm">افزودن کارمند</BaseButton>

    <!-- Employee form -->
    <AddingEmployee v-if="isShowForm" @notExpanded="cancelAddEmployee" @employeeAdded="fetchEmployeesData" />
  </div>
</template>

<script>
import EmployeesList from '../components/EmployeesList.vue';
import BaseButton from '../components/Base/BaseButton.vue';
import AddingEmployee from '../components/AddingEmployee.vue';
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';


export default {
  name: "App",
  components: {
    BaseButton,
    EmployeesList,
    AddingEmployee
  },
  data() {
    return {
      isShowForm: false,
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
    onEmployeeUpdated() {
      this.fetchEmployeesData();
    },
    onEmployeeDeleted() {
      this.fetchEmployeesData();
    },
    onEmployeeAdded() {
      this.fetchEmployeesData();
    },
    async fetchEmployeesData() {
      await this.employeeStore.fetchEmployees();
    },
  },
}

</script>

<style scoped></style>