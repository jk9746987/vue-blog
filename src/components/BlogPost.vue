<template>
    <div class="blog-wrapper" :class="{'no-user': !user}">
        <!-- 以下為假資料時使用 -->
        <!-- <div class="blog-content">
            <div>
                獲取到welcomeScreen為true時使用welcomeScreen.title 
                else使用sampleBlogPost.title
                <h2 v-if="post.welcomeScreen">{{post.title}}</h2>
                <h2 v-else>{{post.title}}</h2>
                <p v-if="post.welcomeScreen">{{post.blogPost}}</p>
                <p class="content-preview" v-else>{{post.blogHTML}}</p>
                <router-link class="link link-light" v-if="post.welcomeScreen" to="#">
                    Login/Register<Arrow class="arrow arrow-light" />
                </router-link>
                <router-link class="link" v-else to="#">
                    View The Post<Arrow class="arrow" />
                </router-link>
            </div>
        </div>
        <div class="blog-photo">
            當路徑名有變數時，需使用require引入
            <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="">
            <img v-else :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)" alt="">
        </div> -->
        <!-- 以下為firebase中的資料 -->
        <div class="blog-content">
            <div>
                <h2 v-if="post.welcomeScreen" :class="{firstitle: post.welcomeScreen}">
                    <span>{{post.blogTitle_1}}</span><br>
                    <span>{{post.blogTitle_2}}</span><br>
                    <span>{{post.blogTitle_3}}</span><br>
                </h2>
                <h2 v-else>{{post.blogTitle}}</h2>
                <p v-if="post.welcomeScreen">{{post.blogPost}}</p>
                <p class="content-preview" v-else v-html="post.blogHTML"></p>
                <router-link class="link link-light" v-if="post.welcomeScreen" :to="{name: 'Login'}">
                </router-link>
                <router-link class="link" v-else :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
                    查看貼文<Arrow class="arrow" />
                </router-link>
            </div>
        </div>
        <div class="blog-photo">
            <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="">
            <img v-else :src="post.blogCoverPhoto" alt="">
        </div>
    </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg'
export default {
    name: 'BlogPost',
    // 接收父層給的data
    props: ['post'],
    components: {
        Arrow,
    },
    created(){
        console.log(this.post)
    },
    computed: {
        user(){
            return this.$store.state.user;
        }
    }
}
</script>

<style lang="scss" scoped>
.blog-wrapper{
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    @media (min-width: 700px){
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .blog-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 4;
        order: 2;
        @media (min-width: 700px){
            order: 1;
        }
        @media (min-width: 800px){
            flex: 3;
        }

        div{
            max-width: 375px;
            padding: 72px 24px;
            @media (min-width: 700px){
                padding: 0 24px;
            }

            h2 {
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;
                @media (min-width: 700px){
                    font-size: 40px;
                }
            }

            p{
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview{
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .link{
                display: inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition: .5s ease-in all;

                &:hover{
                    border-bottom-color: #303030;
                }
            }

            .link-light{
                &:hover{
                    border-bottom-color: #fff;
                }
            }
        }
    }

    .blog-photo{
        order: 1;
        flex: 3;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        @media (min-width: 700px){
            order: 2;
        }
        @media (min-width: 800px){
            flex: 4;
        }

        img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:nth-child(even){
        .blog-content{
            order: 2;
        }
        .blog-photo{
            order: 1;
        }
    }
}

.no-user:first-child{
    .blog-content{
        background-color: #303030;
        color: #fff;
    }
}

.firstitle{
    text-align: center;
}
</style>