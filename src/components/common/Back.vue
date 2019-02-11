<template>
    <router-link @click.native="onClickBack" tag="div" :to="{path: destRoute}">
        <div class="back">
            <img src="../../assets/retrun-arrow.png" height="16" width="19" />
            <span>{{ title }}</span>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "Back",
        props: {
            destRoute: String,
            title: String
        },
        methods: {
            onClickBack() {
                this.$emit('backToMe', null);
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
</style>