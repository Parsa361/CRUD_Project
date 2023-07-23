<template>
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }">
        <div class="flex flex-col mb-4">
            <label :for="name" class="mr-4">{{ labelName }}</label>
            <input :id='name' :type="type" :placeholder="placeHolder" :value="value" @input="handleInput"
                class="rounded-sm w-[300px] outline-none custom-input" :class="errors[0] ? 'border-red-500' : ''" />
            <span class="text-red-500">{{ errors[0] }}</span>
        </div>
    </ValidationProvider>
</template>

<script>
export default {
    props: ['value', 'errors', 'rules', 'name', 'type', 'labelName', 'placeHolder'],
    data() {
        return {
            // content: this.value
        };
    },
    methods: {
        handleInput(e) {
            this.$emit('input', e.target.value);
        }
    }
};
</script>

<style scoped></style>