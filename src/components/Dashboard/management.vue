<template>
    <div class="d-flex flex-column mt-3">
        <select class="form-control border-0 text-primary SourceBold w-50" name="TypeSelector" v-model="ChangeView">
            <option class="text-primary SourceBold" value="DoubleCalendar" selected>經典雙人房</option>
            <option class="text-primary SourceBold" value="SignalCalendar">悠閒單人房</option>
            <option class="text-primary SourceBold" value="MixCalendar">歡樂混合房</option>
            <option class="text-primary SourceBold" value="TentCalendar">野生搭帳</option>
        </select>
        <keep-alive>
            <component :rooms="Selectproducts" :is="ChangeView"></component>
        </keep-alive>
    </div>
</template>
<script>
import DoubleCalendar from '@/components/Dashboard/Calendar/DoubleCalendar';
import SignalCalendar from '@/components/Dashboard/Calendar/SignalCalendar';
import MixCalendar from '@/components/Dashboard/Calendar/MixCalendar';
import TentCalendar from '@/components/Dashboard/Calendar/TentCalendar';

export default {
    data() {
        return {
            products:{
                DoubleDorm:[],
                SingalDorm:[],
                MixDorm:[],
                TentDorm:[],
            },
            Selectproducts:[],
            view:'DoubleCalendar'
        }
    },
    components:{
        DoubleCalendar,
        SignalCalendar,
        MixCalendar,
        TentCalendar
    },
    computed:{
        ChangeView:{
            get(){
                return this.view
            },
            set(val){
                this.view = val;
                this.ChangeProducts(val);
            }
        },
    },
    methods:{
        getproducts(){
            [1,2,3].forEach(pages=>{
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${pages}`;
                const vm = this;
                this.$http.get(api).then((response) => {
                    response.data.products.forEach(Element=>{
                        const dormType = Element.category;
                        switch(dormType){
                        case '經典雙人房':
                            vm.products.DoubleDorm.push(Element);
                            vm.Selectproducts = vm.products.DoubleDorm;
                            break;
                        case '悠閒單人房':
                            vm.products.SingalDorm.push(Element);
                            break;
                        case '歡樂混合房':
                            vm.products.MixDorm.push(Element);
                            break;
                        case '野生搭帳':
                            vm.products.TentDorm.push(Element);
                            break;
                        }
                    })
                });
            })
        },
        ChangeProducts(val){
            switch (val) {
                case 'DoubleCalendar':
                    this.Selectproducts = this.products.DoubleDorm;
                    break;
                case 'SignalCalendar':
                    this.Selectproducts = this.products.SingalDorm;
                    break;
                case 'MixCalendar':
                    this.Selectproducts = this.products.MixDorm;
                    break;
                case 'TentCalendar':
                    this.Selectproducts = this.products.TentDorm;
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        this.getproducts();
    },
}
</script>
<style lang="scss" scoped>

</style>
