<template>
  <div class="flex flex-col items-center">
    <BaseButton class="bg-emerald-500" :to="{ name: 'EmployeeDropDown' }">
      کارمندان دراپ
    </BaseButton>
    <BaseButton class="bg-emerald-500" :to="{ name: 'EmployeeList' }">
      کارمندان لیست
    </BaseButton>
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
