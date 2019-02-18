<template>
    <div class="tasks">
        <Header :title="'我的任务'"/>
        <div class="task-publish">
        <mt-button type="primary">发布任务</mt-button>
            <!-- <span>发布任务</span> -->
        </div>
        <Tabbar/>
    </div>
</template>

<script>
    import Tabbar from '../common/Tabbar';
    import Header from '../common/Header';

    export default {
        name: "tasks",
        components: {
            Tabbar,
            Header
        }
    }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    .tasks {
        position: fixed;
        top: 0;
        bottom: 50px;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: $bg-theme-color;
    }

    .task-publish {
        width: 90%;
        margin: 70px auto 0 auto;
        /*padding: 15px 0;*/
        text-align: center;
        color: white;
        font-size: 20px;
    }
    .mint-button {
        width: 100%;
        background-color: $theme-color;
    }
</style>