<template>
    <div class="post">
        <div>
            <div>{{index + 1}}) <strong>Title: </strong>{{post.title}}</div>
            <div><strong>Description: </strong>{{post.body}}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
            <my-button @click="$emit('remove', post)">Delete</my-button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        post: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    margin-top: 15px;
    border: 2px solid teal;
}
.post__btns{
    display: flex;
}
</style>