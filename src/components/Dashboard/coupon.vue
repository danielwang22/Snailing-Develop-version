<template>
    <div>

        <loading :active.sync="isLoading"></loading>



        <div class="text-right">
            <button class="btn btn-outline-info btn-sm mt-4" @click="openModal(true)">建立新的優惠券</button>    
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th style="width:25%">名稱</th>
                    <th style="width:10%">折扣百分比</th>
                    <th class="text-center" style="width:20%">到期日</th>
                    <th class="text-center" style="width:10%">是否啟用</th>
                    <th style="width:10%">編輯</th>
                </tr>
            </thead>
            <tbody class="SourceLight">
                <tr v-for="(item) in coupons" :key="item.id">
                    <td>{{item.title}}</td>
                    <td>{{item.percent}} %</td>
                    <td class="text-center">{{item.due_date}}</td>
                    <td class="text-center">
                        <span v-if="item.is_enable" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td class="">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- pagination -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getCoupon(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}"><a class="page-link" href="#" @click.prevent="getCoupon(page)">{{page}}</a></li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getCoupon(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>


        <!-- modal -->
        <div class="modal fade" id="CouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>優惠券</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control SourceLight" id="title" placeholder="請輸入標題" v-model="tempCoupon.title">
                        </div>
                        <div class="form-group">
                            <label for="code">優惠碼</label>
                            <input type="text" class="form-control SourceLight" id="code" placeholder="code" v-model="tempCoupon.code">
                        </div>
                        <div class="form-group">
                            <label for="date">到期日</label>
                            <input type="date" class="form-control SourceLight" id="date" v-model="tempCoupon.due_date">
                        </div>
                        <div class="form-group">
                            <label for="discount">折扣百分比</label>
                            <input type="text" class="form-control SourceLight" id="discount" placeholder="80" v-model="tempCoupon.percent">
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupon.is_enable" :true-value="1" :false-value="0">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button v-if="isNew" type="button" class="btn btn-info" @click="updataCoupon">新增優惠券</button>
                    <button v-else type="button" class="btn btn-info" @click="updataCoupon">修改優惠券</button>
                </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
import $ from'jquery';

export default {
    data(){
        return{
            isLoading:false,
            coupons:[],
            tempCoupon:{},
            pagination:{},
            isNew:false,
            status:{
                fileUploading:false,
            },
        };
    },
    methods:{
        updataCoupon(){
            const vm = this;
            let url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            let httpMethods = 'post';
            if(vm.isNew === false){
                url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                httpMethods = 'put';
            }
            vm.isLoading = true;
            vm.status.fileUploading = true;
            this.$http[httpMethods](url,{data:vm.tempCoupon}).then((response) =>{
                console.log(response.data);
                if(response.data.success){
                    $('#CouponModal').modal('hide');
                    vm.getCoupon();
                }else{
                    $('#CouponModal').modal('hide');
                    vm.getCoupon();
                }
                vm.isLoading = false;
                vm.status.fileUploading = false;
            });
        },
        getCoupon(page=1){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            // vm.isLoading = true;
            // vm.status.fileUploading = true;
            this.$http.get(url).then((response) =>{
                console.log(response.data);
                vm.coupons = response.data.coupons;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
                vm.status.fileUploading = false;
            });
        },
        openModal(isNew,item){
            if(isNew){
                this.tempCoupon = {};
                this.isNew = true;
            }else{
                this.tempCoupon = Object.assign({},item);
                this.isNew = false;
            }
            $('#CouponModal').modal('show');
        }
    },
    created(){
        this.getCoupon();
    }
}
</script>