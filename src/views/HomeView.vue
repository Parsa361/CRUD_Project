<template>
  <div class="flex flex-col items-center">
    <!-- Here we shows our employees list -->
    <EmployeesList />

    <!-- This button is responsible for set the visibility of the form -->
    <BaseButton v-if="!isShowForm" type="button" class="bg-emerald-500" @click="showForm">افزودن کارمند</BaseButton>

    <!-- Employee form -->
    <EmployeesForm v-if="isShowForm" @cancel-add-employee="cancelAddEmployee" />
  </div>
</template>

<script>
import EmployeesList from '../components/EmployeesList.vue';
import BaseButton from '../components/Base/BaseButton.vue';
import EmployeesForm from '../components/EmployeesForm.vue';

export default {
  name: "App",
  components: {
    BaseButton,
    EmployeesList,
    EmployeesForm
  },
  data() {
    return {
      isShowForm: false,
    };
  },
  methods: {
    showForm() {
      this.isShowForm = true;
    },
    cancelAddEmployee() {
      this.isShowForm = false;
    },
  },
}

</script>

<style scoped></style>