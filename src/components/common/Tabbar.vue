<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/search">
            <div class="tab-link tab-link-1">
                <span class="tab-link-text">找人测试</span>
            </div>
        </router-link>
        <router-link tag="div" class="tab-item" to="/tasks">
            <div class="tab-link tab-link-2">
                <span class="tab-link-text">我的任务</span>
            </div>
        </router-link>
        <router-link tag="div" class="tab-item" to="/me">
            <div class="tab-link tab-link-3">
                <span class="tab-link-text">我</span>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Tabbar"
    }
</script>

<style scoped>

</style>