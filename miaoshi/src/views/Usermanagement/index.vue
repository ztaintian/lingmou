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
        <div class="W120 publicCss">启用</div>
        <div class="W240 publicCss operation">
          <div class="secrit" @click="passwordInit(v)">密码初始化</div>
          <div @click="open(v)">禁用</div>
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
    <div class="messagebox" v-if="editBoxShow">
      <div class="messagecont">
        <div class="count">
          账号：789334 106
        </div>
        <div class="decrite">
          确定对该账号进行密码初始化？
        </div>
        <span>
          <div @click="confim" class="btnAA btnAAS">
             确定
          </div>
          <div @click="canlve" class="btnAA btnAAC">
             取消
          </div>
        </span>
      </div>
    </div>
    <div class="messagebox" v-if="BoxShow">
      <div class="messagecont">
        <div class="count">
          账号：789334 106
        </div>
        <div class="decrite">
         确定重新启用该帐号？
        </div>
        <span>
          <div @click="confimOpen" class="btnAA btnAAS">
             确定
          </div>
          <div @click="canlve" class="btnAA btnAAC">
             取消
          </div>
        </span>
      </div>
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
      tableList:[{showBc:false},{showBc:false},{showBc:false}]
    }
  },
  methods:{
    open(){
      this.BoxShow = true
    },
    confim(){
      this.editBoxShow = false
    },
    canlve(){
      this.editBoxShow = false
      this.BoxShow = false
      document.body.style.overflow='scroll';
      document.body.style.height='100%';
    },
    open(v){
      this.BoxShow = true
      document.body.style.overflow='hidden';
      document.body.style.height='100%';
    },
    confimOpen(){
      this.BoxShow = false
    },
    passwordInit(v){
      this.editBoxShow = true
      document.body.style.overflow='hidden';
      document.body.style.height='100%';
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
    .messagebox{
      position: absolute;
      top:0;
      left:0;
      height:100%;
      z-index: 9999;
      background: rgba(0,0,0,0.40);
      width:100%;
      .messagecont{
        overflow:hidden;
        position:absolute;
        top:50%;
        margin-top:-100px;
        left:50%;
        margin-left: -200px;
        background:#fff;
        border-radius: 4px;
        height:200px;
        width:400px;
        text-align: center;
        span{
          overflow: hidden;
          display: inline-block;
        }
        .count{
          margin-top: 50px;
          font-family: "Microsoft YaHei";
          font-size: 14px;
          color: #000000;
          font-weight:bold;
        }
        .decrite{
           margin-top: 20px;
          font-weight:bold;
        }
        .btnAA{
          float: left;
          width:80px;
          height:30px;
          margin-top:30px;
          line-height: 30px;
        }
        .btnAAS{
          background: #2D78B3;
          border-radius: 4px;
          margin-right:20px;
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
      }
    }
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
      overflow: hidden;
      border-bottom: 1px solid #E0E0E0;
       position:relative;
      .img{
        width:36px;
        height:36px;
        vertical-align: middle;
        background:red;
      }
      .operation{
        text-align: right;
        div{
          display:inline-block;
          cursor: pointer;
          color:#2D78B3;
          margin-right: 22px;
         
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
