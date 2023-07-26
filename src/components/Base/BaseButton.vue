<template>
    <component :is="tag" class="flex items-center justify-center px-4 py-2 font-medium rounded-sm my-3 text-white"
        :class="{ 'disabled': loading }" @click="handleClick" :disabled="loading" :to="to" :href="href" v-bind="$attrs">
        <slot></slot>
        <span v-if="loading" class="loader w-5 h-5 mr-3"></span>
    </component>
</template>

<script>
export default {
    props: ['loading', 'to', 'href'],
    methods: {
        handleClick() {
            this.$emit('click');
        }
    },
    computed: {
        tag() {
            if (this.to) {
                return 'router-link';
            } else if (this.href) {
                return 'a';
            } else {
                return 'button';
            }
        }
    },
};

</script>

<style scoped>
.disabled {
    opacity: 0.5;
}
</style>