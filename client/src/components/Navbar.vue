<template>
    <div class="navbar">
        <img :src="logo" />

        <div class="navbar-span">
            <router-link to="/">
                <span>Home</span>
            </router-link>
            <router-link :to="{ name: 'create'}"><span>Create</span></router-link>
            <router-link to="/myposts"><span>MyPosts</span></router-link>
            <router-link to="/login-signup"><span @click="handleLogout">Log out</span></router-link>
            
        </div>

        <span class="material-symbols-outlined" @click="showMenu=!showMenu">
            menu
        </span>
        
    </div>
    <div class="menuBar" v-if="showMenu">
        <router-link to="/">
            <span>Home</span>
        </router-link>
        <router-link :to="{ name: 'create'}"><span>Create</span></router-link>
        <router-link to="/myposts"><span>MyPosts</span></router-link>
        <router-link to="/login-signup"><span @click="handleLogout">Log out</span></router-link>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Navbar',
        components: {  },
        data() {
            return {
                logo: require('../assets/logo.svg'),
                showMenu: false
            }
        },
        methods: {
            async handleLogout() {

                const response = await fetch('http://localhost:3000/api/v1/user/signout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('email')
                    })
                })
                localStorage.removeItem('token');
                localStorage.removeItem('email');
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 100px;
        max-height: 100px;
        margin-left: 30px;
    }

    .navbar {
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        max-width: 100%;
        margin: auto;
        align-items: center;
        position: fixed;
        top: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: lightgray 1px solid;
        width: 100%;

    }

    @media only screen and (max-width: 600px) {
        .navbar {
            flex-direction: flex;
            align-items: center;
            position: relative;
        }

        .navbar-span {
            display: none;

        }

        .material-symbols-outlined {
            display: inline-block;
            margin-right: 20px;
            font-size: 30px;
        }

        .material-symbols-outlined:hover {
            cursor: pointer;
            color: #646cffaa;
        }

        .menuBar {
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 10;
            float: right;
            background: #fff;
            padding:5px;
            height: 120vh;
        }
    }

    @media only screen and (min-width: 600px) {

    .menuBar {
        display: none;
    }

    .navbar-span span {
        margin-right: 12px;


    }

    .material-symbols-outlined {
        display: none;
    }

    .navbar-span {
        margin-right: 30px;
    }

    .navbar-span span:hover {
        cursor: pointer;
        color: #646cffaa;

    }

    .navbar-span .router-link-exact-active {
        color: #646cffaa;
    }
    }

    
</style>