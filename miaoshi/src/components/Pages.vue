<template>
  <div class="pagination">
    <span class="totle">共{{totlePages}}条，每页20条</span>
    <img class="img" @click="preClick" :src="imgUrlPre?pnextUrl:pnextUrlA" alt=""><span class="num">{{mynowPages}}/{{Math.ceil(mytotlePages/20)}}</span>
    <img class="img"  @click="nextClick"  :src="imgUrlNext?nextUrl:nextUrlA" alt="">
    <input type="" name="" v-model="jumpPages">
    <span class="jump" @click="jump">跳转</span>
  </div>
</template>

<script>
import ic_nextActive from '@/assets/ic_next_pressed@1x.png'
import ic_next from '@/assets/ic_next_normal@1x.png'
import pic_next from '@/assets/ic_pre_normal@1x.png'
import pic_nextActive from '@/assets/ic_pre_pressed@1x.png'

export default {
  name: 'Pages',
  data () {
    return {
      jumpPages:'',
      imgUrlPre:true,
      imgUrlNext:true,
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      pagesJump:'',
      mynowPages:this.nowPages,
      mytotlePages:this.totlePages
    }
  },
  props:["totlePages","nowPages"],
  mounted(){
  },
  watch:{
    mynowPages(val){
      this.$emit('update:nowPages', val)
    },
    mytotlePages(val){
      this.$emit('update:totlePages', val)
    },
    totlePages(val){
      this.totlePages = val
    },
    nowPages(val){
      this.nowPages = val
    }
  },
  methods:{
    preClick(){
      this.imgUrlNext = true
      if(this.mynowPages <=1){
        return
      }
      this.mynowPages--
      this.imgUrlPre = false
    },
    nextClick(){
      this.imgUrlPre = true
      if(this.mynowPages >= Math.ceil(this.mytotlePages/20)){
        return
      }
      this.mynowPages++
      this.imgUrlNext = false
    },
    jump(){
      if(isNaN(this.jumpPages)){
        return
      }
      if(this.jumpPages<=0||this.jumpPages>Math.ceil(this.mytotlePages/20)){
        return;
      }
      this.imgUrlNext = true
      this.imgUrlPre = true
      this.mynowPages = this.jumpPages
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
