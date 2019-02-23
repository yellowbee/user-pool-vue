<template>
    <transition name="slide">
        <div class="sign-in">
            <div style="position: fixed;width: 100%">
                <Back :destRoute="'/tasks'" :title="'企业用户-发布任务'"/>
            </div>

            <div class="form">
                <div class="page-title">任务填写</div>

                <form @submit.prevent="handleSubmit">
                    <div v-if="errors.name" class="err-msg">{{ errors.name }}</div>
                    <input class="form-mobile" type="text" v-model="task.name" placeholder="任务名称"/>
                    <div v-if="errors.desc" class="err-msg">{{ errors.desc }}</div>
                    <textarea class="form-mobile form-desc" v-model="task.desc" placeholder="任务描述(请在此处写明测试方式，地点，时间)"/>

                    <div class="section-title">参加测试者标准</div>
                    <div v-if="errors.profile" class="err-msg">{{ errors.profile }}</div>
                    <div class="form-picker" @click="showPicker">
                        <div class="picker-item" style="width: 20%;">{{ task.age === null ? '年龄' : task.age }}</div>
                        <div class="picker-item" style="width: 20%;">{{ task.sex === null ? '性别' : task.sex }}</div>
                        <div class="picker-item" style="width: 30%;">{{ task.industry === null ? '职业' : task.industry }}</div>
                        <div class="picker-item" style="width: 30%;">{{ task.edu === null ? '学历' : task.edu }}</div>
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

                    <div class="section-title">悬赏</div>
                    <div v-if="errors.pay" class="err-msg">{{ errors.pay }}</div>
                    <div class="flex-container">
                        <div class="form-pay-type" @click="showPickerPay">{{ task.payType === null ? '悬赏方式' : task.payType }}</div>
                        <input class="form-pay-desc" type="text" v-model="task.payDesc" placeholder="悬赏额度"/>
                    </div>
                    <awesome-picker
                            ref="pickerPay"
                            :data="pickerPay.data"
                            @cancel="handlePickerPayCancel"
                            @confirm="handlePickerPayConfirm">
                    </awesome-picker>

                    <div class="section-title">联系方式</div>
                    <div v-if="errors.mobile" class="err-msg">{{ errors.mobile }}</div>
                    <div class="flex-container">
                        <input class="form-contact" style="width: 100%;" type="text" v-model="task.mobile" placeholder="手机"/>
                    </div>

                    <div v-if="errors.response" class="err-msg">{{ errors.response }}</div>
                    <mt-button class="form-submit" type="submit" :disabled="publishBtn.disabled">
                        发布
                    </mt-button>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
    import Back from '../common/Back';
    import axios from 'axios';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "NewTask",
        components: {
            Back
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'getUuid', 'getToken'])
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                if (this.checkForm()) {
                    this.publishBtn.disabled = true;

                    let { name, desc, age, sex, industry, edu, payType, payDesc, mobile } = this.task;
                    let config = {
                        headers: { 'Authorization': "bearer " + this.getToken }
                    };
                    axios.post('https://woyaotest.com/api/task', {
                        poster_uuid: this.getUuid,
                        name,
                        desc,
                        age,
                        sex,
                        industry,
                        edu,
                        payType,
                        payDesc,
                        mobile
                    }, config)
                        .then((res) => {
                            if (!res.data.success) {
                                this.errors.response = '任务提交没有成功，请再试一次。';
                                this.publishBtn.disabled = false;
                            } else {
                                this.errors.response = null;
                                this.$router.go(-1);
                            }
                        })
                        .catch(function (err) {
                            this.errors.response = '任务提交没有成功，请再试一次。';
                            this.publishBtn.disabled = false;
                        });
                }
            },
            showPicker() {
                this.$refs.picker.show();
            },
            showPickerPay() {
                this.$refs.pickerPay.show();
            },
            handlePickerCancel() {},
            handlePickerConfirm(e) {
                this.task.age = e[0].value;
                this.task.sex = e[1].value;
                this.task.industry = e[2].value;
                this.task.edu = e[3].value;
            },
            handlePickerPayCancel() {},
            handlePickerPayConfirm(e) {
                this.task.payType = e[0].value;
            },
            checkForm() {
                let success = true;

                if (!this.task.name) {
                    this.errors.name = '请填写任务名称';
                    success = false;
                } else {
                    this.errors.name = null;
                }

                if (!this.task.desc) {
                    this.errors.desc = '请填写任务描述';
                    success = false;
                } else {
                    this.errors.desc = null;
                }

                if (!this.task.sex || !this.task.age || !this.task.industry || !this.task.edu) {
                    this.errors.profile = '请填写测试者标准';
                    success = false;
                } else {
                    this.errors.profile = null;
                }

                if (!this.task.payType || !this.task.payDesc ) {
                    this.errors.pay = '请填写悬赏方式或额度';
                    success = false;
                } else {
                    this.errors.pay = null;
                }

                if (!this.task.mobile || !this.task.mobile.match(/^1[\d]{10}$/)) {
                    this.errors.mobile = '请输入有效手机号';
                    success = false;
                } else {
                    this.errors.mobile = null;
                }

                return success;
            }
        },
        data() {
            return {
                errors: {
                    name: null,
                    desc: null,
                    profile: null,
                    pay: null,
                    mobile: null,
                    response: null
                },
                task: {
                    name: null,
                    desc: null,
                    age: null,
                    sex: null,
                    industry: null,
                    edu: null,
                    payType: null,
                    payDesc: null,
                    mobile: null
                },
                picker: {
                    data: [
                        ['60后','70后','80后','90后','95后','00后','不限'],
                        ['男', '女', '不限'],
                        ['互联网','软件','通讯','交通','零售','建筑','金融','政府','医疗','健康','制造业','媒体','能源','教育','咨询','自由职业','学生','家庭主妇','离退休','待业','不限'],
                        ['高中','大专','本科','研究生', '不限']
                    ]
                },
                pickerPay: {
                    data: [
                        ['现金','礼品卡','小礼品','其他']
                    ]
                },
                publishBtn: {
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
        box-sizing: border-box;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 89;
        background-color: $bg-theme-color;
        overflow-y: auto;
    }
    .form {
        height: 100%;
        width: 80%;
        margin: 100px auto;
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
    .flex-container {
        display: flex;
        flex-direction: row;
        margin: 10px auto;
    }
    .form-pay-type, .form-contact {
        width: 35%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: white;
        padding: 14px;
        font-size: $ft-form-normal;
    }
    .form-pay-desc {
        width: calc(65% - 10px);
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: white;
        font-size: $ft-form-normal;
        padding-left: 10px;
        margin-left: 10px;
    }
    .picker-item {
        display: inline-block;
        padding: 0;
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
    .form-desc {
        height: 100px;
        padding: 10px 0 0 10px;
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
        margin: 30px 0 20px 0;
    }
    .section-title {
        font-size: $ft-form-normal;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>