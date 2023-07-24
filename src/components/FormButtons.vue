<template>
    <div>
        <div v-if="!isEditingForm" class="flex justify-between">
            <BaseButton :loading="loading" class="bg-emerald-500">افزودن
            </BaseButton>
            <BaseButton @click="$emit('cancel-add-employee')" class="bg-gray-500" type="button">انصراف</BaseButton>
        </div>
        <div v-if="isEditingForm" class="flex justify-center">
            <BaseButton type="button" @click="$emit('employee-updated')" :loading="loading" class="bg-emerald-500">بروزرسانی
            </BaseButton>
        </div>
    </div>
</template>

<script>
import BaseButton from './Base/BaseButton.vue';
export default {
    props: ['isEditingForm', 'loading'],
    components: { BaseButton }
};
</script>

<style scoped></style>