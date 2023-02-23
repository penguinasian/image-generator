<template>
    <div class="image-card">
        <img :src="image.photo" class="individual-image" @mouseenter="showImage=true" @mouseleave="showImage=false" />
        <div v-if="showImage" class="image-info" @mouseenter="showImage=true" @mouseleave="showImage=false">
            <p>{{ image.prompt }}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div
                    style="border: none; border-radius: 50%; background: #3ba15a; margin-left: 10px; width: 35px; text-align: center;">
                    <p style="font-size: 12px;">{{ image.name[0] }}</p>
                </div>
                <download-icon style="margin-right: 10px;" @click="downloadImage(image.photo, image._id)" />
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import DownloadIcon from 'vue-material-design-icons/Download.vue';
    import FileSaver from 'file-saver';
    export default {
        name: 'IndividualImage',
        props: ['image'],
        components: {
            DownloadIcon
        },
        data() {
            return {
                searchText: "",
                imagePosts: [],
                convertedImages: [],
                showImage: false
            }
        },
        methods: {
            downloadImage(imageUrl, id) {
                FileSaver.saveAs(imageUrl, `download-${id}.jpg`)
            }
        }

    }
</script>

<style scoped>
    @media only screen and (max-width: 400px) {

        img {
            max-width: 200px;
            max-height: 200px;
            object-fit: contain;
            border-radius: 10px;
        }

        .image-info {
            background: rgba(0, 0, 0, 0.8);
            border-radius: 5px;
            color: white;
            text-align: center;
            position: absolute;
            top: 120px;
            height: 85px;

        }

        p {
            font-size: 10px;
        }
    }

    @media only screen and (max-width: 600px) and (min-width: 400px) {


        img {
            max-width: 250px;
            max-height: 250px;
            object-fit: contain;
            border-radius: 10px;
        }


        .image-info {
            background: rgba(0, 0, 0, 0.8);
            border-radius: 5px;
            color: white;
            text-align: center;
            position: absolute;
            top: 140px;
            height: 110px;

        }

        p {
            font-size: 14px;
        }


    }

    @media only screen and (min-width: 600px) {

        img {
            max-width: 300px;
            max-height: 300px;
            object-fit: contain;
            border-radius: 10px;
        }


        .image-info {
            background: rgba(0, 0, 0, 0.8);
            border-radius: 5px;
            color: white;
            text-align: center;
            position: absolute;
            top: 180px;
            height: 120px;

        }
    }


    .image-card {
        position: relative;
    }


    .image-info:hover {
        cursor: pointer;
    }
</style>