<template>
	<div class="home">
		<!-- 將data中的資料傳入BlogPost的組件中 -->
		<!-- 要是使用者沒登入，顯示此區塊 -->
		<BlogPost v-if="!user" :post="welcomeScreen" />
		<!-- 以下為版面假資料 -->
		<!-- <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" /> -->
		<!-- 以下為firebase中的資料 -->
		<BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />
		<div class="blog-card-wrap">
			<div class="container">
				<h3>閱讀近期的文章</h3>
				<div class="blog-cards">
					<BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
				</div>
			</div>
		</div>
		<!-- <div v-if="!user" class="updates">
			<div class="container">
				<h2>never miss a post. Register for your free account today!</h2>
				<router-link class="router-button" to="#">
					Register for vue-blog<Arrow class="arrow arrow-light"/>
				</router-link>
			</div>
		</div> -->
	</div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue'
import BlogCard from '../components/BlogCard.vue'
// import Arrow from '../assets/Icons/arrow-right-light.svg'
export default {
	name: "Home",
	components: {
		BlogPost,
		BlogCard,
		// Arrow,
	},
	data() {
		return{
			welcomeScreen: {
				title: 'welcome',
				blogPost: '',
				welcomeScreen: true,
				photo: 'landscape',
				blogTitle_1: '歡迎來到',
				blogTitle_2: 'HOWHOW的',
				blogTitle_3: '部落格'
			},
			// 以下為版面的假資料
			// sampleBlogPost: [
			// 	{
			// 		title: 'This is a Filter Title!',
			// 		blogHTML: 'This is a filter blog post title!',
			// 		blogCoverPhoto: 'beautiful-stories',
			// 	},
			// 	{
			// 		title: 'This is a Filter Title!',
			// 		blogHTML: 'This is a filter blog post title!',
			// 		blogCoverPhoto: 'designed-for-everyone',
			// 	}
			// ],
		}
	},
	computed: {
		// 以下為版面的假資料
		// 透過vuex取值
		// sampleBlogCards(){
		// 	return this.$store.state.sampleBlogCards
		// },
		// 以下為真正在firebase中的資料
		blogPostsFeed(){
			return this.$store.getters.blogPostsFeed;
		},
		blogPostsCards(){
			return this.$store.getters.blogPostsCards;
		},
		user(){
            return this.$store.state.user;
        }
	}
};
</script>

<style lang="scss" scoped>
.blog-card-wrap{
	h3{
		font-weight: 300;
		font-size: 28px;
		margin-bottom: 32px;
	}
}

.updates{
	.container{
		padding: 100px 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		@media (min-width: 800px){
			padding: 125px 25px;
			flex-direction: row;
		}
	}

	.router-button{
		display: flex;
		font-size: 14px;
		text-decoration: none;
		@media (min-width: 800px){
			margin-left: auto;
		}
	}

	h2{
		font-weight: 300;
		font-size: 32px;
		max-width: 425px;
		width: 100%;
		text-align: center;
		text-transform: uppercase;
		@media (min-width: 800px){
			text-align: initial;
			font-size: 40px;
		}
	}
}
</style>
