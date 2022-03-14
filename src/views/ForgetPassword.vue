<template>
    <div class="reset-password">
        <!-- 如果modalActive為true，提示字遮罩出現，點選close將modalActive改為false -->
        <!-- close-modal為modal組件的自訂事件 -->
        <modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closemodal" />
        <Loading v-if="loading"/>
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    返回
                    <router-link class="router-link" :to="{name: 'Login'}">登入</router-link>
                </p>
                <h2>重設密碼</h2>
                <p>忘記密碼? 請輸入信箱並重設密碼</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email">
                        <email class="icon"/>
                    </div>
                </div>
                <button @click.prevent="resetPassword()">重設</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg"
import Modal from '../components/Modal'
import Loading from '../components/Loading.vue'
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: 'ForgetPassword',
    data(){
        return{
            email: null,
            modalActive: null,
            modalMessage: '',
            loading: null,
        }
    },
    components: {
        email,
        Modal,
        Loading
    },
    methods: {
        resetPassword(){
            if(this.email === null || this.email === ''){
                this.modalMessage = '請輸入信箱';
                this.modalActive = true;
            }else{
                this.loading = true;
                firebase.auth().sendPasswordResetEmail(this.email).then( () => {
                    this.modalMessage = '若是信箱無誤，請至信箱收信並更改密碼';
                    this.loading = false;
                    this.modalActive = true;
                }).catch( err => {
                    this.modalMessage = err.message;
                    this.loading = false;
                    this.modalActive = true;
                });
            }
            
        },
        closemodal(){
            this.modalActive = !this.modalActive;
            this.email = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.reset-password{
    position: relative;
    .form-wrap{
        .reset{
            h2{
                margin-bottom: 8px;
            }

            p{
                text-align: center;
                margin-bottom: 32px;
            }
        }
    }
}
.form-wrap{
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 900px){
        width: 100%;
    }

    .login-register{
        margin-bottom: 32px;

        .router-link{
            color: #000;
        }
    }

    form{
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        @media (min-width: 900px){
            padding: 0 50px;
        }

        h2{
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;
            @media (min-width: 900px){
                font-size: 40px;
            }
        }

        .inputs{
            width: 100%;
            max-width: 350px;

            .input{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;

                input{
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus{
                        outline: none;
                    }
                }

                .icon{
                    width: 12px;
                    position: absolute;
                    left: 10px;
                }
            }
        }

        .forgot-password{
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 32px;
            border-bottom: 1px solid transparent;
            transition: .5s ease all;

            &:hover{
                border-color: #303030;
            }
        }

        .angle{
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;
            @media (min-width: 900px){
                display: block;
            }
        }
    }

    .background{
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url('../assets/background.png');
        width: 100%;
        height: 100%;
        @media (min-width: 900px){
            display: block;
        }
    }
}
</style>