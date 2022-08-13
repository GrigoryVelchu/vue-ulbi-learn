<template>

    <div>
        <h1>Страница с постами</h1>
        <my-input :searchString = 'searchQuery'
                  @update:searchString = 'setSearchQuery'
                  placeholder = 'Search...'/>
        <div class = 'app__btns'>
            <my-button @click="showDialog">
                Create Post
            </my-button>

            <my-select :selectedSort = 'selectedSort'
                       @changeSort = 'setSelectedSort'
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
    import MyButton from "@/components/UI/MyButton";
    import{mapState,mapGetters,mapActions,mapMutations} from 'vuex'

    export default {
        components: {MyButton, MyInput, PostList,PostForm},

        data(){
            return{
                dialogVisible: false,
            }
        },

        methods:{
            ...mapMutations({
                setPage:'post/setPage',
                setSearchQuery:'post/setSearchQuery',
                setSelectedSort:'post/setSelectedSort'
            }),
            ...mapActions({
                loadMorePosts:'post/loadMorePosts',
                fetchPosts:'post/fetchPosts'
            }),
            createPost(post, second){
                this.posts.push(post);
                this.dialogVisible = !this.dialogVisible;
            },
            removePost(post){
                this.posts = this.posts.filter(el=>el.id !== post.id)
            },
            showDialog(){
                this.dialogVisible = !this.dialogVisible;
            }
        },
        mounted() {
            this.fetchPosts();
        },
        watch:{

        },
        computed:{
            ...mapState({
                posts: state=>state.post.posts,
                isPostsLoading :state=>state.post.isPostsLoading,
                selectedSort:state=>state.post.selectedSort,
                searchQuery :state=>state.post.searchQuery,
                page:state=>state.post.page,
                limit:state=>state.post.limit,
                totalPages:state=>state.post.totalPages,
                sortOptions:state=>state.post.sortOptions,
                selectedSort:state=>state.post.selectedSort
            }),
            ...mapGetters({
                sortedPosts:'post/sortedPosts',
                sortedAndSearchedPosts:'post/sortedAndSearchedPosts'
            })
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