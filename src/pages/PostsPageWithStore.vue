<template>
    <div>
        <h1>Page with posts</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Create post
            </my-button>
            <my-select 
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="isDialogVisible">
        <post-form 
            @create="createPost"
        />
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div
            v-else
        >
            Loading...
        </div>
        <div v-intersection="loadMorePosts" ref="observer" class="observer"></div>
        <div class="page__wrapper">
            <div
                class="page"
                v-for="pageNumb in totalPages" 
                :key="pageNumb"
                :class="{
                    'current-page': page === pageNumb 
                }"
                @click="changePage(pageNumb)"
            >
                {{pageNumb}}
            </div>
        </div> 
        <test-comp :data="testData" @addTest="addTest" v-model="testInput"/>
    </div>
    
</template>

<script>
import PostList from "@/components/PostList"
import PostForm from "@/components/PostForm" 
import TestComp from '@/components/TestComp'

import {mapState, mapGetters, mapMutations, mapActions} from "vuex"

export default {
    components: {
        PostList, PostForm, TestComp
    },
    data(){
        return {
            isDialogVisible: false,
            testData: [1, 2, 3, 4],
            testInput: ""
        }
    },
    methods: {
        ...mapMutations({
            setPosts: 'post/setPosts',
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            setTestStore: 'post/setTestStore'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
           this.posts.push(post)
           this.isDialogVisible = false
        },
        removePost(post) {
            console.log(this)
            //this.posts = this.posts.filter(p => p.id !== post.id)
            this.setPosts(this.posts.filter(p => p.id !== post.id))
           //this.$store.commit('post/setPosts', this.posts.filter(p => p.id !== post.id))
            
        },
        showDialog() {
            this.isDialogVisible = true
        },
        changePage(pageNumb) {
            this.page = pageNumb
        },
        addTest(item) {
            this.testData.push(item)
        }
    },
    async mounted() {
        await this.fetchPosts()
        this.setTestStore('eee')
        console.log(this.testStore)
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
            testStore: state => state.post.testStore
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },
    watch: {
    }

}
</script>


<style>
.app__btns{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
}
</style>
