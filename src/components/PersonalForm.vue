<template>
    <div class="flex flex-wrap justify-between">
        <!-- firstname container -->
        <div class="flex flex-col mb-4">
            <label for="firstname" class="mr-4">نام</label>
            <input id='firstname' type="text" placeholder="احسان" v-model.trim="employee.firstName"
                class="rounded-sm w-[300px] outline-none custom-input" :class="firstNameErrorMsg ? 'border-red-500' : ''" />
            <div v-if="firstNameErrorMsg" class="text-red-500">{{ firstNameErrorMsg }}</div>
        </div>
        <!-- lastname container-->
        <div class="flex flex-col mb-4">
            <label for="lastname" class="mr-4">نام خانوادگی</label>
            <input id='lastname' type="text" placeholder="رجبی" v-model.trim="employee.lastName"
                class="rounded-sm w-[300px] outline-none custom-input" :class="lastNameErrorMsg ? 'border-red-500' : ''" />
            <div v-if="lastNameErrorMsg" class="text-red-500">{{ lastNameErrorMsg }}</div>
            <!-- birth container -->
        </div>
        <div class="flex flex-col mb-4">
            <label for="dateOfBirth" class="mr-4">تاریخ تولد</label>
            <input v-model="employee.dateOfBirth" placeholder="انتخاب کنید"
                class="rounded-sm w-[300px] outline-none custom-input custom-date" type="text" onfocus="(this.type='date')"
                id="dateOfBirth" />
        </div>
        <!-- email container -->
        <div class="flex flex-col mb-4">
            <label for="email" class="mr-4">ایمیل</label>
            <input id='email' type="email" v-model.trim="employee.email"
                class="rounded-sm w-[300px] outline-none custom-input" :class="emailErrorMsg ? 'border-red-500' : ''" />
            <div v-if="emailErrorMsg" class="text-red-400">{{ emailErrorMsg }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['employee', 'firstNameErrorMsg', 'lastNameErrorMsg', 'emailErrorMsg'],
    data() {
        return {
        };
    }
};
</script>

<style scoped>
.custom-date::placeholder {
    text-align: left;
}
</style>