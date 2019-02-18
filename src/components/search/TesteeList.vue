<template>
    <div class="scroll-list">
    <ul>
        <!-- <li v-for="item in list" style="margin: 120px 0;">{{ item }}</li> -->
        <TesteeListItem
                v-for="testee in testees"
                :testee="testee"
                :key="testee.id"
        >
        </TesteeListItem>
        <div style="width: 100%; height: 50px;"/>
    </ul>
    </div>
</template>

<script>
    import TesteeListItem from "./TesteeListItem";

    export default {
        name: 'TesteeList',
        data() {
            return {
                list: []
            }
        },
        components: {
            TesteeListItem,
        },
        props: {
            testees: Array
        },
        methods: {
            loadMore() {
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 2500);

                this.loading;
            }
        },
    };
</script>

<style scoped>
    .scroll-list {
        position: fixed;
        top: 50px;
        left: 0;
        height: 100%;
        overflow-y: auto;
    }
</style>