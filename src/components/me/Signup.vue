<template>
    <transition name="slide">
        <div class="sign-in">
            <Back @click.native="onClickBack" :destRoute="'/me/sign-in'" :title="'注册'"/>

            <div class="form">
                <div class="page-title">企业注册</div>

                <form @submit.prevent="handleSubmit">
                    <div v-if="errors.name" class="err-msg">{{ errors.name }}</div>
                    <input class="form-mobile" type="text" v-model="tester.name" placeholder="企业名称"/>
                    <div>
                        <div v-if="errors.industry" style="display: inline-block;width: 50%"><div class="err-msg">{{ errors.industry }}</div></div>
                        <div v-if="errors.size" style="display: inline-block;width: 50%"><div class="err-msg">{{ errors.size }}</div></div>
                    </div>
                    <div class="form-picker" @click="showPicker">
                        <div class="industry">{{ tester.industry === null ? '行业' : tester.industry }}</div>
                        <div class="size">{{ tester.size === null ? '规模' : tester.size }} (人)</div>
                    </div>
                    <awesome-picker
                            ref="picker"
                            :data="picker.data"
                            :anchor="picker.anchor"
                            :textTitle="picker.textTitle"
                            :textConfirm="picker.textConfirm"
                            :textCancel="picker.textCancel"
                            :colorTitle="picker.colorTitle"
                            :colorConfirm="picker.colorConfirm"
                            :colorCancel="picker.colorCancel"
                            :swipeTime="picker.swipeTime"
                            @cancel="handlePickerCancel"
                            @confirm="handlePickerConfirm">
                    </awesome-picker>

                    <div v-if="errors.mobile" class="err-msg">{{ errors.mobile }}</div>
                    <input class="form-mobile" type="text" v-model="tester.mobile" placeholder="手机">
                    <div v-if="errors.code" class="err-msg">{{ errors.code }}</div>
                    <input class="form-code" type="text" v-model="tester.code" placeholder="验证码">
                    <mt-button @click="onGetCode" class="form-get-code" type="primary" :disabled="getCodeBtn.disabled">
                        获取验证码
                    </mt-button>
                    <div style="width: 100%; border-bottom: 1px solid gray; margin-bottom: 10px;"/>
                    <div v-if="errors.response" class="err-msg">{{ errors.response }}</div>
                    <mt-button class="form-submit" type="submit" :disabled="signupBtn.disabled">
                        注册
                    </mt-button>
                </form>
            </div>
            <router-link tag="div" @click.native="onClickBack" class="helper-text" to="/me/sign-in">
                已有账号， 进行登录
            </router-link>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';
    import axios from 'axios';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Signup",
        components: {
            Back
        },
        computed: {
            ...mapGetters(['isLoggedIn'])
        },
        methods: {
            ...mapActions(['login']),
            onClickBack() {
                this.$emit('backToMe', null);
            },
            onGetCode(e) {
                e.preventDefault();
                if (!this.tester.mobile || !this.tester.mobile.match(/^1[\d]{10}$/)) {
                    this.errors.mobile = '请输入有效手机号';
                    return;
                } else {
                    this.errors.mobile = null;
                }

                this.getCodeBtn.disabled = true;
                axios.post('https://woyaotest.com/sms', {
                    mobile: this.tester.mobile
                })
                    .then((res) => {
                        if (!res.data.success) {
                            this.errors.response = '验证码发送失败，请再次获取。'
                        } else {
                            this.errors.response = null;
                        }
                        this.getCodeBtn.disabled = false;
                    })
                    .catch(function (err) {
                        this.errors.response = '验证码发送失败，请再次获取。'
                        this.getCodeBtn.disabled = false;
                    });
            },
            handleSubmit(e) {
                e.preventDefault();
                if (this.checkForm()) {
                    this.signupBtn.disabled = true;

                    axios.post('https://woyaotest.com/new-tester', {
                        name: this.tester.name,
                        industry: this.tester.industry,
                        size: this.tester.size,
                        mobile: this.tester.mobile,
                        code: this.tester.code
                    })
                        .then((res) => {
                            if (!res.data.success) {
                                if (res.data.errorCode === '0001') {
                                    this.errors.response = '该手机号码已经使用，请尝试其他号码。'
                                } else if (res.data.errorCode === '0005') {
                                    this.errors.response = '验证码不正确，请重新输入或获取。';
                                }
                                this.signupBtn.disabled = false;
                            } else {
                                this.errors.response = null;
                                this.login({ token: res.data.token.value, uuid: res.data.tester.uuid });
                            }
                        })
                        .catch(function (err) {
                            this.errors.response = '验证码不正确，请重新输入或获取';
                            this.signupBtn.disabled = false;
                        });
                }
            },
            showPicker() {
                this.$refs.picker.show();
            },
            handlePickerCancel() {

            },
            handlePickerConfirm(e) {
                this.tester.industry = e[0].value;
                this.tester.size = e[1].value;
            },
            checkForm() {
                let success = true;

                if (!this.tester.name) {
                    this.errors.name = '企业名不能为空';
                    success = false;
                } else {
                    this.errors.name = null;
                }

                if (!this.tester.industry) {
                    this.errors.industry = '行业不能为空';
                    success = false;
                } else {
                    this.errors.industry = null;
                }

                if (!this.tester.size) {
                    this.errors.size = '规模不能为空';
                    success = false;
                } else {
                    this.errors.size = null;
                }

                if (!this.tester.mobile || !this.tester.mobile.match(/^1[\d]{10}$/)) {
                    this.errors.mobile = '请输入有效手机号';
                    success = false;
                } else {
                    this.errors.mobile = null;
                }

                if (!this.tester.code) {
                    this.errors.code = '验证码不能为空';
                    success = false;
                } else {
                    this.errors.code = null;
                }

                return success;
            }
        },
        data() {
            return {
                errors: {
                  name: null,
                  industry: null,
                  size: null,
                  mobile: null,
                  code: null,
                  response: null
                },
                tester: {
                    name: null,
                    industry: null,
                    size: null,
                    mobile: null,
                    code: null
                },
                picker: {
                    data: [
                        ['互联网','通讯','交通','零售','建筑','金融','软件','政府','医疗','健康','制造业','汽车','媒体','能源','教育','咨询'],
                        ['20','20-50','50-100','100-500','500-1000','1000以上']
                    ]
                },
                getCodeBtn: {
                    disabled: false,
                    message: null
                },
                signupBtn: {
                    disabled: false
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
    .form-picker {
        display: block;
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: white;
        margin: 10px auto;
        padding: 0 0 0 10px;
        font-size: $ft-form-normal;
    }
    .industry, .size {
        display: inline-block;
        width: 50%;
        padding: 12px 0;
    }
    .form-mobile {
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
        background-color: $theme-color;
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
        margin: 50px 0 20px 0;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>