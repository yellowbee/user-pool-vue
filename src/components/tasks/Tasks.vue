<template>
    <div class="tasks">
        <Header :title="'我的任务'"/>
        <div class="task-publish">
            <span>发布任务</span>
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

<style scoped>
    .tasks {
        position: fixed;
        top: 0;
        bottom: 50px;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(238,233,233,0.6);
    }

    .task-publish {
        width: 80%;
        margin: 70px auto 0 auto;
        padding: 15px 0;
        text-align: center;
        background-color: #184b86;
        border-radius: 5px;
        color: white;
        font-size: 20px;
    }
</style>