<template>
    <div>
        <div v-for="(familyMember, index) in employeeFamily" :key="index"
            class="relative border-2 rounded-sm px-8 pt-8 pb-2 mt-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-center">
                <p class="font-medium text-2xl absolute top-[-20px] right-6 bg-white px-4">
                    #{{ index + 1 }}
                </p>

                <p class="absolute top-[-20px] right-20 bg-white px-4">
                    <span class="material-icons bg-red-500 text-white rounded-md cursor-pointer p-1"
                        @click="deleteFamilyMember(index)">delete_forever</span>
                </p>
            </div>
            <div class="flex flex-wrap justify-between">
                <!-- family member name -->
                <div class="flex flex-col mb-4">
                    <label :for="'family-name-' + index" class="mr-4">نام</label>
                    <input :id="'family-name-' + index" type="text" v-model.trim="familyMember.firstname" placeholder="مریم"
                        class="rounded-sm w-full outline-none custom-input" />
                </div>
                <!-- family member last name -->
                <div class="flex flex-col mb-4">
                    <label :for="'family-lastname-' + index" class="mr-4">نام خانوادگی</label>
                    <input :id="'family-lastname-' + index" type="text" v-model.trim="familyMember.lastname"
                        placeholder="قربانی" class="rounded-sm w-full outline-none custom-input" />
                </div>
                <!-- family member birth -->
                <div class="flex flex-col mb-4">
                    <label :for="'family-dateOfBirth-' + index" class="mr-4">تاریخ تولد</label>
                    <input :id="'family-dateOfBirth-' + index" type="date" v-model="familyMember.dateOfBirth"
                        placeholder="انتخاب کنید" class="rounded-sm w-full outline-none custom-input" />
                </div>
                <!-- family member relatin -->
                <div class="flex flex-col mb-4">
                    <label :for="'relation-' + index" class="mr-4">نسبت</label>
                    <select :id="'relation-' + index" v-model="familyMember.relation"
                        class="rounded-sm w-[210px] outline-none custom-input">
                        <option value="spouse" selected>همسر</option>
                        <option value="son">پسر</option>
                        <option value="daughter">دختر</option>
                    </select>
                </div>

            </div>
        </div>
        <!-- Add more family member input -->
        <BaseButton class="bg-blue-500" type="button" @click="addFamilyMember">افزودن عضو</BaseButton>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
export default {
    props: ['employeeFamily'],
    methods: {
        deleteFamilyMember(index) {
            this.employeeFamily.splice(index, 1);
        },
        addFamilyMember() {
            this.employeeFamily.push({
                name: "",
                dateOfBirth: "",
                relation: "",
            });
        },

    },
    components: { BaseButton }
};
</script>

<style scoped></style>