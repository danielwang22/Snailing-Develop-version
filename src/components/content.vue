<template>
    <div id="content-container" class="h-100">
        <!-- topimage -->
        <div class="top-image col-12 p-sm-1 mt-sm-6 mt-md-0 mt-lg-2 mt-lg-5 p-md-0 p-lg-0 d-flex flex-wrap align-items-center overflow-hidden" data-aos="fade-zoom-in"
        data-aos-duration="1200"
        data-aos-easing="ease-in-back"
        data-aos-offset="0">
            <div class="col-sm-6 order-sm-0 mt-sm-0 col-12 order-1 mt-7">
                <h2 id="topimage-title" class="text-primary font-weight-bold">享受簡單的旅程體驗</h2>
                <h5 id="topimage-content" class="mt-lg-2 mt-sm-0 text-forth font-weight-light SourceLight">
                我們生活在一個充滿美麗，魅力和冒險的美妙世界，只有我們睜著眼睛尋求它們，我們才能擁有永無止境的冒險
                </h5>
                <a @click="scrollTop" id="topimage-btn" class="btn btn-primary mt-2 SourceLight text-light">Learn More</a>
            </div>
            <img svg-inline svg-sprite src="@/assets/MainTopImage.svg" class="col-sm-6 order-sm-1 mt-sm-0 col-12 mt-3 order-0" />
        </div>
        <!-- section1 -->
        <div id="section" class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-md-between justify-content-center mt-xl-7 mt-md-7 mt-7" data-aos="fade-left" data-aos-duration="1800">
            <!-- content -->
            <div class="d-flex flex-row justify-content-md-start order-1 order-md-1 col-lg-6 col-md-6 col-12 mt-md-0 mt-5">
                <ul class="h6 font-weight-light">
                    <ol><h1 class="text-primary font-weight-bold">旅行累了</h1></ol>
                    <ol><h5 class="text-forth font-weight-normal mb-5">在這裡可以尋找到甚麼</h5></ol>
                    <ol>休息是為了走更長的路，累了就停</ol>
                    <ol>下腳步讓我們替你找到舒適的住宿</ol>
                    <ol>充飽了電再出發</ol>
                </ul>
            </div>
            <!-- image -->
            <img class="col-lg-6 col-md-6 col-sm-8 order-0 order-md-2 col-12" src="../assets/IndexSectionCampfire.svg" alt="Booking">
        </div>
        <!-- section2 -->
        <div class="w-100 d-flex flex-row flex-wrap align-items-center justify-content-md-between justify-content-center mt-7" data-aos="fade-right" data-aos-duration="1800">
            <img class="col-md-6 col-sm-8 col-12" src="../assets/IndexSectionBooking.svg" alt="Booking">
            <!-- content -->
            <div class="d-flex flex-row justify-content-md-end col-md-6 col-12 mt-md-0 mt-5">
                <ul class="h6 font-weight-light">
                    <ol><h1 class="text-primary font-weight-bold">找訂房</h1></ol>
                    <ol><h5 class="text-forth font-weight-normal mb-5">在這裡可以尋找到甚麼</h5></ol>
                    <ol>我們提供最簡單的方式，尋找您心目中</ol>
                    <ol>最理想的住宿，四種房型任你挑選，讓</ol>
                    <ol>您在冒險的過程中，有個溫暖的避風港</ol>
                </ul>
            </div>
        </div>
        <!-- ... -->
        <div class=" col-12 d-flex justify-content-center mt-xl-8 mt-8" data-aos="fade-up" data-aos-duration="1000">
            <img class="somefont col-md-2 col-sm-2 col-5" src="@/assets/img/sm-今天是個吃甜點的好日子.svg" alt="想吃甜點是不需要理由的">
        </div>
        <!-- card -->
        <div id="card" class="
        d-grid grid-row align-items-stretch
        mt-xl-8 mt-8">

            <div class="
            card-item
            grid-col-sm-start-1 grid-col-sm-span-3 grid-row-sm-start-1 grid-row-sm-span-1 
            grid-col-start-1 grid-col-span-7 grid-row-start-1 grid-row-span-1 
            d-flex flex-md-row flex-column flex-wrap align-content-stretch align-items-center
            border-0">

                <img class="col-8 col-sm col-md-7 p-1" src="../assets/doublebed.svg" alt="">
                <div class="col-md-5 d-flex flex-column justify-content-center">
                    <p class="card-text text-center text-primary font-weight-lighter">Double bed</p>
                    <div class="d-flex justify-content-center align-items-start">
                        <router-link to="/products" class="btn btn-thrid text-primary SourceLight">Learn More</router-link>
                    </div>
                </div>

            </div>
            <div class="
            card-item
            grid-col-sm-start-1 grid-col-sm-span-3 grid-row-sm-start-2 grid-row-sm-span-1 
            grid-col-start-1 grid-col-span-7 grid-row-start-2 grid-row-span-1 
            d-flex flex-md-row flex-column flex-wrap align-content-stretch align-items-center
            border-0">

                <img class="col-8 col-sm col-md-7 p-1" src="../assets/bunk.svg" alt="">
                <div class="col-md-5 d-flex flex-column justify-content-center">
                    <p class="card-text text-center text-primary">Bunk bed</p>
                    <div class="d-flex justify-content-center align-items-start">
                        <router-link to="/products/mixdorm" class="btn btn-thrid text-primary SourceLight">Learn More</router-link>
                    </div>
                </div>

            </div>

            <div class="
            card-item
            grid-col-sm-start-4 grid-col-sm-span-3 grid-row-sm-start-1 grid-row-sm-span-1
            grid-col-start-1 grid-col-span-7 grid-row-start-3 grid-row-span-1  
            d-flex flex-md-row flex-column flex-wrap align-content-stretch align-items-center
            border-0">

                <img class="col-8 col-sm col-md-7 p-1" src="../assets/tent.svg" alt="">
                <div class="col-md-5 d-flex flex-column justify-content-center">
                    <p class="card-text text-center text-primary">Tent</p>
                    <div class="d-flex justify-content-center align-items-start">
                        <router-link to="/products/tentdorm" class="btn btn-thrid text-primary SourceLight">Learn More</router-link>
                    </div>
                </div>

            </div>

            <div class="
            card-item
            grid-col-sm-start-4 grid-col-sm-span-3 grid-row-sm-start-2 grid-row-sm-span-1
            grid-col-start-1 grid-col-span-7 grid-row-start-4 grid-row-span-1  
            d-flex flex-md-row flex-column flex-wrap align-content-stretch align-items-center
            border-0">

                <img class="col-8 col-sm col-md-7 p-1" src="../assets/signalbed.svg" alt="">
                <div class="col-md-5 d-flex flex-column justify-content-center">
                    <p class="card-text text-center text-primary">Signalbed</p>
                    <div class="d-flex justify-content-center align-items-start">
                        <router-link to="/products/tentdorm" class="btn btn-thrid text-primary SourceLight">Learn More</router-link>
                    </div>
                </div>

            </div>

            
            
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data() {
        return {

    }
    },
    methods: {
        scrollTop(){
            $("html, body").animate({scrollTop: $('#section').offset().top }, 500);
        }
    }
}
</script>

<style lang="scss" scoped>
ul,ol{
    margin-left: 0;
    padding-left: 0;
}
.card-item{
    transition:all 1s ease-in-out;
    &:hover{
        width: 105%;
    }
}
@media (min-width: 0px) and (max-width:576px){
    .somefont{
        height: 400px;
    }
    .navbar-toggler{
        padding: 0.25rem -0.25rem !important;
    }
    .card-item{
    transition:all 1s ease-in-out;
        &:hover{
            width: 100%;
        }
    }
}
</style>
