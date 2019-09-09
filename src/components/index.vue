<template>
    <div>
        <AlertMsg/>
        <Navbar/>
        <div class="container">
            <div class="row h-100">
                <router-view></router-view>
            </div>
        </div>
        <div class="w-100"></div>
        <Footer/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import AlertMsg from './AlertMessage';
import Footer from './Footer';

export default {
    components:{
        Navbar,
        AlertMsg,
        Footer
    }
}
</script>

<style>
body{
    list-style: none;
}
</style>
