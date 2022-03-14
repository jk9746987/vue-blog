<template>
    <header>
          <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{name: 'Home'}">Vue-Blog</router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{name: 'Home'}">首頁</router-link>
                    <router-link class="link" :to="{name: 'Blogs'}">部落格文章</router-link>
                    <router-link v-if="webmaster" class="link" :to="{name: 'CreatePost'}">撰寫文章</router-link>
                    <router-link v-if="!user" class="link" :to="{name: 'Login'}">站長登入</router-link>
                </ul>
                <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                    <span>{{this.$store.state.profileInitials}}</span>
                    <div v-show="profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="initials">{{this.$store.state.profileInitials}}</p>
                            <div class="right">
                                <p>{{this.$store.state.profileFirstName}}  {{this.$store.state.profileLastName}}</p>
                                <p>{{this.$store.state.profileUserName}}</p>
                                <p>{{this.$store.state.profileEmail}}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <router-link class="option" :to="{ name: 'Profile'}">
                                    <userIcon class="icon"/>
                                    <p>Profile</p>
                                </router-link>
                            </div>
                            <!-- <div class="option">
                                <router-link class="option" :to="{ name: 'Admin'}">
                                    <adminIcon class="icon"/>
                                    <p>Admin</p>
                                </router-link>
                            </div> -->
                            <div @click="signOut" class="option">
                                <signOutIcon class="icon"/>
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- 當營幕寬度小於750時，moble為true，出現漢堡 -->
        <!-- 點擊漢堡切換this.mobileNav的狀態 -->
        <menuIcon class="menu-icon" @click="toggleMobileNav" v-show="mobile" />
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" :to="{name: 'Home'}">首頁</router-link>
                <router-link class="link" :to="{name: 'Blogs'}">部落格文章</router-link>
                <router-link v-if="webmaster" class="link" :to="{name: 'CreatePost'}">撰寫文章</router-link>
                <router-link v-if="!user" class="link" :to="{name: 'Login'}">站長登入</router-link>
            </ul>
        </transition>
    </header>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';
// import adminIcon from '../assets/Icons/user-crown-light.svg';
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
import firebase from "firebase/app";
import "firebase/auth";

export default {
    name: 'navigation',
    components:{
        menuIcon,
        userIcon,
        // adminIcon,
        signOutIcon
    },
    data(){
        return{
            profileMenu: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null,
        }
    },
    created(){
        // 調整視窗時使用此事件(RWD)
        window.addEventListener('resize',this.checkScreen)
        this.checkScreen();
        // console.log(this.$store.state.profileInitials)
    },
    methods:{
        checkScreen(){
            this.windowWidth = window.innerWidth;
            console.log(this.windowWidth)
            if(this.windowWidth <= 750){
                return this.mobile = true;
            }
            this.mobile = false;
            this.mobileNav = false;
        },
        toggleMobileNav(){
            this.mobileNav = !this.mobileNav;
        },
        toggleProfileMenu(e){
            if(e.target === this.$refs.profile){
                this.profileMenu = !this.profileMenu;
            }
        },
        signOut(){
            firebase.auth().signOut();
            window.location.reload();
        }
    },
    computed: {
        user(){
            return this.$store.state.user;
        },
        webmaster(){
            return this.$store.state.webmasterlogin;
        }
    }
}
</script>

<style lang="scss" scoped>
header{
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
    z-index: 99;

    .link{
        font-weight: 700;
        padding: 0 8px;
        transition: .3s color ease;

        &:hover{
            color: #1eb8b8;
        }
    }

    nav{
        display: flex;
        padding: 25px 0;

        .branding{
            display: flex;
            align-items: cetner;

            .header{
                font-weight: 800;
                font-size: 24px;
                color: #000;
                text-decoration: none;
            }
        }

        .nav-links{
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul{
                margin-right: 32px;

                .link{
                    margin-right:32px;
                }

                .link:last-child{
                    margin-right: 0;
                }
            }

            .profile{
                position: relative;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #fff;
                background-color: #303030;
                @media (max-width: 750px) {
                    right: 40px;
                }

                span{
                    // 穿透該元素，可點擊該元素下方的區塊
                    pointer-events: none;
                }

                .profile-menu{
                    position: absolute;
                    top: 65px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);

                    .info{
                        display: flex;
                        align-items: center;
                        padding: 10px 10px 10px 15px;
                        border-bottom: 1px solid #fff;

                        .initials{
                            // position: initial;
                            width: 40px;
                            height: 40px;
                            background-color: #fff;
                            color: #303030;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        }
                        
                        .right{
                            margin-left: 15px;
                            
                            p:nth-child(1){
                                font-size: 14px;
                            }

                            p:nth-child(2),p:nth-child(3 ){
                                font-size: 12px;
                            }
                        }
                    }

                    .options{
                        padding: 15px;
                        .option{
                            text-decoration: none;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;

                            .icon{
                                width: 18px;
                            }

                            p{
                                font-size: 14px;
                                margin-left: 12px;
                            }

                            &:hover{
                                color: #1eb8b8;
                            }

                            &:last-child{
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
        }
    }

    .menu-icon{
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        width: auto;
    }

    .mobile-nav{
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: #303030;
        top: 0;
        left: 0;

        .link{
            padding: 15px 0;
            color: #fff;

            &:hover{
                color: #1eb8b8;
            }
        }
    }
    
    // transition組件的class語法
    // enter-active&leave-active為轉場的過程
    .mobile-nav-enter-active,.mobile-nav-leave-active{
        transition: all 1s ease;
    }

    // 進場前的樣式
    .mobile-nav-enter{
        transform: translateX(-250px);
    }

    // 進場結束時的樣式
    .mobile-nav-enter-to{
        transform: translateX(0);
    }

    // 退場結束時的樣式
    .mobile-nav-leave-to{
        transform: translateX(-250px);
    }
}
</style>