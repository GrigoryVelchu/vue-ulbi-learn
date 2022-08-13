import axios from "axios";

export const postModule = {
    state:()=>({
        posts:[],
        isPostsLoading :false,
        selectedSort:'',
        searchQuery : '',
        page:1,
        limit:10,
        totalPages:0,
        sortOptions:[
            {value:'title', name:'For names'},
            {value:'body',name:'For text'}
        ]
    }),
    getters:{
        sortedPosts(state){
            return[...state.posts].sort((post1,post2)=>{
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters){
            return getters.sortedPosts.filter(post=>{
                return post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            })
        }
    },
    mutations:{
        setPosts(state,posts){
            state.posts = posts
        },
        setLoading(state, bool){
          state.isPostsLoading  = bool;
        },
        setPage(state, page){
            state.page = page
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        },
    },
    actions:{

        async fetchPosts({state, commit}){
            try{
                commit("setLoading", true);
                setTimeout(async()=>{
                    const response = await axios.get (`https://jsonplaceholder.typicode.com/posts`, {
                        params:{
                            _page:state.page,
                            _limit:state.limit
                        }
                    });
                    commit('setTotalPages',  Math.ceil(response.headers['x-total-count'] / state.limit))
                    commit('setPosts', response.data);
                    commit("setLoading", false);
                },1000)
            }
            catch (e) {

            }
        },

        async loadMorePosts({state, commit}){
            try{
                commit('setPage',state.page+=1);
                const response = await axios.get (`https://jsonplaceholder.typicode.com/posts`, {
                    params:{
                        _page:state.page,
                        _limit:state.limit
                    }
                })
                commit('setTotalPages',  Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data]);
                commit("setLoading", false);
            }
            catch (e) {
                alert('fetching Error')
            }
            finally {

            }
        }
    },
    namespaced:'true'
}