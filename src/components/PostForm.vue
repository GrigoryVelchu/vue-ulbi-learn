<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input v-model = 'post.title'
                  v-focus
                  placeholder='Название'/>
        <my-input v-model = 'post.body'
                  placeholder = 'Описание'/>
        <my-button @click = 'createPost'
                    style = 'margin-top: 15px'>
            Create
        </my-button>

    </form>
</template>

<script>
    export default {
        data(){
            return {
                post:{
                    title:'',
                    body:''
                }
            }
        },
        methods:{
            createPost(){
                this.post.id = Date.now();
                this.$emit('create', this.post, 'secondParam')
                this.post = {
                    title:'',
                    body:''
                };
            }
        },
    }
</script>

<style scoped>
    form{
        display: flex;
        flex-direction: column;
    }

</style>