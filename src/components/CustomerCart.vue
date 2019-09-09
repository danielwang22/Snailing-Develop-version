<template>
    <div class="d-flex flex-wrap w-100 mt-7 mb-5">


        
        <div class="carts d-sm-flex flex-sm-column col-md-8 col-12">
            <div v-for="item in carts.carts" :key="item.id" class="d-flex w-100">
                <div class="d-flex flex-row flex-wrap col w-100 p-1 mb-4 shadow">
                    <div class="col-lg-5 col-md-6 col-sm-6 col-12 w-100 overflow-hidden cart-img-group">
                        <div class="d-block w-100 cart-img" :style="{backgroundImage:`url(${item.product.imageUrl})`}" style="background-position: center;background-size: 100% 100%;"></div>
                    </div>

                    <div class="d-flex flex-column col-lg-7 col-md-6 mt-sm-0 mt-3">
                        <i class="fas fa-trash-alt text-primary align-self-end mr-lg-0 mr-sm-n1" @click="delCart(item.id)"></i>
                        <div id="" class="h5 text-primary cart-title">
                            {{item.product.title}}
                        </div>
                        <div class="d-flex mt-lg-1 mt-md-0">
                            <div class="form-group w-50 pr-1 mb-0">
                                <label for="exampleInputEmail1" class="text-primary">入住</label>
                                <span id="" class="customer-cart-checkin SourceLight bg-light border-0 form-control rounded-0">{{item.checkInDate}}</span>
                            </div>
                            <div class="form-group w-50 pr-1 mb-0">
                                <label for="exampleInputEmail1" class="text-primary">退房</label>
                                <span id="" class="customer-cart-checkout SourceLight bg-light border-0 form-control rounded-0">{{item.checkOutDate}}</span>                            </div>
                        </div>
                        <div class="d-flex mt-1 align-items-center">
                            <div class="badge badge-secondary SourceLight">優惠折扣</div>
                            <span id="" class="discount-text ml-1 text-primary font-weight-light SourceLight">discount 80%</span>
                        </div>
                        
                        <h5 id="" class="finalTotal text-right text-primary font-weight-bold p-lg-1 p-0 pb-md-0 mt-sm-0 mt-3">$ {{item.finalTotal}} TWD </h5>
                        
                    </div>
                    
                </div>
            </div>
        </div>

        <router-view class="col-md-4 mt-md-0 p-md-0 pl-md-1 mt-6 col-12 p-2 d-flex justify-content-center p-0"></router-view>


    </div>
</template>
<script>
export default {
    data() {
        return {
            carts:{},
            isActive:0,
            check_in_date:'0000-00-00',
            check_out_date:'0000-00-00',
            num:{
                finalprice:0,
            }
        };
    },
    computed:{
        nextstep(){
            this.isActive = 1;
        },
    },
    updated() {
        // console.log("i'm here",this.carts.carts.length);
        // for(let i = 0 ; i < this.carts.carts.length;i++){
        //     this.num = this.carts.carts[i].finalTotal;
        // }
    },
    methods: {
        getcart(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.get(url).then((response) =>{
                vm.carts = response.data.data;
                console.log(response.data);
                console.log(vm.carts);

                var Num = 0;
                for(let i = 0 ; i < this.carts.carts.length;i++){
                    Num += this.carts.carts[i].finalTotal;
                }
                vm.$set(vm.num,'finalprice',Num);
                vm.$bus.$emit('pricepush',vm.num.finalprice);
            });
        },
        delCart(id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            this.$http.delete(api).then((response) =>{
                console.log(response.data);
                vm.getcart();
            });
        },
    },
    created() {
        this.getcart();
    },
}
</script>

<style lang="scss">
.carts{
    height: 720px;
    overflow-y: scroll;
    scrollbar-color: rgb(206, 206, 206) rgb(224, 224, 224);
    scrollbar-width: thin;
}
.cart-img-group,
.cart-img{
    height: 100%;
}
@media (min-width: 0px) and (max-width: 576px){
    .carts{
        height: 400px;
        overflow-y: scroll;
        scrollbar-color: rgb(206, 206, 206) rgb(224, 224, 224);
        scrollbar-width: thin;
    }
    .cart-img-group,
    .cart-img{
        height: 230px;
    }
    .discount-text{
        font-size: 80% !important;
    }
    .badge{
        font-size: 70%;
    }
    label[for=exampleInputEmail1]{
        font-size: 80%;
        margin-bottom: 0;
    }
    .finalTotal{
        font-size: 1.5rem;
    }
}
@media (max-width: 576px){
    
}

@media (min-width: 567px) and (max-width: 768px){
    .carts{
        height: 400px;
        overflow-y: scroll;
        scrollbar-color: rgb(206, 206, 206) rgb(224, 224, 224);
        scrollbar-width: thin;
    }
    .fa-trash-alt{
        font-size: 95%;
    }
    .cart-title{
        font-size: 95%;
    }
    .customer-cart-checkin,
    .customer-cart-checkout{
        font-size: 80%;
    }
    label[for=exampleInputEmail1]{
        margin-bottom: 0;
    }
}
@media (min-width: 768px) and (max-width: 992px){
    .cart-title{
        font-size: 80%;
    }
    .fa-trash-alt{
        font-size: 95%;
    }
    .discount-text{
        font-size: 90% !important;
    }
    .customer-cart-checkin,
    .customer-cart-checkout{
        font-size: 80%;
        padding-top: -8px;
    }
    label[for=exampleInputEmail1]{
        font-size: 90%;
        margin-bottom: 0;
    }
    .finalTotal{
        font-size: 1.2rem;
    }
}
// #checkout-card{
//     height: 345px;
// }
</style>
