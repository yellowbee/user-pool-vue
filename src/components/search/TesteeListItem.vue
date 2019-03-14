<template>
    <li class="testee">
        <div class="head">
            {{ testee.age }} | {{ testee.sex }} | {{ testee.industry }} | {{ testee.edu }}
        </div>
        <div class="section">
            {{ testee.desc }}
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
   export default {
       name: 'TesteeListItem',
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

    .head {
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