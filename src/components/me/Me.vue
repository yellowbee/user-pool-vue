<template>
    <div class="me">
        <div class="find-wrapper" ref="wrapper">
            <div class="find-content">
                <router-link tag="div" class="friend-circle" to="">
                    <img class="avatar-img" src="../../assets/me/panda.png" />
                    <span class="find-item">功夫熊猫</span>
                </router-link>
                <!--
                <router-link tag="div" class="friend-circle" to="">
                    <img class="find-img" src="../../assets/find/朋友圈.png" />
                    <span class="find-item">分享程序</span>
                </router-link>
                <router-link tag="div" class="friend-circle" to="">
                    <img class="find-img" src="../../assets/find/扫一扫.png" />
                    <span class="find-item">改进建议</span>
                </router-link>
                -->
                <router-link tag="div" class="friend-circle" to="/me/how-to">
                    <img class="find-img" src="../../assets/find/摇一摇.png" />
                    <span class="find-item">使用指南</span>
                </router-link>

                <div class="exit">
                    <img class="find-img" src="../../assets/find/小程序.png" />
                    <span class="find-item">退出</span>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'

    export default {
        components: {
            BScroll,
        },
        mounted () {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
                    click: true
                })
            })
        }
    }
</script>

<style scoped>
    .me {
        position: fixed;
        top: 50px;
        bottom: 50px;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(238,233,233,0.6);
    }
    .find-wrapper{
        height: 100%;
        overflow: hidden;
    }
    .find-content{
        overflow: hidden;
    }
    .friend-circle{
        display: flex;
        align-items: center;
        left: 0;
        height: 30px;
        padding: 8px 10px;
        margin-top: 10px;
        background-color: #fff;
    }
    .exit {
        display: flex;
        align-items: center;
        left: 0;
        height: 30px;
        padding: 8px 10px;
        margin-top: 30px;
        background-color: #fff;
    }
    .find-img{
        height: 20px;
        width: 20px;
        padding-right: 20px;
    }
    .avatar-img{
        height: 30px;
        width: 30px;
        padding-right: 20px;
    }

</style>
