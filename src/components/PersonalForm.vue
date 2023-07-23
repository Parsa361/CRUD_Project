<template>
    <div class="flex flex-wrap justify-between">
        <!-- firstname container -->
        <BaseInput v-model="employee.firstName" name="firstname" rules="required|alpha_spaces" type="text" labelName="نام"
            placeHolder="احسان" />
        <!-- lastname container-->
        <BaseInput v-model="employee.lastName" name="lastname" rules="required|alpha_spaces" type="text"
            labelName="نام خانوادگی" placeHolder="رجبی" />
        <!-- birth container -->
        <div class="flex flex-col mb-4">
            <label for="dateOfBirth" class="mr-4">تاریخ تولد</label>
            <input v-model="employee.dateOfBirth" placeholder="انتخاب کنید"
                class="rounded-sm w-[300px] outline-none custom-input custom-date" type="text" onfocus="(this.type='date')"
                id="dateOfBirth" />
        </div>
        <!-- email container -->
        <BaseInput v-model="employee.email" name="email" rules="required|email" type="email" labelName="ایمیل"
            placeHolder="" />
    </div>
</template>

<script>
import BaseInput from './Base/BaseInput.vue';
export default {
    props: ["employee"],
    components: { BaseInput }
};
</script>

<style scoped>
.custom-date::placeholder {
    text-align: left;
}
</style>