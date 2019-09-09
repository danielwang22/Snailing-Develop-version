<template>
    <div>
        <div class="loginbody offset-lg-2 col-lg-10 offset-md-1 col-md-10 mb-5 offset-1 col-10 d-flex justify-content-center align-items-center mt-xl-7 mt-7">
            <div class="loginblock col-lg-6 col-md-7 col-sm-8 col-12 p-0 bg-primary">
               <form class="d-flex flex-wrap justify-content-center mt-xl-6 mt-6 position-relative" @submit.prevent="signin">
                    <h1 class="col-12 col-md-11 text-light text-center font-weight-bold">會員登入</h1>
                    <h4 v-if="login === false" class="col-12 col-md-11 text-danger text-center font-weight-bold">登入失敗</h4>
                    <div class="col-10 col-md-11 col-sm-11 d-flex form-group mt-xl-6 mt-6 mb-0">
                        <span class="bg-light d-flex justify-content-center" id="user" style="width:15%;"><i class="fas fa-user align-self-center"></i></span>
                        <input type="email" class="form-control w-100 p-0 border-0 rounded-0 bg-light SourceLight" id="exampleInputEmail1" v-model="user.username" aria-describedby="emailHelp" placeholder=" 帳號為ogcing78@gmail.com">
                    </div>
                    <div class="col-10 col-md-11 col-sm-11 d-flex form-group mt-xl-1 mt-1">
                        <span class="bg-light d-flex justify-content-center" id="key" style="width:15%;"><i class="fas fa-key align-self-center"></i></span>
                        <input type="password" class="form-control w-100 p-0 border-0 rounded-0 bg-light SourceLight" id="exampleInputPassword1" v-model="user.password" placeholder=" 密碼為ogcing7890">
                    </div>
                    <div class="col-10 col-md-11 col-sm-11 ml-xl-5 ml-md-3 ml-5 form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label text-light font-weight-bold" for="exampleCheck1">記住我</label>
                    </div>
                    <button type="submit" class="p-md-0 p-2 col-12 w-100 align-self-end btn btn-secondary rounded-0 text-primary font-weight-bold">帳號登入</button>
               </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
    return {
      user:{
          username:'',
          password:'',
      },
      message:'',
      login:''
    };
  },
  methods: {
      signin(){
        const api = `${process.env.APIPATH}/admin/signin`;
        const vm = this;
        this.$http.post(api,vm.user).then((response) => {
            console.log(response.data);
            if(response.data.success){
                vm.$router.push("/index");
                vm.$router.msg = '已登入';
                vm.login = true;
                vm.loginRes(response.data.success);
            }else{
                vm.$router.msg = '登入失敗';
                vm.message = '登入失敗';
                vm.login = false;
                vm.loginRes(response.data.success);
            }
        });
      },
      loginRes(res){
          this.$bus.$emit('loginRes:push',res);
      }
  },
}
</script>

<style lang='scss' scoped>
$input-height: 56.8px;

::placeholder{
    color: rgb(114, 114, 114) !important;
    opacity: 1;
}
#user{
    height: $input-height;
}
#key{
    height: $input-height;
}
#exampleInputEmail1{
    height: $input-height;
}
#exampleInputPassword1{
    height: $input-height;
}
@media (min-width: 768px) and (max-width: 992px){
    #user{
    height: $input-height;
    }
    #key{
        height: $input-height;
    }
    #exampleInputEmail1{
        height: $input-height;
    }
    #exampleInputPassword1{
        height: $input-height;
    }
}
@media (min-width: 576px) and (max-width: 768px){
    #user{
        height: $input-height * 0.8;
    }
    #key{
        height: $input-height * 0.8;
    }
    #exampleInputEmail1{
        height: $input-height * 0.8;
    }
    #exampleInputPassword1{
        height: $input-height * 0.8;
    }
}
@media (min-width: 0px) and (max-width: 576px){
    #user{
        height: $input-height * 0.7;
    }
    #key{
        height: $input-height * 0.7;
    }
    #exampleInputEmail1{
        height: $input-height * 0.7;
    }
    #exampleInputPassword1{
        height: $input-height * 0.7;
    }
}
</style>
