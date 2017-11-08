<template>
  <div class="messagebox">
    <div class="messagecont">
       <img  style="height:500px;width:300px;" :src="imgUrl" alt="">
      <div style="cursor:pointer;margin-top: 5px;margin-left:145px;font-size:20px;color:#000;" @click="cancle">
        X
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ImgModel',
  data () {
    return {
      myeditBoxShow:this.editBoxShow
    }
  },
  props:["imgUrl",'editBoxShow'],
  mounted(){
  },
  watch:{
    myeditBoxShow(val){
      this.$emit('update:editBoxShow', val)
    }
  },
  methods:{
    cancle(){
      this.myeditBoxShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .messagebox{
    position: fixed;
    top:0;
    left:0;
    height:100%;
    z-index: 9999;
    background: rgba(0,0,0,0.40);
    width:100%;
    .messagecont{
      position:absolute;
      left:50%;
      top:50px;
      margin-left:-150px;
      .bntlast{
        background:#324656;
        cursor:pointer;
      }
      height:254px;
      width:520px;
    }
  }

</style>
