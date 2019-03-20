<template>
    <div class="search">
        <div class="wrapper" ref="wrapper">
            <Header :title="'爱测试 (企业版)'"/>
            <div class="title">关键词搜索测试者</div>
            <mt-swipe :auto="0" :show-indicators="false" @change="handleChange">
                <mt-swipe-item>
                <div class="container">
                    <!-- register click.native event to config slide-out effect  -->
                    <router-link tag="div" class="item" to="/search/testees/学生">
                        <label>学生</label>
                    </router-link>
                    <router-link tag="div" class="item" to="/search/testees/互联网">
                        <label>互联网</label>
                    </router-link>
                    <router-link tag="div" class="item" to="/search/testees/制造业">
                        <label>制造业</label>
                    </router-link>
                    <router-link  tag="div" class="item" to="/search/testees/金融">
                        <label>金融</label>
                    </router-link>
                    <router-link tag="div" class="item" to="/search/testees/媒体">
                        <label>媒体</label>
                    </router-link>
                    <router-link tag="div" class="item" to="/search/testees/政府">
                        <label>政府</label>
                    </router-link>
                </div>
                </mt-swipe-item>
                <mt-swipe-item>
                    <div class="container">
                        <!-- register click.native event to config slide-out effect  -->
                        <router-link tag="div" class="item" to="/search/testees/软件">
                            <label>软件</label>
                        </router-link>
                        <router-link tag="div" class="item" to="/search/testees/通讯">
                            <label>通讯</label>
                        </router-link>
                        <router-link tag="div" class="item" to="/search/testees/交通">
                            <label>交通</label>
                        </router-link>
                        <router-link  tag="div" class="item" to="/search/testees/零售">
                            <label>零售</label>
                        </router-link>
                        <router-link tag="div" class="item" to="/search/testees/建筑">
                            <label>建筑</label>
                        </router-link>
                        <router-link tag="div" class="item" to="/search/testees/医疗">
                            <label>医疗</label>
                        </router-link>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
            <div class="swipe-indicator">
                <img v-if="index === 0" src="../../assets/search/filled-circle.png"/>
                <img v-if="index !== 0" src="../../assets/search/circle.png"/>
                <img v-if="index === 1" src="../../assets/search/filled-circle.png"/>
                <img v-if="index !== 1" src="../../assets/search/circle.png"/>
            </div>
            <Tabbar/>
        </div>

        <!-- catch backToMe event to config slide-in effect  -->
        <router-view></router-view>
    </div>
</template>

<script>
    import Tabbar from '../common/Tabbar';
    import Header from '../common/Header';
    import { Swipe, SwipeItem } from 'mint-ui';

    export default {
        name: "CategorizedSearch",
        components: {
            Tabbar,
            Header
        },
        data: function() {
          return {
              index: 0
          }
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
            },
            handleChange(index) {
                this.index = index;

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
    img {
        width: 20px;
        height: 20px;
        margin: 0 10px;
    }
    .mint-swipe {
        height: 45%;
    }
    .swipe-indicator {
        width: 80px;
        margin: 0 auto;
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