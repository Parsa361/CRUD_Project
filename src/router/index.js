import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/employee/',
      name: 'EmployeeList',
      component: () => import('../views/EmployeeListView.vue'),
      props: true
    },
    {
      path: '/employee/:employeeId',
      name: 'EmployeeInformation',
      component: () => import('../views/EmployeeInformationView.vue'),
      props: true
    },
    {
      path: '/employee-dropdown',
      name: 'EmployeeDropDown',
      component: () => import('../views/EmployeeDropDownView.vue'),
      props: true
    },

  ]
});

export default router;
