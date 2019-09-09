<template>
    <div class="d-flex flex-wrap col-md-3 col-12">
        <div class="col-12 pr-md-1 p-0 d-flex justify-content-center align-items-start">
            <form @submit.prevent="SendSearchMD" class="d-flex flex-md-column flex-md-nowrap flex-row flex-wrap w-100 bg-forth p-1 pl-0">
                
                <div class="form-group d-flex flex-column mb-1 col-md p-md-0 align-items-md-start col-12">
                    <p class="h3 text-primary font-weight-bolder">Hello ,</p>
                    <p class="h6 text-primary font-weight-bold">Search Your Hotel</p>
                    <div class="form-group w-100 mt-2">
                        <label for="exampleInputEmail1" class="text-primary">目的地</label>
                        <input v-model="search.HotelName" type="text" name="" id="" class="bg-thrid text-primary form-control SourceLight rounded-0 mt-md-0" placeholder="BR Villa 4000" required>
                    </div>
                    <div class="form-group w-100">
                        <label for="exampleInputEmail1" class="text-primary">入住 / 退房</label>
                        <VueHotelDatepicker 
                        id="VueHotelDatepicker"
                        class="w-100"
                        :maxDate="maxDate"
                        :mobile="'mobile'"
                        @confirm="UpdateDate"/>
                    </div>
                </div>

                <div class="form-group col-md p-md-0 m-md-0 col-12">
                    <label for="exampleInputEmail1" class="text-primary">房間數</label>
                    <input v-model="search.guestsnum" class="bg-thrid text-primary form-control rounded-0 SourceLight" type="number" name="guestsnum" id="" required>
                </div>
                
                <button type="submit" class="btn btn-outline-primary col-12 align-self-end mt-3 font-weight-bold ">送出</button>
            </form>
        </div>
    </div>
</template>
<script>
//moment
import moment from 'moment';
//Datepicker
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker'
export default {
    data() {
        return {
            search:{
                HotelName:'',
                check_in_date:'yyyy-MM-dd',
                check_out_date:'yyyy-MM-dd',
                guestsnum:1,
            },
        }
    },
    components:{
        VueHotelDatepicker
    },
    computed:{
        maxDate(){
            //console.log(moment().add(90,'days').format('YYYY/MM/DD'));
            return moment().add(90,'days').format('YYYY/MM/DD')
        }
    },
    methods:{
        SendSearchMD(){
            this.$emit('send-search',this.search);
        },
        UpdateDate(data){
            this.search.check_in_date = data.start;
            this.search.check_out_date = data.end;
        },
    }
}
</script>
<style lang="scss">
#VueHotelDatepicker{
    input{
        min-width: 100% !important;
        max-width: 100% !important;
        padding-top: 3px;
        padding-bottom: 3px;
        background-color:#D5D7F2;
        color:#2E688C;
    }
    .vhd-picker{
        min-height: auto;
    }
}
</style>
