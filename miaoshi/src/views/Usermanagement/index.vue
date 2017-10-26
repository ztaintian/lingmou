<template>
  <div class="usermanagement">
    <div class="adminset">
      用户设置
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W160 publicCss">帐号(营业所＋线路编号)</div>
        <div class="W200 publicCss">最后登录时间</div>
        <div class="W200 publicCss">第一次登录时间</div>
        <div class="W200 publicCss">已修改密码</div>
        <div class="W120 publicCss">状态</div>
        <div class="W240 publicCss"></div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W160 publicCss">299000 000</div>
        <div class="W200 publicCss">2017-12-12  19:02:34</div>
        <div class="W200 publicCss">2017-12-12  19:02:34</div>
        <div class="W200 publicCss">已修改</div>
        <div class="W120 publicCss">已启用</div>
        <div class="W240 publicCss operation" style="position:relative;">
          <div class="secrit" @click="passwordInit(v)">密码初始化</div>
          <div v-if="v.tipShow" class="messageBox ml76">
            <img class="img" :src="sanjiaoUrl" alt="">
            <div class="count">
              账号：789334 106
            </div>
            <div class="decrite">
              确定对该账号进行密码初始化？
            </div>
            <div @click="confimSecrit(v)" class="btnAA btnAAS">
               确定
            </div>
            <div @click="canlve(v)" class="btnAA btnAAC">
               取消
            </div>
          </div>
          <div class="secrit" @click="Disable(v)">
            禁用
          </div>
          <div v-if="v.openShow" class="messageBox">
            <img class="img" :src="sanjiaoUrl" alt="">
            <div class="count">
              账号：789334 106
            </div>
            <div class="decrite">
              确定重新启用该帐号？
            </div>
            <div @click="confimOpen(v)" class="btnAA btnAAS">
               确定
            </div>
            <div @click="canlve(v)" class="btnAA btnAAC">
               取消
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
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
import sanjiao from '@/assets/sj@1x.png'

export default {
  name: 'Usermanagement',
  data () {
    return {
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      hookUrl:hookicon,
      editBoxShow:false,
      BoxShow:false,
      countent:'',
      sanjiaoUrl:sanjiao,
      tableList:[{showBc:false,tipShow:false,openShow:false},{showBc:false,tipShow:false,openShow:false},{showBc:false,tipShow:false,openShow:false}]
    }
  },
  methods:{
    allHidden(){
      for(var i=0;i<this.tableList.length;i++){
        this.tableList[i].tipShow = false
        this.tableList[i].openShow = false
      }
    },
    Disable(v){
      this.allHidden()
      v.openShow = true
    },
    confim(){
    },
    canlve(v){
      v.tipShow = false
      v.openShow = false
    },
    confimSecrit(v){
      v.tipShow = false
    },
    confimOpen(v){
      v.openShow = false
    },
    passwordInit(v){
      this.allHidden()
      v.tipShow = true
    }
  }
}
</script>

<style lang="scss">
  .usermanagement{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .adminset{
      font-family:"Microsoft YaHei";
      font-weight: bold;
      font-size: 20px;
      color: #000000;
      float: left;
      margin:30px 0 16px 30px;
    }
    .table{
      margin:30px auto 0;
      width:1120px;
      padding-bottom: 200px;
      box-sizing:border-box;
      .Theaded{
        overflow:hidden;
        color: #000000;
        font-family:"Microsoft YaHei";
        font-weight: bold;
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
      border-bottom: 1px solid #E0E0E0;
      position:relative;
      .messageBox{
        position:absolute;
        z-index:777;
        width:280px;
        height:145px;
        background:#000;
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
        border-radius: 4px;
        top:40px;
        right:20px;
        text-align: center;
      }
      .ml76{
        right:76px;
      }
      .img{
        position:absolute;
        top:-9px;
        right:30px;
      }
      .operation{
        text-align: right;
        .secrit{
          display:inline-block;
          cursor: pointer;
          color:#2D78B3;
          margin-right: 22px;
        }
        .count{
          font-family: "Microsoft YaHei";
          font-size: 14px;
          color: #000000;
          font-weight:bold;
          margin:20px 0 0 0;
          line-height:20px;
        }
        .decrite{
          font-weight:bold;
          font-size: 14px;
          color: #000000;
        }
        .btnAA{
          float: left;
          width:80px;
          height:30px;
          text-align: center;
          line-height: 30px;
          margin-top:10px;
          cursor:pointer;
        }
        .btnAAS{
          background: #2D78B3;
          border-radius: 4px;
          margin-right:10px;
          margin-left:50px;
          border: 1px solid #E0E0E0;
          font-size: 14px;
          color: #FFFFFF;
        }
        .btnAAC{
          background: #F5F5F5;
          border: 1px solid #E0E0E0;
          border-radius: 4px;
          font-size: 14px;
          color: #333333;
        }
        .tipBox{
          position: absolute;
          color: #000000;
          top:0;
          left:0;
          width:280px;
          background: #FFFFFF;
          border: 1px solid #E0E0E0;
          box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
          border-radius: 4px;
          height:145px;
          z-index: 99999;
        }
      }
    }
  }
</style>
