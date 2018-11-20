<template>
    <div class="container">
           
            <vueshowpdf @closepdf="closepdf" v-model="isshowpdf" :pdfurl="pdfurls" @pdferr="pdferr" :maxscale='4' :minscale='0.6' :scale='1.1' ></vueshowpdf>
    </div>
</template>
<script>
    import vueshowpdf from 'vueshowpdf'
    export default {
        data(){
            return{
                 pdfurls:'//cdn.mozilla.net/pdfjs/tracemonkey.pdf',
                 isshowpdf:false
            }
           
        },
        methods:{
            closepdf(){
                this.isshowpdf = false
            },
            pdferr(errurl) {
                console.log(errurl);
            }
        },
        components:{
            vueshowpdf
        }
    }
</script>