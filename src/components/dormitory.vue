<template>
    <div id="products">

        <loading :active.sync="isLoading"></loading>
        <div v-for="(item,index) in products" :key="item.id" class="products d-flex w-100">
            <div class="d-flex flex-row flex-wrap col w-100 p-1 mb-4 shadow">
                <!-- 輪播 -->
                <div :id="`carouselExampleControls${index}`" class="carouselExampleControls carousel slide col-sm-5 col-12" data-ride="carousel" data-interval="false">
                    <div class="carousel-inner rounded w-100 h-100">
                        <div class="carousel-item w-100 h-100 active overflow-hidden">
                            <div class="d-block w-100 h-100" :style="{backgroundImage:`url(${item.imageUrl})`}" style="background-position: center;background-size: 100% 100%;"></div>
                        </div>
                        <div class="carousel-item w-100 h-100 overflow-hidden">
                            <div class="d-block w-100 h-100" :style="{backgroundImage:`url(${item.imageUrl1})`}" style="background-position: center;background-size: 100% 100%;"></div>
                        </div>
                        <div class="carousel-item w-100 h-100 overflow-hidden">
                            <div class="d-block w-100 h-100" :style="{backgroundImage:`url(${item.imageUrl2})`}" style="background-position: center;background-size: 100% 100%;"></div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" :href="`#carouselExampleControls${index}`" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" :href="`#carouselExampleControls${index}`" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

                <div class="d-flex flex-column col-sm-7 mt-sm-0 col-12 mt-3">
                    <div class="d-flex flex-row justify-content-between mb-md-1">
                        <span class="badge badge-forth align-self-center SourceLight" style="width:60%">{{item.content}}</span>
                    </div>
                    <router-link :to="{path: `/tempproduct/${item.id}`}" @click.native="SearchSend" class="dorm_title h5 mt-md-0 mt-sm-1 mt-1 text-primary">{{item.title}}</router-link>
                    <small class="SourceLight text-secondary">
                        {{addressText(item)}}
                    </small>
                    <small class="SourceLight">
                        {{item.description}}
                    </small>
                    <div class="d-flex flex-row flex-wrap mt-lg-6 mt-md-3 mt-sm-4 mt-4 align-items-end justify-content-between">
                        <div class="col-sm order-sm-1 col-12 p-0 products-price">
                            <div class="text-muted text-right SourceLight mb-1">共 {{item.unit}} 間</div>
                            <div class="p-0 mb-0 text-right h5 text-primary">$ {{item.origin_price}} TWD / 晚</div>
                            <small class="text-muted float-right SourceLight">總金額$ {{item.price}} TWD</small>
                        </div>
                        <div class="col-sm order-sm-0 col-12 p-sm-0 products-star text-right text-sm-left">
                            <i v-for="num in 5" :key="num" class="fas fa-star p-1 text-warning"></i>
                            <span class="ml-1 SourceLight">120</span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        search:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        DormType:{
            type:String,
            default:'經典雙人房'
        }
    },
    data(){
        return{
            isLoading:false,
            products:[],
            productsCopyB:[],
            product:{},
            total_pages:1,
        };
    },
    watch:{
        'search.HotelName':{
            handler(New,Old){
                this.FilterProduct(New)
            },
            immediate:false
        },
        'DormType':{
            handler(New,Old){
                this.getProducts(New)
            },
            immediate:false
        },
    },
    computed: {
    },
    methods:{
        async getProducts(Dormtype = '經典雙人房'){
            const vm = this;
            let PRODUCTS = [];
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            vm.isLoading = true;
            await this.$http.get(url).then((response) =>{
                vm.total_pages = response.data.pagination['total_pages'];
            });
            for(let i = 1;i<=vm.total_pages;i++){
                url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${i}`
                this.$http.get(url).then((response) =>{
                    response.data.products.forEach((element,index) => {
                        console.log(Dormtype);
                        if(element.category == Dormtype){
                            PRODUCTS.push(element);
                            vm.products = PRODUCTS;
                            vm.isLoading = false;
                            vm.productsCopyB = PRODUCTS;
                        }
                    });
                });
            }
            console.log('vm.products',vm.products);
        },
        SearchSend(){
            this.$bus.$emit("SearchSend",this.search);
        },
        FilterProduct(place){
            if(place == "") {
                this.products = this.productsCopyB
                console.log('this.products',this.products);
                return;
            }
            const resOne = this.products.filter(Element=>{
                if(Element.address == undefined || Element.address.autocompleteText == undefined) return;
                return Element.address.autocompleteText.includes(place);
            })
            this.products = resOne;
            console.log('resOne',resOne);
        },
        addressText(item){
            if(item.address != undefined){
                let autocompleteText = item.address.autocompleteText == undefined ? '' : item.address.autocompleteText;
                return `${autocompleteText}`
            }else{
                return "未設定地址"
            }
        },
    },
    created(){
        this.getProducts();
    },
}
</script>

<style lang="scss">
@keyframes fadein {
    0%{
        transform: translateY(10%);
        opacity:0 ;
    }
    100%{
        transform: translateY(0%);
        opacity: 1;
    }
}
a{
    cursor: pointer;
}
a:hover{
    color:lighter(#3F5D45,20%);
}
.fa-star{
        width: 5% !important;
}
@media (min-width: 0px) and (max-width: 576px){
    .carouselExampleControls{
        height: 220px;
    }
    .products-star span{
        font-size: .8rem !important;
    }
    .fa-star{
        font-size: 10px !important;
        padding-left: 6px !important;
        padding-right: 6px !important;
    }
    .dorm_title{
        font-size: 1.5rem !important;
    }
    .hreat{
        display: none;
    }
}
@media (min-width: 576px) and (max-width: 768px){
    .products-star span,
    .products-price div{
        font-size: 95% !important;
    }
    .fa-star{
        font-size: 10px !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
    }
    .dorm_title{
        font-size: 98%;
    }
}
@media (min-width: 768px) and (max-width:992px){
    .products-star span,
    .products-price div{
        font-size: 95% !important;
    }
    .fa-star{
        font-size: 10px !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
    }
    .dorm_title{
        font-size: 98%;
    }
}
</style>