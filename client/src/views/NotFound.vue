<template>
    <Navbar />
    <div class="not-found">
      <h2>Sorry, the page you are looking for could not be found!</h2>
      <router-link to="/">Go back to home page</router-link>
    </div>
  </template>
  
  <script>
    // @ is an alias to /src
 
    export default {
      name: 'NotFound',
      components: {   },
      data() {
        return {
         
        }
      },
    
   
    }
  </script>
  
  <style scoped>
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    a {
        text-decoration: underline;
        color: #000;
        font-weight: bold;
    }
  </style>