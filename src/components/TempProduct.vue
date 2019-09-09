<template>
    <div class="col-12 mb-2">
        
        <div id="topimage" class="col-12 mt-xl-5 mt-5 p-0 d-flex align-items-center overflow-hidden border shadow">
            <div class="Topimage-item img-fluid d-md-block col-md-8 col-12 h-100 p-0 border" :style="{backgroundImage:`url(${product.imageUrl})`}" style="background-position: center;background-size: 100% 100%;"></div>
            <div class="d-block d-md-flex flex-md-column col-md-4 d-none  h-100 p-0">
                <div class="Topimage-item d-block w-100 col border" :style="{backgroundImage:`url(${product.imageUrl1})`}" style="background-position: center;background-size: 100% 100%;"></div>
                <div class="Topimage-item d-block w-100 col border" :style="{backgroundImage:`url(${product.imageUrl2})`}" style="background-position: center;background-size: 100% 100%;"></div>
            </div>
        </div>

        <div class="d-flex flex-row flex-wrap">
            <div class="d-flex flex-column col-lg-8 col-md-7 col-sm-12 col-12 mt-5 pl-0 pr-0">
                <div class="w-100">
                    <i v-for="num in 5" :key="num" class="fas fa-star text-secondary" style="width:5%;"></i>
                    <span class="SourceLight">120</span>
                    <button class="btn border-0 p-0 like-btn float-right" style="z-index:999;" @click="like"><i class="far fa-thumbs-up text-primary h3" :class="{'text-danger' : product.is_like}"></i></button>
                </div>
                <div class="w-100 h4 mt-1 text-primary">{{product.title}}</div>
                <div class="w-50 badge badge-forth mt-1">{{product.content}}</div>
                <div class="w-100"></div>
                <div class="mt-3 h6 SourceLight">
                    {{product.description}}
                </div>
                <a href="#" class="d-flex justify-content-md-start justify-content-center w-100 mt-3 overflow-hidden" @click.prevent="ModalOpen">
                <img v-if="dataLoaded == true" class="h-100" :src='`https://maps.googleapis.com/maps/api/staticmap?center=${product.address.latitude},${product.address.longitude}&zoom=14&scale=false&size=600x232&maptype=roadmap&key=AIzaSyADk9qoHZXOLw9nAQcwGjvnyANwCVlyQpM&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x2e688c%7Clabel:P%7C${product.address.latitude},${product.address.longitude}`' :alt="`Google Map of ${product.address.country}${product.address.route}`">
                </a>
            </div>

            <div class="mt-xl-5 col-lg-4 col-md-5 col-sm-12 col-12 mt-5 d-flex justify-content-center align-items-center p-0">
                <form @submit.prevent="addtocart(product.id,(num + DateCompute),totalPrice)" class="d-flex flex-md-column flex-md-nowrap flex-row flex-wrap w-100 bg-thrid mt-2 p-1">
                    
                    <div class="form-group d-flex mt-2 mb-1 col-md p-md-0 align-items-md-start col-12 align-items-end">
                        <div class="form-group w-100 mb-0">
                            <label for="exampleInputEmail1" class="text-primary w-100">入住</label>
                            <VueHotelDatepicker 
                            id="VueHotelDatepicker" 
                            class="w-100"
                            :startDate="search.check_in_date"
                            :endDate="search.check_out_date"
                            :maxDate="maxDate"
                            :disabledDates="disableDays"
                            @confirm="UpdateDate"
                            :mobile="'mobile'" />
                        </div>
                    </div>

                    <div class="form-group mb-1 col-md p-md-0 m-md-0 col-12 mt-3">
                        <label for="exampleInputEmail1" class="text-primary">客人數</label>
                        <select class="text-primary form-control rounded-0 SourceLight" id="exampleFormControlSelect1" v-model="search.guestsnum">
                            <option value="0" class="text-primary" selected disabled>請選擇</option>
                            <option v-for="num in 20" :key="num" :value="num" class="text-primary">{{num}}間</option>
                        </select>
                    </div>
                    
                    <div class="form-group mt-1 col-md p-md-0 SourceLight">
                        <h6 class="form-items-txt p-0 text-right text-primary float-left">{{product.origin_price}} x {{ DateCompute }} 晚 x {{search.guestsnum}} 間</h6>
                        <h6 class="form-items-txt p-0 text-right text-primary float-right">$ {{product.origin_price * search.guestsnum * DateCompute}} TWD </h6>
                    </div>

                    <div class="form-group col-md p-md-0 SourceLight">
                        <h6 class="form-items-txt p-0 text-right text-primary float-left">清潔費 10%</h6>
                        <h6 class="form-items-txt p-0 text-right text-primary float-right">$ {{ Math.floor(product.origin_price * 0.1) }} TWD </h6>
                    </div>
                    
                    <div class="form-group mt-1 border-top pt-2 col-md pl-md-0 pr-md-0">
                        <h4 class="p-0 text-right text-primary font-weight-bold float-left">總價</h4>
                        <h4 class="p-0 text-right text-primary font-weight-bold float-right">$ {{ totalPrice }} TWD </h4>
                    </div>
                    
                    <button type="submit" class="btn btn-outline-primary col-md w-50 col-12 font-weight-bold align-self-end">送出</button>
                </form>
            </div>
        </div>

        <div v-if="dataLoaded == true" id="productModal" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog h-100" role="document">
                <div class="modal-header">
                    <h5 class="modal-title text-light">{{product.address.country}}{{product.address.administrative_area_level_1}}{{product.address.route}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="text-light" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-body">
                        <GoogleMap :position="position" />
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>


<script>
import moment from 'moment';
import { extendMoment } from 'moment-range';

import $ from'jquery';
import GoogleMap from '@/components/GoogleMap';
//Datepicker
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker'
export default {
    data() {
        return {
            Productid: '',
            product:{},
            isActive:true,
            position:{},
            dataLoaded:false,
            search:{
                HotelName:'',
                check_in_date:moment().format('YYYY/MM/DD'),
                check_out_date:moment().add(1, 'days').format('YYYY/MM/DD'),
                guestsnum:1,
            },
            EveryDormStayDays:[],
            disableDays:[]
        };
    },
    components:{
        GoogleMap,
        VueHotelDatepicker
    },
    computed:{
        totalPrice(){
            return Math.floor((this.product.origin_price * this.search.guestsnum * this.DateCompute) + (this.product.origin_price * 0.1));
        },
        DateCompute(){
            var startTime = this.search.check_in_date;
            var endTime = this.search.check_out_date;
            var day = moment.duration(moment(endTime, 'YYYY/MM/DD').diff(moment(startTime, 'YYYY/MM/DD'))).asDays();
            if(day <= 0 || isNaN(day)){
                day = 1;
                return day;
            }
            //console.log(day);
            return day;
        },
        maxDate(){
            //console.log(moment().add(90,'days').format('YYYY/MM/DD'));
            return moment().add(90,'days').format('YYYY/MM/DD')
        }
    },
    methods:{
        getProduct(id){
            //console.log(id);
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            this.$http.get(url).then((response) =>{
                //console.log(response.data.product);
                vm.product = response.data.product;
                if(response.data.product.hasOwnProperty('address')){
                    this.dataLoaded = true;
                    vm.$set(vm.position,'latitude',response.data.product.address.latitude);
                    vm.$set(vm.position,'longitude',response.data.product.address.longitude);
                }else{
                    this.dataLoaded = false;
                    vm.$set(vm.position,'latitude',121.30);
                    vm.$set(vm.position,'longitude',25.02);
                }
            });
        },
        addtocart(id,qty=1,totalPrice=0){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const cart = {
                product_id:id,
                qty,
                finalTotal:totalPrice,
                checkInDate:this.search.check_in_date,
                checkOutDate:this.search.check_out_date
            };
            this.$http.post(url,{data:cart}).then((response) =>{
                //console.log(response.data);
                vm.getProduct(this.Productid);    
            });
        },
        getOrders(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders`;
            this.$http.get(url).then((response) =>{
                this.CheckInDate(response.data.orders);
            });
        },
        CheckInDate(data){
            let AllDorm = [];
            let checkTheSameName = [];
            const Moment = extendMoment(moment);
            data.forEach(element => {
                Object.keys(element.products).forEach((items) =>{
                    AllDorm.push({
                        ProductTitles:element.products[items]['product']['title'],
                        id:element.products[items]['product']['id'],
                        checkInDate:element.products[items]['checkInDate'],
                        checkOutDate:element.products[items]['checkOutDate']
                    });
                })
            });
            AllDorm.forEach((element,index)=>{
                let res = AllDorm.filter((sameNameElement,sameNameIndex)=>{
                    return (element.ProductTitles === sameNameElement.ProductTitles);
                });
                if(checkTheSameName.includes(res[0].ProductTitles)) return;
                checkTheSameName.push(res[0].ProductTitles);
                let DisableDays = [];
                let day = '';
                //console.log(res)
                //console.log('>>>>>>>>>>>>>>>')
                res.forEach(element=>{
                    //console.log(element.ProductTitles,'=>')
                    const start = moment(element.checkInDate, 'YYYY-MM-DD');
                    const end   = moment(element.checkOutDate, 'YYYY-MM-DD');
                    const range = Moment.range(start, end);
                    let dateArray = Array.from(range.by('days'));
                    dateArray.forEach(element=>{
                        //console.log(moment(element).format('YYYY-MM-DD'));
                        day = moment(element).format('YYYY-MM-DD');
                        if(DisableDays.includes(day)) return;
                        DisableDays.push(day)
                    })
                    //console.log('-------------------')
                })
                //console.log(DisableDays);
                this.EveryDormStayDays.push({
                    ProductTitles:res[0].ProductTitles,
                    id:res[0].id,
                    DisableDays
                })
            });
            console.log(this.EveryDormStayDays,'so?')
            this.setDisableDate(this.EveryDormStayDays);
        },
        setDisableDate(days){
            days.forEach(element=>{
                if(this.product.id === element.id){
                    console.log('這個產品對')
                    this.disableDays = element.DisableDays;
                }
            })
        },
        UpdateDate(data){
            this.search.check_in_date = data.start;
            this.search.check_out_date = data.end;
        },
        like(){
            this.product.is_like = !this.product.is_like;
        },
        ModalOpen(){
            $('#productModal').modal('show');
        }
    },
    mounted() {
        this.getOrders();
        this.$bus.$on("SearchSend",data=>{
            if(data != undefined){
                this.search = data;
            }
            else{
            }
        });
    },
    created(){
        this.Productid = this.$route.params.id;
        this.getProduct(this.Productid);
    },
}
</script>

<style lang="scss">
$topimage-height: 400px;


#map{
    width: 100%;
    height: 400px;
}
#topimage{
    height: $topimage-height;
    z-index: -1;
}
.like-btn:focus{
    box-shadow: none;
    -webkit-box-shadow:none;
}
#VueHotelDatepicker{
    input{
        min-width: 100% !important;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .vhd-picker{
        min-height: auto;
    }
}
@media (min-width: 0px) and (max-width: 576px){
    #exampleFormControlSelect1 option{
        font-size: 80% !important;
    }
    #topimage{
    height: $topimage-height * 0.7;
    z-index: -1;
    }
    input[type=date]{
        font-size: 12px;
    }
    .form-items-txt{
        font-size: 95%;
    }
    .form-items-txt-big{
        font-size: 98%;
    }
}
@media (min-width: 576px) and (max-width: 992px){
    #topimage{
    height: $topimage-height * 0.9;
    z-index: -1;
    }
    input[type=date]{
        font-size: 12px;
    }
    .form-items-txt{
        font-size: 95%;
    }
    .form-items-txt-big{
        font-size: 98%;
    }
}
</style>
