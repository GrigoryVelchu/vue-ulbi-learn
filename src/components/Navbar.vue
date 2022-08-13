<template>
    <div class="navbar">
        <div>Vue3</div>
        <div class="navbar__btns">
            <my-button
                    @click = "$router.push('/posts')">
                Posts
            </my-button>
            <my-button
                    style = 'margin-left: 20px'
                    @click = "$router.push('/about')">
                About
            </my-button>
            <my-button
                    style = 'margin-left: 20px'
                    @click = "$router.push('/store')">
                Store
            </my-button>
            <my-button
                    style = 'margin-left: 20px'
                    @click = "$router.push('/composition')">
                Composition
            </my-button>

        </div>
    </div>
</template>

<script>
    import {useRouter} from "vue-router";

    export default {
        name: "Navbar",
    }
    const router = useRouter()
</script>

<style scoped>
    .navbar{
        height: 50px;
        background-color: lightgray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .navbar__btns{
        margin-left: auto;
    }
</style>