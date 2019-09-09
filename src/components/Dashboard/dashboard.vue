<template>
    <div>
        <Navbar/>
        <AlertMsg/>
        <div class="container-fluid">
            <div id="Dashboard" class="d-flex flex-row flex-wrap align-items-lg-stretch m-n1">
                <Sidebar class="col-lg-2 col-md-12 col-12 bg-light"></Sidebar>
                <main role="main" class="col-lg-10 col-md-12 col-12 ml-sm-auto px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Sidebar from '@/components/Dashboard/sidebar';
import Navbar from '@/components/Dashboard/navbar';
import AlertMsg from '../AlertMessage';

export default {
  components:{
      Sidebar,
      Navbar,
      AlertMsg
  },
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.row{
    height: 545px;
}
main{
    overflow-x:scroll;
}
#Dashboard{
    height: 100vh;
}
</style>
