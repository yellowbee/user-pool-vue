<template>
    <li class="list-group-item media" @click="onVideoSelect">
        <img class="mr-3" :src="thumbnailUrl" />
        <div class="media-body">
            {{ testee.name }}
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

<style scoped>
    li {
        display: flex;
        cursor: pointer;
    }

    li:hover {
        background-color: gray;
    }
</style>