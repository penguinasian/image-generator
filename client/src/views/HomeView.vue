<template>
  <Navbar />
  <div class="home">
    <h2>The Community Showcase</h2>
    <p>Browser thourgh a collection of visually stunning AI generated images.</p>
    <form>
      <label>Search images</label>
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
    name: 'HomeView',
    components: { Navbar, IndividualImage, Footer },
    data() {
      return {
        searchText: "",
        imagePosts: [],
        searchedImages: [],
      }
    },
    async mounted() {

      try {
        const response = await fetch('http://localhost:3000/api/v1/saveImage/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        const data = await response.json();
        if (response.ok) {
          this.imagePosts = data.response
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

  @media only screen and (max-width: 400px) {
    .home {
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

    .home {
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
  }



  .home {

    /* height: calc(100vh - 50px); */
    max-width: 1200px;
    margin: auto;
    margin-top: 120px;
    position: relative;
  }

  .home h2 p {
    text-align: left;
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