<template>
    <div class="d-flex flex-row flex-wrap col-md-12 mt-2 mb-2">
        <!-- filter -->
        <button @click="changeDormType('經典雙人房')" class="list-items-text list-group-item btn btn-outline-forth col h5 text-primary text-center font-weight-bolder font-famaily-snalf p-6">經典雙人床 </button>
        <button @click="changeDormType('悠閒單人房')" class="list-items-text list-group-item col btn btn-outline-forth h5 text-primary text-center font-weight-bolder font-famaily-snalf p-6">悠閒單人床 </button>
        <button @click="changeDormType('歡樂混合房')" class="list-items-text list-group-item col btn btn-outline-forth h5 text-primary text-center font-weight-bolder font-famaily-snalf p-6">歡樂混合床 </button>
        <button @click="changeDormType('野生搭帳')" class="list-items-text list-group-item col btn btn-outline-forth h5 text-primary text-center font-weight-bolder font-famaily-snalf p-6">野生搭帳 </button>
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

</style>
