<template>
    <div class="flex flex-col mb-4">
        <label class="mr-4">{{ labelName }}</label>
        <div class="rounded-sm px-2 py-2 outline-none custom-input border-[1.25px]">
            {{ value }}
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['value', 'labelName'],
};
</script>
  
<style scoped></style>
  