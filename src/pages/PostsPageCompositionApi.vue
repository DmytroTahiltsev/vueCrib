<template>
    
    <div>
        <div>
            {{test}}
        </div>
        <my-input v-model="test"/>
        <h1>Page with posts</h1>
        <my-input
            v-focus
            v-model="searchQuery"
        />
        <div class="app__btns">
            <my-button
                
            >
                Create post
            </my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="isDialogVisible">
        <post-form 
            
        />
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"
            v-if="!isPostsLoading"
        />
        <div
            v-else
        >
            Loading...
        </div>
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

    </div>
    
</template>

<script>
import PostList from "@/components/PostList"
import PostForm from "@/components/PostForm" 
import TestComp from '@/components/TestComp'
import {usePosts} from "@/hooks/usePosts"
import useSortedPosts from "@/hooks/useSortedPosts"
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts"
import axios from "axios"
import {ref, toRefs} from "vue"

export default {
    components: {
        PostList, PostForm, TestComp
    },
    data(){
        return {
            isDialogVisible: false,
            sortOptions: [
                {value: "title", name: "by title"},
                {value: "body", name: "by description"}
            ],
            testData: [1, 2, 3, 4],
            testInput: "111"
        }
    },
    setup(props) {
        const test = ref('')
        const {posts, isPostsLoading, totalPages} = usePosts(10)
        const {sortedPosts, selectedSort} = useSortedPosts(posts)
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
        console.log(props)
        return {
            posts, isPostsLoading, totalPages,
            sortedPosts, selectedSort,
            searchQuery, sortedAndSearchedPosts,
            test
        }
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
