<template>
  <div class="flex flex-col items-center">
    <!-- Here we shows our employees list -->
    <EmployeesList />

    <!-- This button is responsible for set the visibility of the form -->
    <BaseButton v-if="!isShowingForm" type="button" class="bg-emerald-500" @click="showForm">افزودن کارمند</BaseButton>

    <!-- Employee form -->
    <EmployeesForm v-if="isShowingForm" :isShowingForm="isShowingForm" @cancel-add-employee="cancelAddEmployee" />
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
      isShowingForm: false,
    };
  },
  methods: {
    showForm() {
      this.isShowingForm = true;
    },
    cancelAddEmployee() {
      this.isShowingForm = false;
    },
  },
}

</script>

<style scoped></style>