<template>
  <div class="administratorsettings">
    <div class="adminset">
      管理员设置
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W160 publicCss">用户名</div>
        <div class="W200 publicCss">最后登录IP</div>
        <div class="W200 publicCss">最后登录时间</div>
        <div class="W200 publicCss">创建时间</div>
        <div class="W120 publicCss">状态</div>
        <div class="W240 publicCss"></div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W160 publicCss">bellcha</div>
        <div class="W200 publicCss">192.349.294.223</div>
        <div class="W200 publicCss">2017-12-12  19:02:34</div>
        <div class="W200 publicCss">2017-12-12  19:02:34</div>
        <div class="W120 publicCss">已拉黑</div>
        <div class="W240 publicCss operation">
          <span>编辑</span>
          <span>删除</span>
          <span>启用</span>
        </div>
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
  name: 'Administratorsettings',
  data () {
    return {
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      hookUrl:hookicon,
      tableList:[{showBc:false},{showBc:false},{showBc:false}]
    }
  },
  methods:{
  }
}
</script>

<style lang="scss">
  .administratorsettings{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .adminset{
      font-family: 'PingFangSC-Regular';
      font-size: 20px;
      color: #000000;
      float: left;
      margin:30px 0 16px 30px;
      font-weight: bold;
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
      .operation{
        text-align: right;
        span{
          cursor: pointer;
          color:#2D78B3;
          margin-right: 22px;
        }
      }
    }
  }
</style>
