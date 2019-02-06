<template>
    <div class="search">
        <div class="title">关键词搜索测试者</div>
        <div class="container">
            <div class="item">学生</div>
            <div class="item">互联网</div>
            <div class="item">制造业</div>
            <div class="item">金融</div>
            <div class="item">媒体</div>
            <div class="item">政府</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CategorizedSearch"
    }
</script>

<style scoped>
    .search {
        position: fixed;
        /*border: 1px solid red;*/
        /*width: 100%;*/
        top: 50px;
        bottom: 50px;
        left: 0;
        right: 0;
        background-color: rgba(238,233,233,0.6);
    }

    .title {
        text-align: center;
        margin: 10px 0;
        font-size: 25px;
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

</style>