<template>
    <div class="blog-card">
        <div class="icons" v-show="editPost">
            <div class="icon" @click="editBlog">
                <Edit class="edit"/>
            </div>
            <div class="icon" @click="deletPost">
                <Delete class="delete"/>
            </div>
        </div>
        <router-link class="link" :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
            <!-- 以下為假資料 -->
            <!-- <img :src="require(`../assets/blogCards/${post.blogCoverPhoto}.jpg`)" alt=""> -->
            <!-- 以下為firebase中的資料 -->
            <div class="img_container">
                <img :src="post.blogCoverPhoto" alt="">
            </div>
            <div class="info">
                <h4>{{post.blogTitle}}</h4>
                <!-- 以下為假資料 -->
                <!-- <h6>Posted on:{{post.blogDate}}</h6> -->
                <!-- 以下為firebase中的資料 -->
                <h6>發布日期:{{new Date(post.blogDate).toLocaleString('zh-TW', {dateStyle: "long"})}}</h6>
                <span>
                    查看貼文<Arrow class="arrow"/>
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg'
import Edit from '../assets/Icons/edit-regular.svg'
import Delete from '../assets/Icons/trash-regular.svg'

export default {
    name: 'blogCard',
    props: ['post'],
    components: {
        Arrow,
        Edit,
        Delete
    },
    computed: {
        editPost(){
            return this.$store.state.editPost
        }
    },
    methods: {
        deletPost(){
            if(confirm('要刪除文章嗎?')){
                this.$store.dispatch("deletePost", this.post.blogID)
            }
        },
        editBlog(){
            if(confirm('要編輯文章嗎?')){
                this.$router.push({name: "EditBlog", params: {blogid: this.post.blogID}})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.blog-card{
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: .5s ease all;

    &:hover{
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    }

    .icons{
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;

        .icon{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: .5s ease all;

            &:hover{
                background-color: #303030;

                .edit,.delete{
                    path{
                        fill: #fff;
                    }
                }
            }

            &:nth-child(1){
                margin-right:8px;
            }

            .edit,.delete{
                pointer-events: none;
                height: 15px;
                width: auto;
            }

        }
    }

    .link{
        // display: inline-flex;
        align-items: center;
        font-weight: 500;
        // padding-top: 20px;
        font-size: 12px;
        padding-bottom: 4px;
        transition: .5s ease-in all;

        .img_container{
            width: 350px;
            height: 250px;
            display: flex;

            img{
                display: block;
                border-radius: 8px 8px 0 0;
                z-index: 1;
                width: 100%;
                max-height: 250px;
                object-fit: cover;
            }
        }
   
    
        .info{
            display: flex;
            flex-direction: column;
            z-index: 3;
            padding: 32px 16px;
            color: #000;
        
            h4{
                padding-bottom: 8px;
                font-size: 20px;
                font-weight: 300;
            }

            h6{
                font-weight: 600;
                font-size: 12px;
                padding-bottom: 16px;
            }

            &:hover{
                color: rgba(48,48,48,.8)
            }

            .arrow{
                width: 10px;
            }
        }
    }

}
</style>