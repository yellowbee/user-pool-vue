<template>
    <transition name="slide">
        <div class="how-to">
            <div class="back">
                <div @click="back">
                    <img src="../../assets/retrun-arrow.png" height="16" width="19" />
                </div>
                <span>使用指南</span>
            </div>
            <img class="how-to-img" src="../../assets/me/how_to.png" />
        </div>
    </transition>
</template>

<script>
    export default {
        name: "HowTo",
        methods: {
            back (event) {
                // 为防止PC端时,点击事件会被执行两次,须作如下判断，但是这里暂时不需要，参考http://blog.csdn.net/alsnei/article/details/54375957
                // if (!event._constructed) {
                //   return
                // }
                this.$router.back()   // 返回上一级
            }
        }
    }
</script>

<style scoped>
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

    .how-to{
        position: fixed;
        top: 0;
        bottom: 50px;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(238,233,233,0.6);
    }
    .how-to-img {
        display: block;
        width: 70%;
        margin: 10px auto;
    }

    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>