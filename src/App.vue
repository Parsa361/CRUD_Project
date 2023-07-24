<template>
  <div>
    <notifications group="app" position="top right" width="300px" :duration="3000"
      classes="vue-notification custom-notification" />
    <RouterView></RouterView>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.custom-notification {
  margin: 10px !important;
  border-left: 0 !important;
  border-radius: 5px !important;
  text-align: right !important;
  font-size: 16px !important;
}
</style>
