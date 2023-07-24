<template>
    <button class="flex items-center justify-center gap-x-1 px-4 py-2 font-medium rounded-sm my-3 text-white"
        @click="handleClick">
        <slot></slot>
        <span v-if="loading" class="loader w-5 h-5"></span>
    </button>
</template>

<script>
export default {
    props: ['loading'],
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
};
</script>

<style scoped></style>