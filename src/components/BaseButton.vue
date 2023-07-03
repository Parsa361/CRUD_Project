<template>
<button class="px-4 py-2 font-medium rounded-sm my-3 text-white" @click="handleClick">
    <slot></slot>
</button>
</template>

<script>
export default {
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
}
</script>

<style scoped>

</style>