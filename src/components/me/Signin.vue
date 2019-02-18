<template>
    <transition name="slide">
        <div class="sign-in">
            <div ref="wrapper">
            <Back @click.native="onClickBack" :destRoute="'/me'" :title="'登录'"/>

            <div class="form">
                <div class="page-title">企业登录</div>

                <form @submit="handleSubmit">
                    <div v-if="errors.phone" class="err-msg">{{ errors.phone }}</div>
                    <input class="form-phone" type="text" v-model="tester.phone" placeholder="电话"/>
                    <input class="form-code" type="text" v-model="tester.code" placeholder="验证码">
                    <mt-button class="form-get-code" type="submit">
                        获取验证码
                    </mt-button>
                    <div style="width: 100%; border-bottom: 1px solid gray"/>
                    <mt-button class="form-submit" type="submit">
                        登录
                    </mt-button>
                </form>
            </div>
            <router-link tag="div" @click.native="onClickSubRoute" class="helper-text" to="/me/sign-in/sign-up">
                还没有账号? 请注册
            </router-link>
        </div>
            <router-view @backToMe="onBackToMe"></router-view>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';
    import axios from 'axios';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Signin",
        components: {
            Back
        },
        methods: {
            ...mapActions(['login']),
            onClickBack() {
                this.$emit('backToMe', null);
            },
            onClickSubRoute() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'faster');
                element.classList.add('animated', 'slideOutLeft');
            },
            onBackToMe() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideOutLeft');
                element.classList.add('animated', 'slideInLeft', 'faster');
            },
            handleSubmit(e) {
                e.preventDefault();
                if (this.checkForm()) {
                    // Send data to the server or update your stores and such.
                    axios.post('https://woyaotest.com/tester-login', {
                        phone: this.tester.phone,
                        code: this.tester.code
                    })
                        .then((res) => {
                            if (!res.data.success) {
                                if (res.data.errorCode === '0001') {
                                    this.errors.response = '该电话号码已经使用，请尝试其他号码。'
                                }
                            } else {
                                this.errors.response = null;
                                this.login({ token: res.data.token, uuid: res.data.uuid });
                            }
                        })
                        .catch(function (err) {
                            err
                        });
                }
            },
            checkForm() {
                if (!this.tester.phone.match(/1[\d]{10}/)) {
                    this.errors.phone = '手机号必须为以1开头的11位数字';
                    return false;
                }

                this.errors.phone = null;
                return true;
            }

        },
        data() {
            return {
                errors: {
                    phone: ''
                },
                tester: {
                    phone: '',
                    code: ''
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .sign-in {
        position: fixed;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 89;
        background-color: $bg-theme-color;
    }
    .form {
        width: 80%;
        margin: 10px auto;
    }
    .form-phone {
        display: block;
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        margin: 10px auto;
        padding: 0 0 0 10px;
        font-size: $ft-form-normal;
    }
    .form-code {
        display: inline-block;
        width: 55%;
        height: 40px;
        border: none;
        margin: 10px 0;
        padding: 0 0 0 10px;
        font-size: $ft-form-normal;
        background-color: $bg-theme-color;
    }
    .form-get-code {
        display: inline-block;
        width: calc(45% - 10px);
        color: white;
        margin: 10px 0;
        font-size: $ft-form-normal;
        background-color: gray;
    }
    .form-submit {
        width: 100%;
        color: white;
        margin: 30px 0 5px 0;
        background-color: $theme-color;
    }
    .helper-text {
        width: 80%;
        margin: 0 auto;
        font-weight: $ft-weight;
        text-decoration: underline;
        font-size: $ft-form-normal;
    }
    .err-msg {
        font-size: $ft-form-err-msg;
        color: red;
    }
    .page-title {
        font-size: $ft-page-title;
        margin: 50px 0;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>