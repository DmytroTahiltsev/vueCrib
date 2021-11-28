<template>
    
    <div>
        <h1>Page with posts</h1>
        <my-input
            v-focus
            v-model="searchQuery"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
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
import axios from "axios"

export default {
    components: {
        PostList, PostForm, TestComp
    },
    data(){
        return {
            posts: [],
            isDialogVisible: false,
            isPostsLoading: false,
            selectedSort: "",
            searchQuery: "",
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: "title", name: "by title"},
                {value: "body", name: "by description"}
            ],
            testData: [1, 2, 3, 4],
            testInput: ""
        }
    },
    methods: {
        createPost(post) {
           this.posts.push(post)
           this.isDialogVisible = false
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.isDialogVisible = true
        },
        changePage(pageNumb) {
            this.page = pageNumb
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    } 
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data
            } catch(e) {
                alert("Error")
            } finally {
                this.isPostsLoading = false
            }
        },
        async loadMorePosts() {
            try {
                this.page++
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    } 
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
            } catch(e) {
                alert("Error")
            } 
        },
        addTest(item) {
            this.testData.push(item)
        }
    },
    mounted() {
        this.fetchPosts()

        /*const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting && this.page < this.totalPages){
                this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)*/
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        /*selectedSort(newValue) {
            this.posts.sort((post1, post2) => {
                return post1[newValue]?.localeCompare(post2[newValue])
            })
        }*/
        /*page() {
            this.fetchPosts()
        }*/
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
