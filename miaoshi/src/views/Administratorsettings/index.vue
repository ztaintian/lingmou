<template>
  <div class="administratorsettings">
    <div class="adminset">
      管理员设置
    </div>
    <div class="addadmin" @click="addAdmin">
      添加管理员
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
          <span @click="edit(v)">编辑</span>
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
    <div class="messagebox" v-if="boxShow">
      <div class="messagecont">
        <div class="addGY">
          添加管理员
        </div>
        <div class="use">
          <input  v-model="account"  :class="[accountFlag?'linelast':'']" type="" name="" placeholder="用户名">
        </div>
        <div class="use">
          <input type="password"  :class="[passFlag?'linelast':'']"   v-model="pass" name="" placeholder="密码">
        </div>
        <div @click="addsuccess" :class="[bntIf?'bntlast':'bnt','addPublic']">
          添加
        </div>
      </div>
    </div>
    <div class="messagebox" v-if="editBoxShow">
      <div class="messagecont">
        <div class="addGY">
          编辑管理员
        </div>
        <div class="use">
          <input  v-model="editAccount"  :class="[editAccountFlag?'linelast':'']" type="" name="" placeholder="用户名">
        </div>
        <div class="use">
          <input type="password"  :class="[editPassFlag?'linelast':'']"   v-model="editPass" name="" placeholder="密码">
        </div>
        <div @click="save" :class="[editBntIf?'bntlast':'bnt','addPublic']">
          保存
        </div>
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
  name: 'Administratorsettings',
  data () {
    return {
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      hookUrl:hookicon,
      tableList:[{showBc:false},{showBc:false},{showBc:false}],
      boxShow:false,
      account:'',
      pass:'',
      bntIf:false,
      accountFlag:false,
      passFlag:false,
      editBoxShow:false,
      editAccount:'',
      editPass:'',
      editBntIf:false,
      editAccountFlag:false,
      editPassFlag:false

    }
  },
  methods:{
    edit(){
      this.editAccount = '';
      this.editPass = '';
      this.editBoxShow = true
      document.body.style.overflow='hidden';
      document.body.style.height='100%';
    },
    addAdmin(){
      this.account = '';
      this.pass = '';
      this.boxShow = true
      document.body.style.overflow='hidden';
      document.body.style.height='100%';
    },
    ifBnt(){
      if(this.accountFlag && this.passFlag){
        this.bntIf = true
      }else{
        this.bntIf = false
      }
    },
    addsuccess(){
       this.boxShow = false
       document.body.style.overflow='scroll';
       document.body.style.height='100%';
    },
    editIfBnt(){
      if(this.editAccountFlag && this.editPassFlag){
        this.editBntIf = true
      }else{
        this.editBntIf = false
      }
    },
    save(){
       this.editBoxShow = false
       document.body.style.overflow='scroll';
       document.body.style.height='100%';
    }
  },
  watch:{
    account:function(val){
      if(val==null || val==undefined || val==''){
        this.accountFlag = false
        this.accountShow = ''
      }else{
        this.accountFlag = true
      }
      this.ifBnt()
    },
    pass:function(val){
      if(val==null || val==undefined || val==''){
        this.passFlag = false
        this.passShow = ''
      }else{
        this.passFlag = true
      }
      this.ifBnt()
    },
    editAccount:function(val){
      if(val==null || val==undefined || val==''){
        this.editAccountFlag = false
        this.editAccountShow = ''
      }else{
        this.editAccountFlag = true
      }
      this.editIfBnt()
    },
    editPass:function(val){
      if(val==null || val==undefined || val==''){
        this.editPassFlag = false
        this.editPassShow = ''
      }else{
        this.editPassFlag = true
      }
      this.editIfBnt()
    }
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
        margin-top:-127px;
        left:50%;
        margin-left: -260px;
        .addGY{
          font-family: MicrosoftYaHei;
          margin:0 auto;
          width:102px;
          height:26px;
          line-height:26px;
          margin-top:30px;
          font-size: 20px;
          color: #000000;
          font-weight:bold;
        }
        .addPublic{
          background: #C1C7CC;
          border-radius: 4px;
          width:100px;
          height:30px;
          margin:0 auto;
          margin-top:20px;
          text-align: center;
          line-height:30px;
          color:#FFFFFF;
        }
        .bntlast{
          background:#324656;
          cursor:pointer;
        }
        .use{
          input{
            width:320px;
            padding:9px 0;
            margin:10px 100px;
            border: none;
            outline: none;
            font-size:14px;
            border-bottom: 1px solid #D8D8D8;
          }
          .linelast{
            border-bottom:2px solid #2D78B3;
          }
        }
        background:#fff;
        border-radius: 4px;
        height:254px;
        width:520px;
      }
    }
    .addadmin{
      float: right;
      width:100px;
      height:30px;
      line-height: 30px;
      margin:29px 24px 0 0;
      text-align: center;
      background: #2D78B3;
      border-radius: 4px;
      cursor:pointer;
      color:#fff;
    }
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
