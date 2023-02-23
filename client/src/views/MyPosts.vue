<template>
    <Navbar />
    <div class="myposts">
        <h2>Your Image Posts</h2>
        <p>This is the collection of images you created using Dall-E openai technology.</p>
        <form>
            <label>Search my images</label>
            <input type="text" v-model="searchText" @change="handleSearch" placeholder="Search">
        </form>

        <div v-if="imagePosts.length > 0" class="images">
            <div v-for="image in filteredImages" :key="image._id">
                <IndividualImage :image="image" />
            </div>
        </div>
    </div>
    <Footer />
</template>

<script>
    // @ is an alias to /src
    import { isProxy, toRaw, reactive } from 'vue';
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';
    import IndividualImage from '../components/IndividualImage.vue'
    export default {
        name: 'MyPosts',
        components: { Navbar, IndividualImage, Footer },
        data() {
            return {
                searchText: "",
                imagePosts: [],
                searchedImages: [],
            }
        },
        async mounted() {

            let useremail = localStorage.getItem('email')

            try {
                const response = await fetch('http://localhost:3000/api/v1/saveImage/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                console.log("data.response: ", data.response)
                if (response.ok) {
                    this.imagePosts = data.response.filter(image => {
                        return image.user === useremail
                    })
                    console.log(this.imagePosts)
                } else {
                    this.$router.push('/login-signup')
                }

                // this.convertedImages = JSON.parse(JSON.stringify(this.images))

            } catch (error) {
                console.error(error.message)
            }

        },
        methods: {

        },
        computed: {
            filteredImages() {

                return this.imagePosts.filter(image => {
                    return image.prompt.toLowerCase().includes(this.searchText.toLowerCase())
                })

            }
        },
    }
</script>

<style scoped>
    .myposts {

        position: relative;
        margin-top: 120px;
    }

    @media only screen and (max-width: 400px) {
        .myposts {
            max-width: 500px;
            margin: auto;
        }

        img {
            max-width: 150px;
            max-height: 150px;
            object-fit: contain;
            border-radius: 10px;
        }

        .images {

            display: grid;
            grid-template-columns: auto;
            gap: 20px;
            justify-content: center;
        }


    }

    @media only screen and (max-width: 600px) and (min-width: 400px) {


        img {
            max-width: 200px;
            max-height: 200px;
            object-fit: contain;
            border-radius: 10px;
        }

        .images {

            display: grid;
            grid-template-columns: auto;
            gap: 20px;
            justify-content: center;
        }
    }

    @media only screen and (min-width: 601px) {

        .myposts {
            max-width: 1200px;
            margin: auto;
        }

        img {
            max-width: 300px;
            max-height: 300px;
            object-fit: contain;
            border-radius: 10px;
        }

        .images {

            display: grid;
            grid-template-columns: auto auto auto;
            gap: 20px;
        }

        .myposts {

            position: relative;
            margin-top: 120px;
        }
    }

    .myposts {

        position: relative;
        margin-top: 120px;
    }

    form {
        padding-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;
    }

    input {
        height: 30px;
        border-radius: 5px;
        border-color: lightgray;
    }

    input:focus {
        border-color: #646cffaa;
    }

    label {
        font-weight: bold;
    }


    /* .image-card {
      position: relative;
    }
  
    .image-info {
      background: rgba(0, 0, 0, 0.7);
      border-radius: 5px;
      color: white;
      text-align: center;
      position:absolute;
      top:200px;
      height: 100px;
    
    } */
</style>