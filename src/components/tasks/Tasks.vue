<template>
    <div class="tasks">
        <div class="task-publish">
            <span>发布任务</span>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "tasks"
    }
</script>

<style scoped>
    .tasks{
        position: fixed;
        top: 50px;
        bottom: 50px;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(238,233,233,0.6);
    }

    .task-publish {
        width: 80%;
        margin: 20px auto 0 auto;
        padding: 15px 0;
        text-align: center;
        background-color: #184b86;
        border-radius: 5px;
        color: white;
        font-size: 20px;
    }
</style>