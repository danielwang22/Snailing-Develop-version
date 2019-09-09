<template>
      <gmap-map
        :center="center"
        :zoom="12"
        style="width:100%;  height: 400px;"
      >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
</template>

<script>

export default {
  name: "GoogleMap",
  props:{
    position:{
      type:Object,
      default:()=>{
        return {lat:121.30,lng:25.02}
      }
    }
  },
  data() {

    return {
      center: { lat: this.position.latitude, lng: this.position.longitude },
      markers: [{
        position:{lat: this.position.latitude, lng: this.position.longitude}
      }],
      currentPlace: null
    }

  },
  watch: {
    position:function(newVal, oldVal) {
      console.log(newVal.latitude,newVal.longitude)
      this.$set(this.center,'lat',newVal.latitude);
      this.$set(this.center,'lng',newVal.longitude);
    }
  },
}

</script>
