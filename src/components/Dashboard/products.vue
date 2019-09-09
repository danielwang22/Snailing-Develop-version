<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-outline-info btn-sm mt-4" @click="openModal(true)">建立新的商品</button>    
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th style="width:15%">分類</th>
                    <th style="width:30%">產品名稱</th>
                    <th class="text-center" style="width:5%">原價</th>
                    <th class="text-center" style="width:5%">售價</th>
                    <th style="width:10%">是否啟用</th>
                    <th class="text-center" style="width:12%">編輯</th>
                </tr>
            </thead>
            <tbody class="SourceLight">
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-center">{{item.origin_price}}</td>
                    <td class="text-center">{{item.price}}</td>
                    <td>
                        <span v-if="item.is_enable" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td class="text-center d-flex flex-row justify-content-around">
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                        <button class="btn btn-outline-warning btn-sm" @click="openDeleteModal(false,item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- pagination -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getproducts(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}"><a class="page-link" href="#" @click.prevent="getproducts(page)">{{page}}</a></li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getproducts(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>

        <!-- Modal 新增商品-->
        <div @blur="ClearautocompleteText" class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="d-sm-flex flex-sm-row flex-column">
                <div class="col-sm-4 col">
                    <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control SourceLight" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                    <input type="text" class="form-control SourceLight mt-1" id="image" v-model="tempProduct.imageUrl1" placeholder="請輸入圖片連結">
                    <input type="text" class="form-control SourceLight mt-1" id="image" v-model="tempProduct.imageUrl2" placeholder="請輸入圖片連結">
                    </div>
                    <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-circle-notch fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control btn" ref="files" @change="uploadfile">
                    </div>
                    <div class="uploading-group">
                        <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                        class="img-fluid" alt="" :src="tempProduct.imageUrl">
                        <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                        class="img-fluid" alt="" :src="tempProduct.imageUrl1">
                        <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                        class="img-fluid" alt="" :src="tempProduct.imageUrl2">
                    </div>
                </div>
                <div class="col-sm-8 col">
                    <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control SourceLight" id="title"
                        placeholder="請輸入標題" v-model="tempProduct.title">
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control SourceLight" id="category"
                        placeholder="請輸入分類" v-model="tempProduct.category">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">間</label>
                        <input type="unit" class="form-control SourceLight" id="unit"
                        placeholder="請輸入單位" v-model="tempProduct.unit">
                    </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control SourceLight" id="origin_price"
                            placeholder="請輸入原價" v-model="tempProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control SourceLight" id="price"
                            placeholder="請輸入售價" v-model="tempProduct.price">
                        </div>
                    </div>
                    <div class="form-group">
                    <label for="title">地址</label>
                    <vue-google-autocomplete
                        type=""
                        :id="from_address_id"
                        :autocompleteInputText="autocompleteText"
                        classname="form-control vue-google-autocomplete"
                        placeholder="請輸入地址"
                        v-on:placechanged="getFromAddress"
                        v-on:error="handleError"
                    >
                    </vue-google-autocomplete>
                    </div>
                    <hr>

                    <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control SourceLight" id="content"
                        placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enable" :true-value="1" :false-value="0">
                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="is_like" v-model="tempProduct.is_like" :true-value="0" :false-value="1">
                            <label class="form-check-label" for="is_like">喜好</label>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="ClearautocompleteText">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct(pagination.current_page)">確認</button>
            </div>
            </div>
        </div>
        </div>
        <!-- Modal 刪除商品 -->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="delProduct(pagination.current_page)">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import $ from'jquery';
// import Auto complete google map
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
    data(){
        return{
            products:[],
            pagination:{},
            tempProduct:{},
            place:null,
            isNew:false,
            isLoading:false,
            status:{
                fileUploading:false,
            },
            from_address:{},
            from_address_id:'init-id',
            autocompleteText:''
        };
    },
    components: {VueGoogleAutocomplete},
    mounted() {
        console.log('mounted')
    },
    methods: {
        getproducts(page = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                vm.isLoading = false;
                vm.products = response.data.products;
                vm.pagination = response.data.pagination;
            });
        },
        openModal(isNew,item){
            if(isNew){
                this.tempProduct = {};
                this.autocompleteText = ''
                this.isNew = true;
            }else{
                this.tempProduct = Object.assign({},item);
                this.from_address_id = item.id;
                this.autocompleteText = this.tempProduct.hasOwnProperty('address') ? this.tempProduct.address.autocompleteText : '';
                this.isNew = false;
            }
            //$('.vue-google-autocomplete').attr('id', item.id);
            $('#productModal').modal('show');
        },
        updateProduct(page){
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
            let httpMethods = 'post';
            const vm = this;
            if(vm.isNew === false){
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                httpMethods = 'put';
            }
            this.$http[httpMethods](api,{data : vm.tempProduct}).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    $('#productModal').modal('hide');
                    vm.getproducts(page);
                }else{
                    $('#productModal').modal('hide');
                    vm.getproducts(page);
                    alert('請登入帳號');
                }
                // vm.products = response.data.products;
            });
        },
        delProduct(page){
            const vm = this;
            console.log(vm.tempProduct.id);
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
            this.$http.delete(api).then((response) =>{
                console.log(response.data);
                if(response.data.success){
                    $('#delProductModal').modal('hide');
                    vm.getproducts(page);
                }else{
                    $('#delProductModal').modal('hide');
                    vm.getproducts(page);
                }
            });
        },
        openDeleteModal(isNew,item){
            if(isNew){
                this.tempProduct = {};
                this.isNew = true;
            }else{
                this.tempProduct = Object.assign({},item);
                this.isNew = false;
            }
            $('#delProductModal').modal('show');
        },
        uploadfile(){
            const uploadDeFile = this.$refs.files.files[0];
            const vm = this;
            const formData = new FormData();
            formData.append('file-to-upload',uploadDeFile);
            vm.status.fileUploading = true;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
            this.$http.post(url,formData,{
                headers:{
                    'Content-Type' : "multipart/form-data" 
                },
            }).then((response) =>{
                console.log(response.data);
                vm.status.fileUploading = false;
                if(response.data.success){
                    // vm.tempProduct.imageUrl = response.data.imageUrl;
                    // console.log(vm.tempProduct.imageUrl);
                    vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
                }else{
                    this.$bus.$emit('messsage:push',response.data.message,'danger');
                }
            });
        },
        getFromAddress(from_address, placeResultData, id) {
            this.from_address = from_address;
            this.$set(this.tempProduct,'address',from_address)
            this.$bus.$on('autocompleteText', autocompleteText=>{
                this.$set(this.tempProduct.address,'autocompleteText',autocompleteText)
            });
        },
        handleError(error){
            alert(error);
        },
        ClearautocompleteText(){
            this.autocompleteText = ' ';
        }
    },
    created() {
        this.getproducts();
        
    },
}
</script>   

<style lang="scss">
.uploading-group{
    height: 400px;
    overflow-y: scroll;
    scrollbar-color: rgb(206, 206, 206) rgb(224, 224, 224);
    scrollbar-width: thin;
}
.modal{
    z-index: 1048;
}
.pac-container{
  z-index: 1051 !important;
}
</style>
