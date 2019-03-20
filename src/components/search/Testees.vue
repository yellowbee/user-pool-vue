<template>
    <transition name="slide">
        <div class="testee-list">
            <Back @click.native="onClickBack" :destRoute="'/search'" :title="$route.params.category" />
            <!-- <div class="back">
                <div @click="back">
                    <img src="../../assets/retrun-arrow.png" height="16" width="19" />
                </div>
                <span>学生</span>
            </div> -->
            <div class="spinner" v-if="testees === null">
                <mt-spinner size="50" color="#184b86" type="fading-circle"></mt-spinner>
            </div>
            <div v-else>
                <div v-if="testees.length === 0" style="text-align: center; margin-top: 200px;">此品类测试者正在招募中</div>
                <div v-else>
                    <TesteeList :testees="testees" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from 'axios';
    import TesteeList from './TesteeList';
    import Back from '../common/Back';

    export default {
        name: "Testees",
        components: {
            TesteeList,
            Back
        },
        data: function() {
            return {
                testees: null
            }
        },
        methods: {
            onClickBack() {
                this.$emit('backToMe', null);
            }
            /*back (event) {
                // 为防止PC端时,点击事件会被执行两次,须作如下判断，但是这里暂时不需要，参考http://blog.csdn.net/alsnei/article/details/54375957
                // if (!event._constructed) {
                //   return
                // }
                this.$router.back()   // 返回上一级
            }*/
        },
        beforeCreate() {
            axios.post('https://woyaotest.com/testees', {
                industry: this.$route.params.category
            }).then(response => {
                this.testees = response.data;
            });
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .back{
        background: #184b86;
        height: 50px;
        color: #fff;
        /*position: fixed;*/
        width: 100%;
        z-index: 99;
    }
    .back div{
        height: 50px;
        width: 50px;
    }
    .back img{
        position: absolute;
        top: 25px;
        margin-top: -8px;
        left: 14px;
    }
    .back span{
        position: absolute;
        font-size: 20px;
        top: 25px;
        margin-top: -10px;
        left: 50px;
        padding-left: 10px;
        border-left: 1px solid #000;
    }
    .testee-list {
        position: fixed;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 89;
        background-color: $bg-theme-color;
        /*overflow: scroll;*/
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }

    .spinner {
        width: 85px;
        height: 85px;
        margin: 200px auto;
    }
</style>