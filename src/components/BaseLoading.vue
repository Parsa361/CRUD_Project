<template>
    <div class="flex items-center justify-center w-[160px] h-[160px]">
        <div class="loader"></div>
    </div>
</template>

<script>
import { useEmployeeStore } from '../stores/index';
import { mapStores } from 'pinia';
export default {
    computed: {
        ...mapStores(useEmployeeStore)
    },
};
</script>

<style scoped>
.loader {
    border: 8px solid rgba(51, 34, 203, 0.3);
    border-top: 8px solid #479e14;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>