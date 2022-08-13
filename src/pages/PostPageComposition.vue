<template>
    <div>
        <h1>Page with posts</h1>

        <my-input v-model:value = 'searchQuery'
                  placeholder = 'Search...'
                  v-focus/>
        <div class = 'app__btns'>

            <my-select v-model = 'selectedSort'
                       :options="sortOptions"/>
        </div>

        <my-dialog v-model:show = 'dialogVisible'>
            <post-form/>
        </my-dialog>

        <post-list :posts='sortedAndSearchedPosts'
                    v-if = '!isPostsLoading'/>
        <div v-else > Загрузка </div>
    </div>
</template>

<script>

    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";
    import MyInput from "@/components/UI/MyInput";
    import {usePosts} from "@/hooks/usePosts";
    import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts";
    import {useSortedPosts} from "@/hooks/useSortedPosts";


    export default {
        components: {MyInput, PostList,PostForm},

        data(){
            return{
                dialogVisible: false,
                sortOptions:[
                    { value:'title',name:'For names'},
                    {value:'body', name:'For text'}
                ]
            }
        },
        setup(props){
            const{posts, totalPages,isPostsLoading} = usePosts(10);
            const{selectedSort, sortedPosts}  = useSortedPosts(posts);
            const{searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
            return{
                posts,
                totalPages,
                isPostsLoading,
                selectedSort,
                sortedPosts,
                searchQuery,
                sortedAndSearchedPosts
            }
        },

        methods:{

        },

        watch:{

        },
        computed:{

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