import Vue from 'vue';
import Router from 'vue-router';
import List from '../pages/List';
import AddOrEdit from '../pages/AddOrEdit';

import io from '../components/IListenToSockets';



Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'List',
      component: List,
    },
    {
      path: '/add',
      name: 'add',
      component: AddOrEdit,

    },
    {
      path: '/edit/:bookId',
      name: 'edit',
      component: AddOrEdit,
      props: ({
        params: {
          bookId
        }
      }) => ({
        bookId: parseInt(bookId, 10)
      })
    },
    {
      path: '/io',
      name: 'io',
      component: io,
    },

  ],

});
