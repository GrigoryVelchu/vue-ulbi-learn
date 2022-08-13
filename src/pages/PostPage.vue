<template>
    <div>
        <h1>Page with posts</h1>

        <my-input v-model:value = 'searchQuery'
                  placeholder = 'Search...'/>

        <div class = 'app__btns'>

            <my-button @click="showDialog">
                Create Post
            </my-button>

            <my-select v-model = 'selectedSort'
                       :options="sortOptions"/>
        </div>

        <my-dialog v-model:show = 'dialogVisible'>
            <post-form @create = 'createPost'/>
        </my-dialog>

        <post-list :posts='sortedAndSearchedPosts'
                   @remove = 'removePost'
                   v-if = '!isPostsLoading'/>
        <div v-else > Загрузка </div>
        <div v-intersection = 'loadMorePosts'
             class = observer>
        </div>
    </div>
</template>

<script>

    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";
    import axios from "axios";
    import MyInput from "@/components/UI/MyInput";


    export default {
        components: {MyInput, PostList,PostForm},

        data(){
            return{
                posts:[

                ],
                dialogVisible: false,
                isPostsLoading :false,
                selectedSort:'',
                searchQuery : '',
                page:1,
                limit:10,
                totalPages:0,
                sortOptions:[
                    {
                        value:'title',
                        name:'For names'
                    },
                    {
                        value:'body',
                        name:'For text'
                    }
                ]
            }
        },

        methods:{
            createPost(post, second){
                this.posts.push(post);
                this.dialogVisible = !this.dialogVisible;
            },
            removePost(post){
                this.posts = this.posts.filter(el=>el.id !== post.id)
            },
            showDialog(){
                this.dialogVisible = !this.dialogVisible;
            },
            async fetchPosts(){
                try{
                    this.isPostsLoading = true;
                    setTimeout(async()=>{
                        const response = await axios.get (`https://jsonplaceholder.typicode.com/posts`, {
                            params:{
                                _page:this.page,
                                _limit:this.limit
                            }
                        });
                        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                        this.posts = response.data;
                        this.isPostsLoading = false;
                    },1000)
                }
                catch (e) {

                }
            },

            async loadMorePosts(){
                try{
                    this.page+=1;
                    const response = await axios.get (`https://jsonplaceholder.typicode.com/posts`, {
                        params:{
                            _page:this.page,
                            _limit:this.limit
                        }
                    })
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...response.data];
                    this.isPostsLoading = false;
                }
                catch (e) {
                    alert('fetching Error')
                }
                finally {

                }
            }
        },
        mounted() {
            this.fetchPosts()
        },
        watch:{

        },
        computed:{
            sortedPosts(){
                return[...this.posts].sort((post1,post2)=>{
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
            },
            sortedAndSearchedPosts(){
                return this.sortedPosts.filter(post=>{
                    return post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                })
            }
        }
    }
</script>

<style>

    .app__btns{
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
    }
    .observer{
        height: 30px;
        background: green;
    }
</style>