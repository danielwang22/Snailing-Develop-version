<template>
    <div class="d-flex flex-row flex-wrap mr-sm-0 ml-sm-0 mr-n3 ml-n3">
        <div class="col-12 mt-3 h-50">
            <button class="btn btn-primary mb-1" @click="fillData(Tentchart.TentTotal,Mixchart.MixTotal,Signalchart.SignalTotal,Doublechart.DoubleTotal)">月份營業額</button>
            <button class="btn btn-primary mb-1" @click="fillData(Tentchart.TentQty,Mixchart.MixQty,Signalchart.SignalQty,Doublechart.DoubleQty)">月份訂房數</button>
            <button class="btn btn-primary mb-1" @click="fillData(Tentchart.TentHousingRategroup,Mixchart.MixHousingRategroup,Signalchart.SignalHousingRategroup,Doublechart.DoubleHousingRategroup)">月份住房率</button>
            <MonthTotalChart class="d-block d-sm-none" :chart-data="datacollection" :width="3" :height="3"></MonthTotalChart>
            <MonthTotalChart class="d-none d-sm-block" :chart-data="datacollection" :width="5" :height="2"></MonthTotalChart>
        </div>
        <div class="w-100 mt-4 border-bottom border-primary"></div>
        <div class="d-flex flex-wrap col-md-6 col-12 mt-3 p-1 h-50">

            <div class="col-12 h4 text-primary font-weight-bold mb-1">經典雙人床</div>

            <div class="dropdown text-primary col-md-3 col-12 mr-2">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份營業額
                </button>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-sm-left" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted1(1,item,eachproducts.doublebed)" v-for="(item,index) in products.doublebed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <div class="dropdown text-primary col-md-3 col-12">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份訂房數
                </button>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-sm-left" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted1(2,item,eachproducts.doublebed)" v-for="(item,index) in products.doublebed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <MonthTotalChart class="col-12" :chart-data="datacollection2" :width="5" :height="3"></MonthTotalChart>
        </div>
        <div class="d-flex flex-wrap col-md-6 col-12 mt-3 p-1 h-50">

            <div class="col-12 h4 text-primary font-weight-bold mb-1">悠閒單人床</div>

            <div class="dropdown text-primary col-md-3 col-12 mr-2">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份營業額
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted2(1,item,eachproducts.signalbed)" v-for="(item,index) in products.signalbed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <div class="dropdown text-primary col-md-3 col-12">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份訂房數
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted2(2,item,eachproducts.signalbed)" v-for="(item,index) in products.signalbed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <MonthTotalChart class="col-12" :chart-data="datacollection3" :width="5" :height="3"></MonthTotalChart>
        </div>
        <div class="d-flex flex-wrap col-md-6 col-12 mt-3 p-1 h-50">

            <div class="col-12 h4 text-primary font-weight-bold mb-1">歡樂混合床</div>

            <div class="dropdown text-primary col-md-3 col-12 mr-2">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份營業額
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted3(1,item,eachproducts.mixbed)" v-for="(item,index) in products.mixbed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <div class="dropdown text-primary col-md-3 col-12">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份訂房數
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted3(2,item,eachproducts.mixbed)" v-for="(item,index) in products.mixbed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <MonthTotalChart class="col-12" :chart-data="datacollection4" :width="5" :height="3"></MonthTotalChart>
        </div>
        <div class="d-flex flex-wrap col-md-6 col-12 mt-3 p-1 h-50">

            <div class="col-12 h4 text-primary font-weight-bold mb-1">野生搭帳</div>

            <div class="dropdown text-primary col-md-3 col-12 mr-2">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份營業額
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted4(1,item,eachproducts.tentbed)" v-for="(item,index) in products.tentbed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <div class="dropdown text-primary col-md-3 col-12">
                <button class="btn btn-primary dropdown-toggle mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    月份訂房數
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button @click="DataProducted4(2,item,eachproducts.tentbed)" v-for="(item,index) in products.tentbed" :key="index" class="dropdown-item">{{item}}</button>
                </div>
            </div>

            <MonthTotalChart class="col-12" :chart-data="datacollection5" :width="5" :height="3"></MonthTotalChart>
        </div>
    </div>
</template>

<script>
import MonthTotalChart from '@/components/chart/MonthTotalChart.js';
var moment = require('moment');

export default {
    components:{
        MonthTotalChart,
    },
    data() {
        return {
            charttype:{
                double:'1',
                signal:'1',
                mix:'1',
                tent:'1'
            },
            eachtotal:[],
            products:{
                doublebed:[],
                signalbed:[],
                mixbed:[],
                tentbed:[],
            },
            eachproducts:{
                doublebed:{},
                signalbed:{},
                mixbed:{},
                tentbed:{},
            },
            orders:[],
            double:{
                jan:[],
                feb:[],
                mar:[],
                apr:[],
                may:[],
                jun:[],
                jul:[],
                aug:[],
                sep:[],
                oct:[],
                nov:[],
                dec:[]
            },
            signal:{
                jan:[],
                feb:[],
                mar:[],
                apr:[],
                may:[],
                jun:[],
                jul:[],
                aug:[],
                sep:[],
                oct:[],
                nov:[],
                dec:[]
            },
            mix:{
                jan:[],
                feb:[],
                mar:[],
                apr:[],
                may:[],
                jun:[],
                jul:[],
                aug:[],
                sep:[],
                oct:[],
                nov:[],
                dec:[]
            },
            tent:{
                jan:[],
                feb:[],
                mar:[],
                apr:[],
                may:[],
                jun:[],
                jul:[],
                aug:[],
                sep:[],
                oct:[],
                nov:[],
                dec:[]
            },
            Doublechart:{
                DoubleTotal:[],
                DoubleQty:[],
            },
            Signalchart:{
                SignalTotal:[],
                SignalQty:[],
            },
            Mixchart:{
                MixTotal:[],
                MixQty:[],
            },
            Tentchart:{
                TentTotal:[],
                TentQty:[],
            },
            datacollection: { labels: [], datasets: [] },
            datacollection2: { labels: [], datasets: [] },
            datacollection3: { labels: [], datasets: [] },
            datacollection4: { labels: [], datasets: [] },
            datacollection5: { labels: [], datasets: [] },
        }
    },
    mounted() {
        this.fillData();
    },
    methods: {
        DataProducted4(type,title,data){
            var vm = this;
            Object.keys(data).map(function (Objectkey,value) {
                if(Objectkey == title && type == 1){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#007bff',
                                pointBackgroundColor: '#007bff',
                                borderWidth: 2,
                                data:  data[Objectkey].Total,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection5 = result;
                }else if(Objectkey == title && type == 2){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#007bff',
                                pointBackgroundColor: '#007bff',
                                borderWidth: 2,
                                data:  data[Objectkey].Qty,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection5 = result;
                }else{
                    // console.log('double錯誤');
                }
            });
        },
        DataProducted3(type,title,data){
            var vm = this;
            Object.keys(data).map(function (Objectkey,value) {
                if(Objectkey == title && type == 1){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#6f42c1',
                                pointBackgroundColor: '#6f42c1',
                                borderWidth: 2,
                                data:  data[Objectkey].Total,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection4 = result;
                }else if(Objectkey == title && type == 2){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#6f42c1',
                                pointBackgroundColor: '#6f42c1',
                                borderWidth: 2,
                                data:  data[Objectkey].Qty,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection4 = result;
                }else{

                }
            });
        },
        DataProducted2(type,title,data){
            var vm = this;
            Object.keys(data).map(function (Objectkey,value) {
                if(Objectkey == title && type == 1){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#FFE180',
                                pointBackgroundColor: '#FFE180',
                                borderWidth: 2,
                                data:  data[Objectkey].Total,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection3 = result;
                }else if(Objectkey == title && type == 2){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#FFE180',
                                pointBackgroundColor: '#FFE180',
                                borderWidth: 2,
                                data:  data[Objectkey].Qty,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection3 = result;
                }else{

                }
            });
        },
        DataProducted1(type,title,data){
            var vm = this;
            Object.keys(data).map(function (Objectkey,value) {
                if(Objectkey == title && type == 1){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#3F5D45',
                                pointBackgroundColor: '#3F5D45',
                                borderWidth: 2,
                                data:  data[Objectkey].Total,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection2 = result;
                }else if(Objectkey == title && type == 2){
                    let result = {
                        labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        datasets: [
                            {
                                label: title,
                                backgroundColor: 'transparent',
                                borderColor: '#3F5D45',
                                pointBackgroundColor: '#3F5D45',
                                borderWidth: 2,
                                data:  data[Objectkey].Qty,
                            },
                        ],
                        options:{responsive: true, maintainAspectRatio: true}
                    };

                    vm.datacollection2 = result;
                }else{

                }
            });
        },
        fillData(tentarg,mixarg,signalarg,doublearg) {
            let result = {
                labels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                datasets: [
                    {
                        label: '野生搭帳',
                        backgroundColor: 'transparent',
                        borderColor: '#007bff',
                        pointBackgroundColor: '#007bff',
                        borderWidth: 2,
                        data:  tentarg,
                    },
                    {
                        label: '歡樂混合房',
                        backgroundColor: 'transparent',
                        borderColor: '#6f42c1',
                        pointBackgroundColor: '#6f42c1',
                        borderWidth: 2,
                        data:  mixarg
                    },
                    {
                        label: '悠閒單人房',
                        backgroundColor: 'transparent',
                        borderColor: '#FFE180',
                        pointBackgroundColor: '#FFE180',
                        borderWidth: 2,
                        data:  signalarg
                    },
                    {
                        label: '經典雙人房',
                        backgroundColor: 'transparent',
                        borderColor: '#3F5D45',
                        pointBackgroundColor: '#3F5D45',
                        borderWidth: 2,
                        data:  doublearg
                    }
                ],
                options:{responsive: true, maintainAspectRatio: true}
            };
            
            // console.log(result);
            this.datacollection = result;
        },
        getProducts(){
            var vm = this;
            for(let i = 1 ;i<4;i++){
                let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${i}`;
                this.$http.get(url).then((response) =>{
                    // console.log(response.data.products);
                    response.data.products.forEach(function(item) {
                        // vm.products.push(item.title);
                        if(item.category == '經典雙人房'){
                            vm.products.doublebed.push(item.title);
                            vm.$set(vm.eachproducts.doublebed,`${item.title}`,{Total:[0,0,0,0,0,0,0,0,0,0,0,0],Qty:[0,0,0,0,0,0,0,0,0,0,0,0]});
                        }else if(item.category == '悠閒單人房'){
                            vm.products.signalbed.push(item.title);
                            vm.$set(vm.eachproducts.signalbed,`${item.title}`,{Total:[0,0,0,0,0,0,0,0,0,0,0,0],Qty:[0,0,0,0,0,0,0,0,0,0,0,0]});
                        }else if(item.category == '歡樂混合房'){
                            vm.products.mixbed.push(item.title);
                            vm.$set(vm.eachproducts.mixbed,`${item.title}`,{Total:[0,0,0,0,0,0,0,0,0,0,0,0],Qty:[0,0,0,0,0,0,0,0,0,0,0,0]});
                        }else{
                            vm.products.tentbed.push(item.title);
                            vm.$set(vm.eachproducts.tentbed,`${item.title}`,{Total:[0,0,0,0,0,0,0,0,0,0,0,0],Qty:[0,0,0,0,0,0,0,0,0,0,0,0]});
                        }
                    });
                });
            }
        },
        getOrders(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders`;
            // vm.isLoading = true;
            this.$http.get(url).then((response) =>{
                vm.orders = response.data.orders;
                // console.log(response.data.orders);
                for(let i = 0;i<response.data.orders.length;i++){
                    var newTotal = 0;
                    Object.keys(response.data.orders[i].products).map(function(objectKey, index) {
                        var value = response.data.orders[i].products[objectKey];
                        // console.log('底家',value.finalTotal);
                        newTotal += (value.finalTotal + 100);
                    });
                    // console.log('--------');
                    // console.log(newTotal);
                    // console.log('---------------------');
                    vm.$set(vm.orders[i],'Finalprice',newTotal);
                }
                vm.OrderClassification(vm.orders);
            });
        },
        OrderClassification(orders){
            var vm = this;
            for(let i = 0;i<orders.length;i++){
                Object.keys(orders[i].products).map(function(objectKey, index){
                    let PreProduct = orders[i].products[objectKey];
                    // console.log('青菜抵',PreProduct);
                    if(PreProduct.product.category == '經典雙人房'){
                        // console.log(PreProduct.checkInDate);
                        let DateExp = moment(PreProduct.checkInDate, "YYYY-MM-DD").format('MM');
                        //console.log(DateExp);
                        switch(DateExp) {
                            case '01':
                                vm.double.jan.push(PreProduct);
                                break;
                            case '02':
                                vm.double.feb.push(PreProduct);
                                break;
                            case '03':
                                vm.double.mar.push(PreProduct);
                                break;
                            case '04':
                                vm.double.apr.push(PreProduct);
                                break;
                            case '05':
                                vm.double.may.push(PreProduct);
                                break;
                            case '06':
                                vm.double.jun.push(PreProduct);
                                break;
                            case '07':
                                vm.double.jul.push(PreProduct);
                                break;
                            case '08':
                                vm.double.aug.push(PreProduct);
                                break;
                            case '09':
                                vm.double.sep.push(PreProduct);
                                break;
                            case '10':
                                vm.double.oct.push(PreProduct);
                                break;
                            case '11':
                                vm.double.nov.push(PreProduct);
                                break;
                            default:
                                vm.double.dec.push(PreProduct);
                                break;
                        } 
                        // vm.double.push(PreProduct);
                    }else if(PreProduct.product.category == '悠閒單人房'){
                        let DateExp2 = moment(PreProduct.checkInDate, "YYYY-MM-DD").format('MM');
                        //console.log(DateExp2);
                        switch(DateExp2) {
                            case '01':
                                vm.signal.jan.push(PreProduct);
                                break;
                            case '02':
                                vm.signal.feb.push(PreProduct);
                                break;
                            case '03':
                                vm.signal.mar.push(PreProduct);
                                break;
                            case '04':
                                vm.signal.apr.push(PreProduct);
                                break;
                            case '05':
                                vm.signal.may.push(PreProduct);
                                break;
                            case '06':
                                vm.signal.jun.push(PreProduct);
                                break;
                            case '07':
                                vm.signal.jul.push(PreProduct);
                                break;
                            case '08':
                                vm.signal.aug.push(PreProduct);
                                break;
                            case '09':
                                vm.signal.sep.push(PreProduct);
                                break;
                            case '10':
                                vm.signal.oct.push(PreProduct);
                                break;
                            case '11':
                                vm.signal.nov.push(PreProduct);
                                break;
                            default:
                                vm.signal.dec.push(PreProduct);
                                break;
                        } 
                        // vm.singal.push(PreProduct);
                    }else if(PreProduct.product.category == '歡樂混合房'){
                        let DateExp3 = moment(PreProduct.checkInDate, "YYYY-MM-DD").format('MM');
                        //console.log(DateExp3);
                        switch(DateExp3) {
                            case '01':
                                vm.mix.jan.push(PreProduct);
                                break;
                            case '02':
                                vm.mix.feb.push(PreProduct);
                                break;
                            case '03':
                                vm.mix.mar.push(PreProduct);
                                break;
                            case '04':
                                vm.mix.apr.push(PreProduct);
                                break;
                            case '05':
                                vm.mix.may.push(PreProduct);
                                break;
                            case '06':
                                vm.mix.jun.push(PreProduct);
                                break;
                            case '07':
                                vm.mix.jul.push(PreProduct);
                                break;
                            case '08':
                                vm.mix.aug.push(PreProduct);
                                break;
                            case '09':
                                vm.mix.sep.push(PreProduct);
                                break;
                            case '10':
                                vm.mix.oct.push(PreProduct);
                                break;
                            case '11':
                                vm.mix.nov.push(PreProduct);
                                break;
                            default:
                                vm.mix.dec.push(PreProduct);
                                break;
                        } 
                        // vm.mix.push(PreProduct);
                    }else{
                        let DateExp4 = moment(PreProduct.checkInDate, "YYYY-MM-DD").format('MM');
                        //console.log(DateExp4);
                        switch(DateExp4) {
                            case '01':
                                vm.tent.jan.push(PreProduct);
                                break;
                            case '02':
                                vm.tent.feb.push(PreProduct);
                                break;
                            case '03':
                                vm.tent.mar.push(PreProduct);
                                break;
                            case '04':
                                vm.tent.apr.push(PreProduct);
                                break;
                            case '05':
                                vm.tent.may.push(PreProduct);
                                break;
                            case '06':
                                vm.tent.jun.push(PreProduct);
                                break;
                            case '07':
                                vm.tent.jul.push(PreProduct);
                                break;
                            case '08':
                                vm.tent.aug.push(PreProduct);
                                break;
                            case '09':
                                vm.tent.sep.push(PreProduct);
                                break;
                            case '10':
                                vm.tent.oct.push(PreProduct);
                                break;
                            case '11':
                                vm.tent.nov.push(PreProduct);
                                break;
                            default:
                                vm.tent.dec.push(PreProduct);
                                break;
                        } 
                        // vm.tent.push(PreProduct);
                    }
                });
            }
            vm.Mainchart(vm.double,vm.Doublechart,'Double');
            vm.Mainchart(vm.signal,vm.Signalchart,'Signal');
            vm.Mainchart(vm.mix,vm.Mixchart,'Mix');
            vm.Mainchart(vm.tent,vm.Tentchart,'Tent');
            vm.onedormchart(vm.double,vm.products.doublebed,vm.eachproducts.doublebed);
            vm.onedormchart(vm.signal,vm.products.signalbed,vm.eachproducts.signalbed);
            vm.onedormchart(vm.mix,vm.products.mixbed,vm.eachproducts.mixbed);
            vm.onedormchart(vm.tent,vm.products.tentbed,vm.eachproducts.tentbed);
        },
        Mainchart(Data,ChartData,type){
            let Datatotal = [];
            let Dataqty = [];
            let HousingRategroup = [];
            Object.keys(Data).map(function(objectKey, index){
                // console.log(Data[objectKey]);
                let totalsum = 0;
                let qtysum = 0;
                let Dormtotal = 0;

                let HousingRate = 0;

                let MonthNum = index + 1;
                let CurrdaysInMonth = moment(`2019-${MonthNum}`, "YYYY-MM").daysInMonth();
                for(let i = 0 ; i<Data[objectKey].length;i++){
                    totalsum += Data[objectKey][i].finalTotal;
                    qtysum += Data[objectKey][i].qty;
                    Dormtotal += Data[objectKey][i].product.num;
                }

                HousingRate = ((qtysum / (Dormtotal * CurrdaysInMonth)) * 100).toFixed(2);


                Datatotal.push(totalsum);
                Dataqty.push(qtysum);
                HousingRategroup.push(HousingRate);
            });
            //console.log(Datatotal);
            //console.log(Dataqty);
            //console.log(HousingRategroup);
            this.$set(ChartData,`${type}Total`,Datatotal);
            this.$set(ChartData,`${type}Qty`,Dataqty);
            this.$set(ChartData,`${type}HousingRategroup`,HousingRategroup);
        },
        matchTotalTitle(title,object,beds,eachbed,finalTotalSum){
            var vm = this;
            beds.forEach(function(value){
                if(value == title){
                    let DateExp = Number(moment(object.checkInDate, "YYYY-MM-DD").format('M')) - 1;
                    Object.keys(eachbed).map(function(objectKey, index){
                        if(objectKey == title){
                            if(eachbed[objectKey].Total[DateExp] != 0){
                                if(objectKey == title){
                                    finalTotalSum.push(object.finalTotal);
                                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                                    let FinalTotalSum = finalTotalSum.reduce(reducer);
                                    // console.log(FinalTotalSum);
                                    vm.$set(eachbed[objectKey].Total,DateExp,(FinalTotalSum+object.finalTotal));
                                }
                            }else{
                                vm.$set(eachbed[objectKey].Total,DateExp,object.finalTotal);
                            }
                        }
                    });
                    // console.log(title,' ',DateExp,' ',object.finalTotal);
                    // eachtotal[(Number(DateExp)-1)] = object.finalTotal;
                }
            });
        },
        matchQtyTitle(title,object,beds,eachbed,finalQtySum){
            var vm = this;
            beds.forEach(function(value){
                if(value == title){
                    let DateExp = Number(moment(object.checkInDate, "YYYY-MM-DD").format('M')) - 1;
                    Object.keys(eachbed).map(function(objectKey, index){
                        if(objectKey == title){
                            if(eachbed[objectKey].Qty[DateExp] != 0){
                                if(objectKey == title){
                                    finalQtySum.push(object.qty);
                                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                                    let FinalQtySum = finalQtySum.reduce(reducer);
                                    // console.log(FinalQtySum);
                                    vm.$set(eachbed[objectKey].Qty,DateExp,(FinalQtySum+object.qty));
                                }
                            }else{
                                vm.$set(eachbed[objectKey].Qty,DateExp,object.qty);
                            }
                        }
                    });
                    // console.log(title,' ',DateExp,' ',object.finalTotal);
                    // eachtotal[(Number(DateExp)-1)] = object.finalTotal;
                }
            });
        },
        onedormchart(dorm,beds,eachbed){
            var vm = this;
            Object.keys(dorm).map(function(objectKey, index){
                var finalTotalSum = [];
                var finalQtySum = [];
                for(let i = 0 ; i<dorm[objectKey].length;i++){
                    vm.matchTotalTitle(dorm[objectKey][i].product.title,dorm[objectKey][i],beds,eachbed,finalTotalSum);
                    vm.matchQtyTitle(dorm[objectKey][i].product.title,dorm[objectKey][i],beds,eachbed,finalQtySum);
                }
                // console.log("-------------------------kk");
            });
            // console.log(eachtotal);
        },
    },
    created() {
        this.getProducts();
        this.getOrders();
    },
}
</script>

<style lang="scss">
.small {
    max-width: 600px;
    margin: 150px auto;
}
</style>

