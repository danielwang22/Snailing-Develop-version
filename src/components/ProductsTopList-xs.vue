<template>
    <div id="filter" class="d-flex flex-row justify-content-around col-12 mt-2 mb-2">
            <button @click="changeDormType('經典雙人房')" class="list-group-item p-1 mr-2 bg-primary border-0 rounded-circle"><img class="top-list-img" src="..\assets\little-doublebed-icon.svg" alt="Db"></button>
            <button @click="changeDormType('悠閒單人房')" class="list-group-item p-1 mr-2 bg-secondary border-0 rounded-circle"><img class="top-list-img" src="..\assets\little-signalbed-icon.svg" alt="Sb"></button>
            <button @click="changeDormType('歡樂混合房')" class="list-group-item p-1 mr-2 bg-thrid border-0 rounded-circle"><img class="top-list-img" src="..\assets\little-mixbed-icon.svg" alt="Mb"></button>
            <button @click="changeDormType('野生搭帳')" class="list-group-item p-1 bg-forth border-0 rounded-circle"><img class="top-list-img" src="..\assets\little-tent-icon.svg" alt="Tb"></button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            DormType:'經典雙人房'
        }
    },
    methods: {
        changeDormType(type){
            this.DormType = type;
            this.$emit('sendDormType',type)
        }
    },
}
</script>
<style lang="scss" scoped>
.top-list-img{
    width: 50px;
}
</style>
