<template>
    <ul class="list-group col-md-4">
        <TesteeListItem
                v-for="testee in testees"
                :testee="testee"
                :key="testee.id"
        >
        </TesteeListItem>
    </ul>
</template>

<script>
    import TesteeListItem from "./TesteeListItem";

    export default {
        name: 'TesteeList',
        components: {
            TesteeListItem
        },
        props: {
            testees: Array
        }
    };
</script>

<style>

</style>