import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from '../views/Blogs.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgetPassword from '../views/ForgetPassword.vue';
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';
import CreatePost from '../views/CreatePost.vue';
import BlogPreview from '../views/BlogPreview.vue';
import ViewBlog from '../views/ViewBlog.vue';
import EditBlog from '../views/EditBlog.vue';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: 'Home',
		}
	},
	{
		path: "/blogs",
		name: "Blogs",
		component: Blogs,
		meta: {
			title: 'Blogs',
		}
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		meta: {
			title: 'Login',
		}
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
		meta: {
			title: 'Register',
		}
	},
	{
		path: "/forget-password",
		name: "ForgetPassword",
		component: ForgetPassword,
		meta: {
			title: 'ForgetPassword',
		}
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		meta: {
			title: 'Profile',
		}
	},
	{
		path: "/admin",
		name: "Admin",
		component: Admin,
		meta: {
			title: 'Admin',
		}
	},
	{
		path: "/create-post",
		name: "CreatePost",
		component: CreatePost,
		meta: {
			title: 'Create Post',
		}
	},
	{
		path: "/blog-preview",
		name: "BlogPreview",
		component: BlogPreview,
		meta: {
			title: 'BlogPreview',
		}
	},
	{
		path: "/view-blog/:blogid",
		name: "ViewBlog",
		component: ViewBlog,
		meta: {
			title: 'ViewBlog',
		}
	},
	{
		path: "/edit-blog/:blogid",
		name: "EditBlog",
		component: EditBlog,
		meta: {
			title: 'EditBlog',
		}
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | vue-blog`
	console.log(to)
	console.log(from)
	console.log(next)
	next()
})


export default router;
