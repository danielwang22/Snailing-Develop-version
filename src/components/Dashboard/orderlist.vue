<template>
    <div>
        <table class="table mt-1 col-12">
            <thead>
                <tr>
                    <th style="width:5%" @click="isreverseTime = !isreverseTime , dataTimeSort">
                        訂購時間
                        <template v-if="isreverseTime === false">
                            <span>
                            <i class=" fas fa-angle-up text-success"></i>
                            </span>
                        </template>
                        <template v-else-if="isreverseTime === true">
                            <span>
                            <i class="fas fa-angle-down text-success"></i>
                            </span>
                        </template>
                    </th>
                    <th class="text-left" style="width:30%">選購房型</th>
                    <th class="text-left" style="width:25%">訂單資料</th>
                    <th class="text-center" style="width:15%" @click="isreversePrice = !isreversePrice , dataPriceSort">
                        應付金額
                        <template v-if="isreversePrice === false">
                            <span>
                            <i class=" fas fa-angle-up text-success"></i>
                            </span>
                        </template>
                        <template v-else-if="isreversePrice === true">
                            <span>
                            <i class="fas fa-angle-down text-success"></i>
                            </span>
                        </template>
                    </th>
                    <th style="width:15%">是否付款</th>
                </tr>
            </thead>
            <tbody class="SourceLight">
                <tr v-for="(item) in orders" :key="item.id">
                    <td>
                        {{ConvertTime(item.create_at)}}
                    </td>
                    <td>
                        <div class="border-bottom pb-1 " v-for="item2 in item.products" :key="item2.id">
                            <span class="font-weight-bold text-primary">{{item2.product.title}}</span><br>
                            <span class="text-forth">入住 {{item2.checkInDate}} / 退房 {{item2.checkOutDate}}</span>
                        </div>
                    </td>
                    <td>
                        <label class="font-weight-bold text-primary">訂房人:</label>
                        <p class="text-forth">{{item.user.name}}</p>
                        <label class="font-weight-bold text-primary">連絡電話:</label>
                        <p class="text-forth">{{item.user.tel}}</p>
                        <label class="font-weight-bold text-primary">連絡email:</label>
                        <p class="text-forth">{{item.user.email}}</p>
                    </td>
                    <td class="text-right">
                        {{item.Finalprice | currency}}
                    </td>
                    <td class="text-left">
                        <span class="text-success" v-if="item.is_paid">已付款</span>
                        <span class="text-secondary" v-else>尚未付款</span>
                    </td>
                </tr>
            </tbody>
        </table>



        <!-- pagination -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getOrderList(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}"><a class="page-link" href="#" @click.prevent="getOrderList(page)">{{page}}</a></li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getOrderList(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>



    </div>
</template>

<script>
export default {
    data(){
        return{
            orders:{},
            pagination:{},
            isLoading:false,
            status:{
                fileUploading:false,
            },
            isreversePrice:false,
            isreverseTime:false,
        };
    },
    computed:{
        dataTimeSort(){
            const vm = this;
            if(vm.isreverseTime == true){
                vm.orders = vm.orders.sort(function(a,b){
                return (a.create_at === b.create_at ? 0 : a.create_at > b.create_at ? 1 : -1);
                });
            }else{
                vm.orders = vm.orders.sort(function(a,b){
                return (a.create_at === b.create_at ? 0 : a.create_at < b.create_at ? 1 : -1);
                });
            }
        },
        dataPriceSort(){
            const vm = this;
            if(vm.isreversePrice == true){
                vm.orders = vm.orders.sort(function(a,b){
                return (a.Finalprice === b.Finalprice ? 0 : a.Finalprice > b.Finalprice ? 1 : -1);
                });
            }else{
                vm.orders = vm.orders.sort(function(a,b){
                return (a.Finalprice === b.Finalprice ? 0 : a.Finalprice < b.Finalprice ? 1 : -1);
                });
            }
        },
    },
    methods:{
        getOrderList(page = 1){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            this.$http.get(url).then((response) =>{
                console.log('取得訂單',response.data.orders);
                vm.orders = response.data.orders;
                vm.pagination = response.data.pagination;
                for(let i = 0;i<response.data.orders.length;i++){
                    var newTotal = 0;
                    Object.keys(response.data.orders[i].products).map(function(objectKey, index) {
                        var value = response.data.orders[i].products[objectKey];
                        console.log('底家',value.finalTotal);
                        newTotal += (value.finalTotal + 100);
                    });
                    console.log('--------');
                    console.log(newTotal);
                    console.log('---------------------');
                    vm.$set(vm.orders[i],'Finalprice',newTotal);
                }
            });
        },
        ConvertTime(time){
            var timestamp = time;
            var d = new Date(timestamp*1000);
            return (d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2) + " ");
        },
    },
    created(){
        this.getOrderList();
    },
}
</script>
<style lang="scss">
.table{
    overflow: hidden;
}
</style>

