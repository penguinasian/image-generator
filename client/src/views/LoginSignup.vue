<template>
    <div class="login">
        <div class="auth-process">
            <img :src="logo" class="logo">
            <h3>Welcome to OpenAi Image Generating Platform</h3>
        </div>
        <form v-if="isLogin" @submit="handleLogin">
            <div class="input-field">
                <label>Email</label>
                <input type="text" v-model="email" required>
            </div>
            <div class="input-field">
                <label>Password</label>
                <input type="password" v-model="password" required>
            </div>
            <div style="display: flex; align-items: center; flex-direction: column;">
                <p v-if="errorMessage.length > 0" class="error"> {{ errorMessage }}</p>
                <p>Not a member yet? <a @click="{isLogin=false; this.errorMessage=''}">Sign up</a></p>
                <button>Log in</button>
            </div>

        </form>
        <form v-if="!isLogin" @submit="handleSignup">
            <div class="input-field">
                <label>Email</label>
                <input type="text" v-model="email" required>
            </div>
            <div class="input-field">
                <label>Username</label>
                <input type="text" v-model="username" required>
            </div>
            <div class="input-field">
                <label>Password</label>
                <input type="password" v-model="password" required>
            </div>
            <div style="display: flex; align-items: center; flex-direction: column;">
                <p v-if="errorMessage.length > 0" class="error"> {{ errorMessage }}</p>
                <p>Already a memeber? <a @click="{isLogin=true; this.errorMessage=''}">Login in</a></p>
                <button>Sign up</button>
            </div>

        </form>
    </div>
</template>

<script>
    // @ is an alias to /src


    export default {
        name: 'Login',
        components: {},
        data() {
            return {
                logo: require('../assets/logo.svg'),
                username: '',
                email: '',
                password: '',
                isLogin: true,
                errorMessage: '',
            }

        },
        methods: {
            async handleLogin(e) {
                e.preventDefault();
                console.log(this.email, this.password)
                const { email, password } = this;
                try {
                    const response = await fetch('http://localhost:3000/api/v1/user/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    });
                    const data = await response.json();
                    
                    if (response.ok) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('email', data.email);
                        this.$router.push('/');
                    } else {
                        this.errorMessage = data.message;
                    }
                    
                } catch (error) {
                    
                    console.error(error.message)
                }

            },

            async handleSignup(e) {
                e.preventDefault();
                console.log(this.email, this.username, this.password)
                const { email, password, username } = this;
                try {
                    const response = await fetch('http://localhost:3000/api/v1/user/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            password,
                            username
                        }),
                    });
                    const data = await response.json();
                    
                    if (response.ok) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('email', data.email);
                        this.$router.push('/');
                    } else {
                        this.errorMessage = data.message;
                    }
                    
                } catch (error) {
                    
                    console.error(error.message)
                }

            }
        }
    }
</script>

<style scoped>
    .login {
        height: 65vh;
        max-width: 1200px;
        margin: auto;
        margin-top: 120px;
        border-radius: 8px;
        background: white;
        border-style: outset;
    }

    .auth-process {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-self: center;
        align-items: center;
        line-height: 0.5px;
        margin-bottom: 15px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 70%;
        margin: auto;
        /* align-items: center; */
    }

    input {
        width: 100%;
    }

    a {
        text-decoration: underline;
    }

    button {
        width: 200px;
    }

    p {
        line-height: 0.5px;
    }

</style>