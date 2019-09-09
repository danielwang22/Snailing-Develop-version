<template>
    <div>
        <nav class="navbar navbar-dark bg-primary flex-nowrap p-0 shadow mb-1">
            <router-link class="navbar-brand col-6 col-sm-3 col-md-2 mr-0" to='/index'><img class="Dashboard-navbar" src="@/assets/img/logo-all-light.svg" alt=""></router-link>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link text-light" href="#" @click="signout">登出</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name:"Navbar",
    data(){
        return{
            num : {},
            login:''
        };
    },
    computed:{
        
    },
    methods:{
        signout(){
            const api = `${process.env.APIPATH}/logout`;
            const vm = this;
            this.$http.post(api).then((response) => {
                    console.log(response.data);
                    if(response.data.success){
                        vm.$router.push("/index");
                        vm.$router.msg = '登出成功';
                        this.login = false;
                        this.loginRes()
                    }else{
                        vm.$router.msg = '登出失敗';
                        this.login = true;
                        this.loginRes()
                    }
                });
        },
        loginRes(){
            this.$bus.$emit('loginRes:push',this.login);
        }
    },
    created(){
        
    },
}
</script>