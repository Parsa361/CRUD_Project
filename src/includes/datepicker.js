import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import Vue from 'vue';

Vue.use(VuePersianDatetimePicker, {
    name: 'custom-date-picker',
    props: {
        format: 'YYYY-MM-DD HH:mm',
        displayFormat: 'jYYYY-jMM-jDD HH:mm',
        editable: false,
        inputClass: 'form-control my-custom-class-name',
        placeholder: 'لطفا تاریخ انتخاب کنید.',
        altFormat: 'YYYY-MM-DD HH:mm',
        color: '#00acc1',
        autoSubmit: true,
    }
});

Vue.component('date-picker', VuePersianDatetimePicker);