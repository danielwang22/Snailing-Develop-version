<template>

    <div class="d-flex flex-column w-100 col-12 p-2 mt-7 mb-5">
        <h1 id="order-manger" class="col text-primary font-weight-bold">訂單管理</h1>

        <div id="order-manger-selecter-group" class="form-group w-50 col">
            <select id="order-manger-selecter" class="form-control border-0 text-primary SourceBold" name="" v-model="Ispaid">
                <option class="text-primary SourceBold" value="全部" selected>全部</option>
                <option class="text-primary SourceBold" value="已付款">已付款</option>
                <option class="text-primary SourceBold" value="未付款">未付款</option>
            </select>
        </div>

        <div v-for="(item) in FilterIsPaid" :key="item.id" class="col p-0 mt-4">
            <div class="d-sm-flex flex-sm-row flex-sm-wrap p-1 shadow">

                <div class="d-flex flex-row justify-content-between col-12 border-bottom pb-1">
                    <div id="" class="">
                        <small class="text-muted">訂單編號</small>
                        <h5 class="text-primary order-num SourceLight">{{item.id}}</h5>
                    </div>
                    <div id="" class=" text-right">
                        <small class="text-muted">下單日期</small>
                        <h5 class="text-primary order-date SourceLight">{{item.create_at | moment("YYYY-MM-DD")}}</h5>
                    </div>
                </div>

                <div v-for="item2 in item.products" :key="item2.id" class="d-sm-flex flex-sm-row flex-sm-wrap col-12 pt-2 pb-2">
                    <div class="d-sm-flex flex-sm-row align-items-sm-center col-sm-4 overflow-hidden">
                        <div class="product-image d-block img-fluid w-100" :style="{backgroundImage:`url(${item2.product.imageUrl})`}"  style="background-position: center;background-size: 100% 100%;"></div>
                    </div>

                    <div class="d-flex flex-wrap col-sm-5 mt-sm-0 mt-3">
                        <a href="#" @click.prevent="GoToTempProduct(item2.product_id)" class="product-title h5 col-12">
                            {{item2.product.title}}
                        </a>
                        <div class="d-flex mt-sm-7 mt-3 col-12 p-0">
                            <div class="checkDate form-group text-center text-sm-left col w-50 mb-0">
                                <label for="exampleInputEmail1" class="text-primary checkDate-label">入住</label>
                                <h6 class="checkDate-text SourceLight">{{item2.checkInDate}}</h6>
                            </div>
                            <div class="checkDate form-group text-center text-sm-left col w-50 mb-0">
                                <label for="exampleInputEmail1" class="text-primary checkDate-label">退房</label>
                                <h6 class="checkDate-text SourceLight">{{item2.checkOutDate}}</h6>
                            </div>
                        </div>
                    </div>  

                    <div class="col-sm-3 mt-sm-0 col-12 mt-3 d-flex flex-column justify-content-between h-100">
                        <h5 class="product-finaltotal text-sm-right text-center text-primary">$ {{item2.finalTotal}} TWD </h5>
                        <div class="mt-5 d-flex flex-row flex-wrap text-primary SourceLight">
                            <span class="personal-profile col-12 word-wrap">訂房人: {{item.user.name}}</span>
                            <span class="personal-profile col-12 word-wrap">連絡電話 :{{item.user.tel}}</span>
                            <span class="personal-profile col-12 word-wrap">聯絡Email :{{item.user.email}}</span>
                        </div>
                    </div>
                </div>


                <div class="d-flex flex-row justify-content-between align-items-center col-12 border-top pt-2">
                    <h4 class="text-primary Finalprice">
                        總價 : $ {{item.Finalprice}}
                    </h4>
                    <h5 class="text-danger">
                        <button v-if="item.is_paid === true" class="btn text-info">已付款</button>
                        <button v-else class="btn text-danger" @click="payOrder(item.id)">未付款</button>
                    </h5>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            orders:[],
            Ispaid:'全部',
            Finalprice:[]
        };
    },
    computed: {
        FilterIsPaid: function(){
            var vm = this;
            return vm.orders.filter(function(item){
                if(vm.Ispaid == '已付款'){
                    return item.is_paid == true;
                }else if(vm.Ispaid == '未付款'){
                    return item.is_paid == false;
                }else{
                    return (item.is_paid == true || item.is_paid == false);
                }
            })
        },
    },
    methods:{
        getOrders(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders`;
            // vm.isLoading = true;
            this.$http.get(url).then((response) =>{
                vm.orders = response.data.orders;
                for(let i = 0;i<response.data.orders.length;i++){
                    var newTotal = 0;
                    Object.keys(response.data.orders[i].products).map(function(objectKey, index) {
                        var value = response.data.orders[i].products[objectKey];
                        newTotal += (value.finalTotal + 100);
                    });
                    vm.$set(vm.orders[i],'Finalprice',newTotal);
                }
            });
        },
        payOrder(id){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${id}`;
            this.$http.post(url).then((response) =>{
                //console.log(response.data);
                if(response.data.success){
                    vm.getOrders();
                }
                vm.isLoading = false;
            });
        },
        GoToTempProduct(id){
            this.$router.push(`/tempproduct/${id}`);
        },
    },
    created() {
        this.getOrders();
    },
}
</script>
<style lang="scss">
#order-manger-selecter-group{
    border-bottom: thin solid #3F5D45 !important;
}
.product-image{
    height: 100% !important;
}
.word-wrap{
    word-wrap: break-word;
}
@media (min-width:0px) and (max-width:576px){
    #order-manger{
        font-size: 1.8rem !important;
    }
    .order-num{
        font-size: 0.75rem;
    }
    .order-date{
        font-size: 1rem;
    }
    .product-image{
        height: 230px !important;
    }
    .product-finaltotal{
        font-size: 1.2rem;
    }
    .Finalprice{
        font-size: 1.5rem;
    }
}
@media (min-width:576px) and (max-width:768px){
    #order-manger{
        font-size: 2rem !important;
    }
    .order-num,
    .order-date{
        font-size: 1rem;
    }
    .product-image{
        height: 75% !important;
    }
    .product-title{
        font-size: 1rem;
    }
    .product-finaltotal{
        font-size: 1rem;
    }
    .checkDate-label,
    .checkDate-text{
        font-size: 0.75rem !important;
    }
    .personal-profile{
        font-size: 0.75rem;
    }
}
</style>
