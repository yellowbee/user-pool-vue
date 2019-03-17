<template>
    <li class="testee">
        <div class="head">
            <div v-if="!isLoggedIn || !isActivated"><img class="blurred-name" src="../../assets/search/blurred_name.png"/></div>
            <div v-if="isLoggedIn && isActivated">{{ testee.name }}</div>
            <div>| {{ testee.age }}</div>
            <div>| {{ testee.sex }}</div>
            <div>| {{ testee.industry }}</div>
            <div>| {{ testee.edu }}</div>
        </div>
        <div class="section">
            {{ testee.desc }}
        </div>
        <div class="section">
            <div class="sec-head">联系方式:</div>
            <div v-if="isLoggedIn && isActivated">电话号码: {{ testee.mobile }}</div>
            <div v-if="!isLoggedIn || !isActivated">电话号码:<img class="blurred-contact" src="../../assets/search/blurred_mobile.png"/></div>
            <div v-if="isLoggedIn && isActivated" style="margin-top: 5px;">微信: {{ testee.wechat }}</div>
            <div v-if="!isLoggedIn || !isActivated">微信:<img class="blurred-contact" src="../../assets/search/blurred_wechat.png"/></div>
        </div>
        <div class="section">
            <div class="sec-head">期待测试报酬:</div>
            <div>
                现金: {{ testee.price }}元/小时
            </div>
        </div>
    </li>
</template>

<script>
   import { mapGetters } from 'vuex';

   export default {
       name: 'TesteeListItem',
       computed: {
           ...mapGetters(['isLoggedIn', 'isActivated'])
       },
       props: {
           testee: Object
       }
   }
</script>

<style scoped lang="scss">
    @import "../../scss/constants";

    li {
        cursor: pointer;
        margin: 10px 0;
        padding: 20px 20px;
        background-color: white;
    }

    .blurred-name {
        position: relative;
        top: -7px;
        width: 60px;
    }
    .blurred-contact {
        position: relative;
        top: 8px;
        width: 100px;
    }

    .head {
        display: flex;
        flex-direction: row;
        color: #184b86;
        margin: 10px 0;
    }
    .sec-head {
        font-weight: $ft-weight;
        margin-bottom: 5px;
    }
    .section {
        margin: 15px 0;
    }
</style>