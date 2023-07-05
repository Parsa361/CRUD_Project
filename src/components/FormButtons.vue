<template>
    <div>
        <div v-if="!isEditingForm" class="flex justify-between">
            <BaseButton class="bg-emerald-500">افزودن</BaseButton>
            <BaseButton class="bg-gray-500" type="button" @click="$emit('cancel-add-employee')">انصراف</BaseButton>
        </div>
        <div v-if="isEditingForm" class="flex justify-center">
            <BaseButton type="button" class="bg-emerald-500" @click="$emit('employee-updated')">بروزرسانی</BaseButton>
        </div>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
    props: ['isEditingForm'],
    components: { BaseButton }
};
</script>

<style scoped></style>