<template>
    <button class="flex items-center justify-center px-4 py-2 font-medium rounded-sm my-3 text-white"
        :class="{ 'disabled': loading }" @click="handleClick" :disabled="loading">
        <slot></slot>
        <span v-if="loading" class="loader w-5 h-5 mr-3"></span>
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

<style scoped>
.disabled {
    opacity: 0.5;
}
</style>