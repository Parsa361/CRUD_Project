import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import { required, email, alpha_spaces } from 'vee-validate/dist/rules';

export default {
    install(app) {
        app.component('ValidationProvider', ValidationProvider);
        app.component('ValidationObserver', ValidationObserver);

        extend('email', {
            ...email,
            message: 'لطفا یک ایمیل معتبر وارد کنید.'
        });
        extend('alpha_spaces', {
            ...alpha_spaces,
            message: 'نام/نام خانوادگی معتبر نیست.'
        });
        extend('required', {
            ...required,
            message: 'لطفا فیلد را پر کنید.'
        });
    },
};