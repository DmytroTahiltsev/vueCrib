<template>
        <div v-if="posts.length > 0">
            <h3>Posts List</h3>
            <transition-group name="post-list">
                <post-item 
                    v-for="(post, index) in posts"
                    :post="post"
                    :index="index"
                    :key="post.id"
                    @remove="$emit('remove', post)"
                />
            </transition-group>
        </div>
        <h2 v-else style="color: orange; border: 1px solid red; margin-top: 15px">
            Posts List is empty
        </h2>
</template>

<script>
import PostItem from "./PostItem"

export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all .5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform .5s ease;
}
</style>