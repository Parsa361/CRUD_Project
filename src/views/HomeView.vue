<template>
  <div class="container mx-auto flex items-center justify-center h-screen">
    <div class="flex items-center justify-center gap-5">
      <BaseButton class="bg-emerald-500" :to="{ name: 'EmployeeDropDown' }">
        کارمندان دراپ
      </BaseButton>
      <BaseButton class="bg-emerald-500" :to="{ name: 'EmployeeList' }">
        کارمندان لیست
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '../components/Base/BaseButton.vue';

export default {
  name: "App",
  components: {
    BaseButton,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped></style>
