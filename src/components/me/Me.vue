<template>
    <div class="me">
        <div class="wrapper" ref="wrapper">
            <Header :title="'我'"/>
            <div class="find-content">
                <router-link tag="div" class="friend-circle" to="">
                    <img class="avatar-img" src="../../assets/me/panda.png" />
                    <span class="find-item">功夫熊猫</span>
                </router-link>
                <router-link tag="div" @click.native="onClickHowTo" class="friend-circle" to="/me/how-to">
                    <img class="find-img" src="../../assets/find/摇一摇.png" />
                    <span class="find-item">使用指南</span>
                </router-link>

                <div class="exit">
                    <img class="find-img" src="../../assets/find/小程序.png" />
                    <span class="find-item">退出</span>
                </div>
                <Tabbar/>
            </div>
        </div>
        <router-view @backToMe="onBackToMe"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Tabbar from '../common/Tabbar';
    import Header from '../common/Header';

    export default {
        components: {
            Tabbar,
            Header
        },
        data() {
            return {
                //show: 'true',
                //prevRoute: null
            }
        },
        methods: {
            onClickHowTo() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'faster');
                element.classList.add('animated', 'slideOutLeft');
            },
            onBackToMe() {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideOutLeft');
                element.classList.add('animated', 'slideInLeft', 'faster');
            }
        },
        updated() {
            const route = this.$route.fullPath;
            if (route == '/' || route == '/search' || route == '/tasks') {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'slideOutLeft', 'faster');
            }
        }
    }
</script>

<style scoped>
    .me {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(238,233,233,0.6);
    }
    .wrapper{
        height: 100%;
        overflow: hidden;
    }
    .find-content{
        position: fixed;
        top: 50px;
        width: 100%;
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
    .find-img {
        height: 20px;
        width: 20px;
        padding-right: 20px;
    }
    .avatar-img {
        height: 30px;
        width: 30px;
        padding-right: 20px;
    }
    .animated.faster {
        animation-duration: .3s;
    }
    /*.app-header{
        background-color: #184b86;
        height: 50px;
        color: #fff;
        position: fixed;
        top: 0;
        width: 100%;
    }*/
</style>
