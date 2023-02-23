<template>
    <div class="footer">

        <p>Copyright &copy; 2023 Daniel Zhang All rights reserved</p>
        <p>Contact: zhangqiangtianchen@gmail.com</p>
    </div>
</template>

<script>
    // @ is an alias to /src
   

    export default {
        name: 'Footer',
        components: {  },
        data() {
            return {
                
            }
        },
        methods: {
           
        }
    }
</script>

<style scoped>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 15vh;
    line-height: 0.5px;
    margin-top: 50px
  }
  .footer p {
    font-size: 1rem;
  }
</style>