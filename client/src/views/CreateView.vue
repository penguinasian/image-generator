<template>
    <Navbar />
    <div class="create">
        <h2>Create</h2>
        <p>Create visually stunning images via Dall-E AI and share it with the community</p>
        <div class="form">
            <div class="input-field">
                <label>Your name</label>
                <input type="text" v-model="name" placeholder="Your name" required>
            </div>
            <div class="input-field">
                <div>
                    <label>Prompt</label>
                    <button @click="handleSurprise">Surprise me</button>
                </div>

                <input type="text" v-model="prompt" placeholder="Reading on a sunny day at the beach">
                <p class="error" v-if="!prompt">{{ error }}</p>
            </div>

        </div>


        <div v-if="!isLoading" class="image-card">
            <img v-bind:src="imgUrl" />
        </div>

        <div v-if="isLoading" class="image-card">
            <p>loading...</p>
        </div>


        <div v-if="isLoading" class="btnDiv">
            <button @click="handleGenerate" disabled style="background-color: gray;" class="createBtn">Generating</button>
        </div>
        <div v-else class="btnDiv">
            <button @click="handleGenerate" class="createBtn">Generate</button>
        </div>
        <br>
        <br>
        <h2>Share with the community</h2>
        <p>Feel free to share it with the community when the image is generated</p>
        <div v-if="!isSaving" class="btnDiv">
            <button @click="handleSave" style="background-color: #646cffaa;" class="createBtn">Share with the community</button>
        </div>
        <div v-if="isSaving" class="btnDiv">
            <button disabled style="background-color: gray;" class="createBtn">Sharing</button>
        </div>

    </div>
    <Footer />
</template>

<script>
    // @ is an alias to /src
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';
    import { PulseLoader } from 'vue-spinner/src/PulseLoader.vue';
    import { useGenerateRandomPrompt } from '../composables/index.js';

    export default {
        name: 'CreateView',
        components: { Navbar, Footer },
        data() {
            return {
                imgUrl: require('../assets/preview.png'),
                uri: 'http://localhost:3000/api/v1/dalle/',
                uriSave: 'http://localhost:3000/api/v1/saveImage/',
                prompt: '',
                isLoading: false,
                error: '',
                displayed: false,
                isSaving: false,
            }
        },
        async mounted() {
            const response = await fetch(this.uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ prompt: this.prompt })
            })
            console.log(response.status)
            if (response.status === 401) {
                this.$router.push('/login-signup')
            }
        },
        methods: {

            async handleGenerate() {


                try {

                    if (this.prompt === '') {
                        this.error = 'Please enter a sentence!'
                        this.displayed = true
                        throw Error({ message: 'Empty filed' })
                    }

                    this.isLoading = true
                    const response = await fetch(this.uri, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                        body: JSON.stringify({ prompt: this.prompt })
                    })

                    const data = await response.json()
                    console.log(data)
                    console.log(data.photo)
                    this.imgUrl = data.photo

                } catch (error) {
                    console.error(error.message)
                } finally {
                    this.isLoading = false
                }
            },

            handleSurprise() {
                this.prompt = useGenerateRandomPrompt(this.prompt)
            },

            async handleSave() {
                try {

                    let useremail = localStorage.getItem('email')
                    this.isSaving = true
                    const response = await fetch(this.uriSave, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                        body: JSON.stringify({ prompt: this.prompt, name: this.name, photo: this.imgUrl, email: useremail })
                    })

                    const data = await response.json()
                    console.log(data)
                    this.$router.push('/')
                } catch (error) {

                    console.log(error.message)
                } finally {
                    this.isSaving = false
                }
            }
        }
    }
</script>

<style scoped>
    @media only screen and (max-width: 600px) {

        .btnDiv {
            margin:auto;
            display: flex;
            justify-content: center;
        }
        .createBtn {
            width: 50%;
        }

        .image-card {
            margin: auto;
            display: flex;
            justify-content: center;
        }

        .input-field div {
            margin-left: 35px;
        }
    }

    img {
        max-width: 300px;
        max-height: 300px;
        object-fit: cover;
        border-radius: 10px;
    }

    .create {
        margin: auto;
        margin-top: 120px;
        max-width: 1200px;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    .input-field {
        display: flex;
        flex-direction: column;
    }

    .input-field button {
        background-color: gray;
        width: 100px;
        height: 25px;
        cursor: pointer;
        margin-left: 3px;
        border-radius: 20px;
        margin-bottom: 2px;
    }

    label {
        margin-bottom: 3px;
    }

    button {
        width: 600px;
    }

    .image-card {
        position: relative;
        border-radius: 10px;
        background-color: #f5f5f5;
        width: 300px;
        height: 300px;
    }

    .image-card p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>