<template>
    <div>


            <form @submit.prevent="formdelivery" id="personal-profile" class="d-flex flex-column w-100 bg-primary p-2">
                <h3 class="text-secondary font-weight-bold col h-50">個人資料</h3>
                <div class="form-group mt-lg-7 mt-md-4 mt-5 col">
                    <label for="email" class="text-secondary font-weight-light">Email</label>
                    <input type="text" class="form-control rounded-0 bg-primary border-0 font-weight-light SourceLight" :class="{'is-invalid':errors.has('email')}" name="email" v-validate="'required|email'" v-model="form.user.email" id="email" placeholder="請輸入 Email">
                    <small class="text-danger SourceLight" v-if="errors.has('email')">{{errors.first('email')}}</small> 
                </div>
                <div class="form-group col">
                    <label for="name" class="text-secondary font-weight-light">收件人姓名</label>
                    <input type="text" name="name" class="form-control rounded-0 bg-primary border-0 SourceLight" :class="{'is-invalid':errors.has('name')}" v-validate="'required'" v-model="form.user.name" id="name" placeholder="請輸入收件人姓名">
                    <small class="text-danger SourceLight" v-if="errors.has('name')">姓名必須輸入</small>
                </div>
                <div class="form-group col">
                    <label for="phone" class="text-secondary font-weight-light">收件人電話</label>
                    <input type="text" class="form-control rounded-0 bg-primary border-0 SourceLight" :class="{'is-invalid':errors.has('phone')}" name="phone" v-validate="'required|numeric'" v-model="form.user.tel" id="phone" placeholder="請輸入收件人電話">
                    <small v-if="errors.has('phone')" class="text-danger SourceLight">{{ errors.first('phone') }}</small>
                </div>
                <div class="form-group col">
                    <label for="adress" class="text-secondary font-weight-light">收件人地址</label>
                    <input type="text" class="form-control rounded-0 bg-primary border-0 SourceLight" :class="{'is-invalid':errors.has('address')}" name="address" v-validate="'required'" v-model="form.user.adress" id="adress" placeholder="請輸入收件人地址">
                    <small v-if="errors.has('address')" class="text-danger SourceLight">地址必須輸入</small>
                </div>
                <div class="form-group col">
                    <label for="description" class="text-secondary font-weight-light">留言</label>
                    <textarea type="text" class="form-control SourceLight" name="description" v-model="form.message" id="description"></textarea>
                </div>
                <div class="form-group col mb-0">
                    <button id="personal-profile" class="btn btn-outline-secondary w-50 font-weight-bold float-right">確認</button>
                </div>
                
            </form>


    </div>
</template>
<script>
export default {
    data() {
        return {
            carts:{},
            form:{
                user:{
                    name:'',
                    tel:'',
                    email:'',
                    adress:'',
                },
                message:'',
            },
        };
    },
    beforeRouteLeave (to, from, next) {
        console.log('toooo' , to , 'frommmmm' , from , 'nextttt' , next);
        if(to.path == '/customercart'){
            next(from.fullPath);
            this.$bus.$emit('messsage:push','請完成表單','danger');
        }else{
            next();
        }
    },
    methods: {
        getcart(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.get(url).then((response) =>{
                vm.carts = response.data.data;
                console.log(response.data);
                vm.$bus.$on('pricepush',(price = 0) =>{
                    console.log(price);
                    vm.$set(vm.form,'finalprice',price);
                });
            });
        },
        formdelivery(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            this.$validator.validate().then((valid) => {
                if (valid) {
                this.$http.post(url,{data:order}).then((response) =>{
                    console.log('訂單已建立',response);
                    if(response.data.success){
                        vm.$router.push('/ordermanger');
                        vm.form = {
                            user:{
                                name:'',
                                tel:'',
                                email:'',
                                adress:'',
                            },
                            message:'',
                        };
                    }else{
                        
                    }
                });
                }else{
                    alert('欄位不完整');
                }
            });
            //下一個
        },
    },
    created() {
        this.getcart();
    },
}
</script>

<style lang="scss">
::placeholder{
    color: #eaf0ed94 !important;
}
#personal-profile input{
    border-bottom: thin solid #FFE180 !important;
    color: #FFE180;
}
@media (max-width: 768px){
    #personal-profile{
        width: 100% !important;
    }
}
</style>

