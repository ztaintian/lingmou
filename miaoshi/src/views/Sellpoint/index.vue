<template>
  <div class="sellpoint">
    <div class="export">
      <img :src="exportUrl" alt="">
      <span>导入并更新所有售点</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W100 publicCss">营业所编号</div>
        <div class="W100 publicCss">拜访线路</div>
        <div class="W100 publicCss">售点编号</div>
        <div class="W222 publicCss">名称</div>
        <div class="W178 publicCss">地址</div>
        <div class="W100 publicCss">联系人</div>
        <div class="W120 publicCss">手机号</div>
        <div class="W100 publicCss">拜访频率</div>
        <div class="W100 publicCss">星期几</div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W100 publicCss">123444</div>
        <div class="W100 publicCss">101</div>
        <div class="W100 publicCss">92019203</div>
        <div class="W222 publicCss">全家便利店（徐汇店）</div>
        <div class="W178 publicCss">上海市徐汇区肇嘉浜路7…</div>
        <div class="W100 publicCss">林田田</div>
        <div class="W120 publicCss ">13800138000</div>
        <div class="W100 publicCss ">一周一访</div>
        <div class="W100 publicCss ">周二／周五</div>
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
import exporticon from '@/assets/ic_import@1x.png'

export default {
  name: 'Sellpoint',
  data () {
    return {
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      hookUrl:hookicon,
      exportUrl:exporticon,
      tableList:[{showBc:false},{showBc:false},{showBc:false}]
    }
  },
  methods:{
  }
}
</script>

<style lang="scss">
  .sellpoint{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .export{
      margin:24px 0 20px 30px;
      height:24px;
      img{
        vertical-align: bottom;
        font-size: 0;
      }
      span{
        line-height: 24px;
        margin-left:0;
        color:#2D78B3 ;
      }
      font-size: 14px;
      color: #2D78B3;
    }
    .table{
      margin:30px auto 0;
      width:1120px;
      padding-bottom: 200px;
      box-sizing:border-box;
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
    }
  }
</style>
