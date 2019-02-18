<template>
    <div class="search">
        <div class="wrapper" ref="wrapper">
            <Header :title="'找人测试'"/>
            <div class="title">关键词搜索测试者</div>
            <div class="container">
                <!-- register click.native event to config slide-out effect  -->
                <router-link @click.native="onClickCategory" tag="div" class="item" to="/search/testees/学生">
                    <label>学生</label>
                </router-link>
                <router-link @click.native="onClickCategory" tag="div" class="item" to="/search/testees/互联网">
                    <label>互联网</label>
                </router-link>
                <router-link @click.native="onClickCategory" tag="div" class="item" to="/search/testees/制造业">
                    <label>制造业</label>
                </router-link>
                <router-link @click.native="onClickCategory" tag="div" class="item" to="/search/testees/金融">
                    <label>金融</label>
                </router-link>
                <router-link @click.native="onClickCategory" tag="div" class="item" to="/search/testees/媒体">
                    <label>媒体</label>
                </router-link>
                <router-link @click.native="onClickCategory" tag="div" class="item" to="/search/testees/政府">
                    <label>政府</label>
                </router-link>
            </div>
            <Tabbar/>
        </div>

        <!-- catch backToMe event to config slide-in effect  -->
        <router-view @backToMe="onBackToMe"></router-view>
    </div>
</template>

<script>
    import Tabbar from '../common/Tabbar';
    import Header from '../common/Header';

    export default {
        name: "CategorizedSearch",
        components: {
            Tabbar,
            Header
        },
        methods: {
            onClickCategory() {
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
        /* remove all slide effects when routing away from /search */
        updated() {
            const route = this.$route.fullPath;
            if (route == '/' || route == '/me' || route == '/tasks') {
                const element = this.$refs.wrapper;
                element.classList.remove('animated', 'slideInLeft', 'slideOutLeft', 'faster');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .search {
        position: fixed;
        /*border: 1px solid red;*/
        /*width: 100%;*/
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $bg-theme-color;
    }
    .wrapper{
        height: 100%;
        overflow: hidden;
    }

    .title {
        text-align: center;
        margin: 60px 0;
        font-size: $ft-page-title;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .item {
        flex: 1 0 29%; /* explanation below */
        margin: 1px;
        height: 1px;
        background-color: white;
        text-align: center;
        padding: 60px 0;
    }

    .chat-wrapper{
        height: 100%;
        overflow: hidden;
    }
    .item-cell{
        position: relative;
        border-bottom: 1px solid rgba(153,153,153,0.4);
        height: 60px;
    }
    .img-unread{
        position: relative;
    }
    .img-unread span{
        position: absolute;
        top: 0;
        left: 44px;
        font-size: 10px;
        line-height: 14px;
        color: #fff;
        height: 14px;
        width: 14px;
        text-align: center;
        vertical-align: middle;
        background-color: red;
        border: 1px solid red;
        border-radius: 50%;
    }
    .item-img{
        float: left;
        margin:10px 10px 10px 10px;
    }
    .dissname{
        /*border: 1px solid red;*/
        font-size: 14px;
        font-weight: bold;
        padding-top: 10px;
        padding-left: 70px;
    }
    .summary{
        font-size: 14px;
        padding-top: 10px;
        padding-left: 70px;
        color: rgba(153,153,153,0.8);
        font-style: italic;
    }
    .item-time{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
        color: rgba(153,153,153,0.8);
    }
    .animated.faster {
        animation-duration: .3s;
    }



</style>