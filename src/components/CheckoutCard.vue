<template>
    <div>


            <form id="checkout-card" class="d-flex flex-column w-100 bg-primary p-2">
                <h3 class="text-secondary font-weight-bold">訂單摘要</h3>
                <div class="form-group mt-lg-8 mt-6">
                    <h6 class="p-0 text-right text-secondary SourceLight float-left">小記</h6>
                    <h6 class="p-0 text-right text-secondary SourceLight float-right">{{num.finalprice}}</h6>
                </div>
                <div class="form-group">
                    <h6 class="p-0 text-right text-secondary SourceLight float-left">平台費</h6>
                    <h6 class="p-0 text-right text-secondary SourceLight float-right">{{planformfee}}</h6>
                </div>
                <div class="form-group mt-1 border-top pt-2">
                    <h4 class="p-0 text-right text-secondary font-weight-bold float-left">總價</h4>
                    <h4 class="p-0 text-right text-secondary font-weight-bold float-right">{{ num.finalprice + planformfee }}</h4>
                </div>
                
                <router-link id="order-btn" to="customercart/personalprofile" class="btn btn-outline-secondary font-weight-bold align-self-end">確認</router-link>
            </form>


    </div>
</template>
<script>
export default {
    data() {
        return {
            carts:{},
            planformfee:100,
            num:{},
        };
    },
    computed:{
        
    },
    methods: {
        getcart(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.get(url).then((response) =>{
                vm.carts = response.data.data;
                console.log(response.data);
            });
        },
    },
    created() {
        this.$bus.$on('pricepush',(price = 0) =>{
            console.log(price);
            this.$set(this.num,'finalprice',price);
        });
        this.getcart();
    },
    beforeDestroy() {
        var vm = this;
        vm.$bus.$emit('pricepush',vm.num.finalprice);
    },
}
</script>
<style lang="scss">
#checkout-card{
    height: 345px;
}
#order-btn{
    width: 50%;
}
@media (min-width: 768px) and (max-width: 992px){
    #checkout-card{
        height: 310px;
    }
}
@media (max-width: 767px){
    #order-btn{
        width: 100%;
    }
}
</style>
