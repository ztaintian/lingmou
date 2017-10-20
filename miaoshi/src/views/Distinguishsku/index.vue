<template>
  <div class="distinguishsku">
    <div class="table">
      <div class="Theaded">
        <div class="W200 publicCss">编号</div>
        <div class="W120 publicCss">图片</div>
        <div class="W360 publicCss">sku名</div>
        <div class="W200 publicCss">父品牌</div>
        <div class="W120 publicCss">必备</div>
        <div class="W120 publicCss">重点</div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W200 publicCss">9990000</div>
        <div class="W120 publicCss"><img  class="img" src="" alt=""></div>
        <div class="W360 publicCss">可口可乐330ml罐装</div>
        <div class="W200 publicCss">可口可乐</div>
        <div class="W120 publicCss"><img class="imgHook" :src="hookUrl" alt=""></div>
        <div class="W120 publicCss"><img class="imgHook" :src="hookUrl" alt=""></div>
      </div>
    </div>
    <div class="pagination">
      <span class="totle">共190条，每页20条</span>
      <img class="img" :src="pnextUrl" alt=""><span class="num">2/20</span>
      <img class="img" :src="nextUrl" alt="">
      <input type="" name="">
      <span class="jump">跳转</span>
    </div>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import ic_nextActive from '@/assets/ic_next_pressed@1x.png'
import ic_next from '@/assets/ic_next_normal@1x.png'
import pic_next from '@/assets/ic_pre_normal@1x.png'
import pic_nextActive from '@/assets/ic_pre_pressed@1x.png'
export default {
  name: 'Distinguishsku',
  data () {
    return {
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      hookUrl:hookicon,
      tableList:[{showBc:false},{showBc:false},{showBc:false},{showBc:false}]
    }
  },
  methods:{
  }
}
</script>

<style lang="scss">
  .distinguishsku{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .table{
      margin:30px auto 0;
      width:1120px;
      padding-bottom: 200px;
      box-sizing:border-box;
      .W360{
        width:360px;
      }
      .W200{
        width:200px;
      }
      .W120{
        width:120px;
      }
      .Theaded{
        overflow:hidden;
        color: #000000;
        font-weight:bold;
        border-radius: 4px;
        background: #F5F5F5;
      }
      overflow:hidden;
      vertical-align: middle;
      line-height:40px;
      .publicCss{
        display:inline-block;
        float: left;
        height:40px;
        text-align: center;
        vertical-align: middle;
        color: #000000;
      }
    }
    .tablelist{
      overflow: hidden;
      border-bottom: 1px solid #E0E0E0;
      .img{
        width:36px;
        height:36px;
        vertical-align: middle;
        background:red;
      }
      .imgHook{
        vertical-align: middle;
        width:24px;
        height:24px;
      }
    }
    .tablelistBc{
      background: #F5F5F5;
    }
    .pagination{
      float: right;
      margin-right: 60px;
      .totle{
        font-size: 14px;
        color: #8C8C8C;
        margin-right: 20px;
      }
      .img{
        vertical-align: middle;
        cursor: pointer;
      }
      .num{
        margin:0 5px 0 8px;
      }
      input{
        background: #F5F5F5;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        width:56px;
        height:20px;
        margin-right: 8px;
      }
      .jump{
        font-size: 14px;
        color: #333333;
        background: #F5F5F5;
        display: inline-block;
        width:40px;
        height:24px;
        line-height: 24px;
        border-radius: 4px;
        text-align: center;
        cursor:pointer;
        font-size: 14px;
        color:#333;
      }
    }
  }
</style>
