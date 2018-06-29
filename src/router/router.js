import Vue from  'vue';
import Router from 'vue-router';
import list from '../components/list';

Vue.use(Router);

let routes = [
	{
		path: '/',
		component: 'list'
	},
	{
		path: '/list',
		component: 'list'
	}
];

export default new Router({
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})
