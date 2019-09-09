<template>
    <div>
        <div class="container ">
            <!-- <nav class="nav col-12 mt-xl-5 mt-5 d-flex align-items-center p-0">
                <img src="@/assets/img/logo-all-dark.svg" alt="Sweetast" class="col-3 p-0">
                <div class="nav-item d-flex align-items-center ml-auto">
                    <router-link to="/index" class="mr-md-5 mr-lg-7 text-primary font-weight-bold">首頁</router-link>
                    <router-link to="/products" class="mr-md-5 mr-lg-7 text-primary font-weight-bold">房型介紹</router-link>
                    <router-link v-if="msg = '以登出'" to="/login" class="mr-md-5 mr-lg-7 text-primary font-weight-bold">登入</router-link>
                    <router-link to="/admin/dashboardproducts" class="mr-md-5 mr-lg-7 text-primary font-weight-bold">後臺管理</router-link>
                    <router-link to="/ordermanger" class="mr-md-5 mr-lg-7 text-primary font-weight-bold">訂單管理</router-link>
                    <router-link to="/customercart"><img class="text-primary" src="@/assets/img/baseline-shopping_cart-24px.svg" alt="cart"></router-link>
                </div>
            </nav> -->

            <nav class="navbar navbar-expand-lg navbar-light col-12 mt-xl-5 mt-5 d-flex align-items-center p-0">
                <img src="@/assets/img/logo-all-dark.svg" alt="Sweetast" class="col-md-3 col-5 p-0">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav d-flex align-items-center ml-auto">
                    <li class="nav-item active mr-md-5 mr-lg-7 mb-3 mb-lg-0">
                        <router-link to="/index" class="navbar-brand text-primary font-weight-bold">首頁</router-link>
                    </li>
                    <li class="nav-item active mr-md-5 mr-lg-7 mb-3 mb-lg-0">
                        <router-link to="/products" class="text-primary font-weight-bold">房型介紹</router-link>
                    </li>
                    <li class="nav-item mr-md-5 mr-lg-7 mb-3 mb-lg-0">
                        <router-link v-if="msg = '以登出'" to="/login" class="text-primary font-weight-bold">登入</router-link>
                    </li>
                    <li v-if="login" class="nav-item mr-md-5 mr-lg-7 mb-3 mb-lg-0">
                        <router-link to="/admin/Dashboard/products" class="text-primary font-weight-bold">後臺管理</router-link>
                    </li>
                    <li class="nav-item mr-md-5 mr-lg-7 mb-3 mb-lg-0">
                        <router-link to="/ordermanger" class="text-primary font-weight-bold">訂單管理</router-link>
                    </li>
                    <li class="nav-item mb-3 mb-lg-0">
                        <router-link to="/customercart"><i class="fas fa-shopping-cart text-primary"></i></router-link>
                    </li>
                    </ul>
                </div>
            </nav>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            login:''
        };
    },
    mounted() {
        this.$bus.$on('loginRes:push',payload=>{
            this.login = payload;
        });
    },
}
</script>

<style>
nav{
    list-style: none;
}
</style>
