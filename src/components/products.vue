<template>
    <div class="d-flex flex-row flex-wrap justify-content-md-start justify-content-center">
        <ProductsTopListMD class="product-ui" @sendDormType="receiveDormType"/>
        <ProductsSearchMD class="product-ui" @send-search="receiveSearch"/>
        <ProductsSearchXS class="product-ui-xs" @send-search="receiveSearch"/>
        <ProductsTopListXS class="product-ui-xs" @sendDormType="receiveDormType"/>
        <router-view :DormType="DormType" :search="search" id="card-group" class="d-sm-flex flex-sm-wrap col-xl-9 col-md-9 mt-md-0 mt-sm-6 col-12 p-sm-0 p-1" data-aos="fade-up" data-aos-duration="2000"></router-view>
    </div>
</template>

<script>
import ProductsSearchXS from '@/components/ProductsSearch-xs'
import ProductsSearchMD from '@/components/ProductsSearch-md'
import ProductsTopListMD from '@/components/ProductsTopList-md'
import ProductsTopListXS from '@/components/ProductsTopList-xs'

export default {
    data(){
        return{
            search:{
                HotelName:'',
                check_in_date:'yyyy-MM-dd',
                check_out_date:'yyyy-MM-dd',
                guestsnum:1,
            },
            DormType:'經典雙人房'
        };
    },
    components:{
        ProductsTopListMD,
        ProductsSearchXS,
        ProductsSearchMD,
        ProductsTopListXS
    },
    methods: {
        receiveSearch(res){
            this.search = res;
        },
        receiveDormType(res){
            this.DormType = res;
        }
    },
}
</script>


<style lang="scss" scoped>
.product-ui{
    display: flex !important;
}
.product-ui-xs{
    display: none !important;
}
@media only screen and (max-width:768px){
    .product-ui{
        display: none !important;
    }
    .product-ui-xs{
        display: flex !important;
    }
}
</style>
