<template>
    <div class="relative flex justify-center items-center overflow-x-auto mt-5">
        <div class="w-[748px] border rounded text-lg text-gray-700 dark:text-gray-600">
            <EmployeeDetails :employeeId="employeeId" @employeeDeleted="onEmployeeDeleted">
                <template #pushBack>
                    <BaseButton class="bg-green-300"><span class="material-icons" @click="$router.back()">
                            arrow_back
                        </span></BaseButton>
                </template>
            </EmployeeDetails>

        </div>
    </div>
</template>

<script>
import BaseButton from '../components/Base/BaseButton.vue';
import EmployeeDetails from '../components/EmployeeDetails.vue';
export default {
    props: ['employeeId'],
    components: { EmployeeDetails, BaseButton },
    methods: {
        onEmployeeDeleted() {
            this.$router.back();
        }
    }
};
</script>

<style scoped></style>