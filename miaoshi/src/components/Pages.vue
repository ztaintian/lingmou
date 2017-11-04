<template>
  <div class="pagination">
    <span class="totle">共{{totlePages}}条，每页20条</span>
    <img class="img" @click="preClick" @mouseleave="imgLeave" @mouseover="imgHover(0)" :src="imgUrlPre?pnextUrl:pnextUrlA" alt=""><span class="num">{{mynowPages}}/{{Math.ceil(mytotlePages/20)}}</span>
    <img class="img"  @click="nextClick" @mouseleave="imgLeave" @mouseover="imgHover(1)" :src="imgUrlNext?nextUrl:nextUrlA" alt="">
    <input type="" name="" v-model="jumpPages">
    <span :class="[jumpBc?'buleColor':'','jump']" @mouseleave="jumpLeave" @mouseover="jumpHover" @click="jump">跳转</span>
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
      jumpBc:false,
      jumpPages:'',
      imgUrlPre:true,
      imgUrlNext:true,
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      pagesJump:'',
      mynowPages:this.nowPages,
      mytotlePages:this.totlePages,
      mybntShowPage:this.bntShowPage
    }
  },
  props:["totlePages","nowPages",'bntShowPage'],
  mounted(){
  },
  watch:{
    mynowPages(val){
      this.$emit('update:nowPages', val)
    },
    mytotlePages(val){
      this.$emit('update:totlePages', val)
    },
    mybntShowPage(val){
      this.$emit('update:mybntShowPage', val)
    },
    totlePages(val){
      this.totlePages = val
    },
    nowPages(val){
      this.nowPages = val
    },
    bntShowPage(val){
      this.bntShowPage = val
    }
  },
  methods:{
    jumpLeave(){
      this.jumpBc = false
    },
    jumpHover(){
      this.jumpBc = true
    },
    imgLeave(){
      this.imgUrlNext = true
      this.imgUrlPre = true
    },
    imgHover(num){
      if(num == 0){
        this.imgUrlPre = false
      }else{
        this.imgUrlNext = false
      }
    },
    preClick(){
      this.jumpPages = ''
      if(this.mynowPages <=1){
        return
      }
      this.mynowPages--
      this.imgUrlPre = false
    },
    nextClick(){
      this.jumpPages = ''
      console.log(this.mybntShowPage)
      if(this.mynowPages >= Math.ceil(this.mytotlePages/20)){
        return
      }
      console.log(typeof(this.mynowPages))
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
  .buleColor{
    background: #2D78B3;
    color:#fff;
  }
</style>
