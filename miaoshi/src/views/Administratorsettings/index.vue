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
        <div class="W160 publicCss">{{v.username}}</div>
        <div class="W200 publicCss">{{v.loginip}}</div>
        <div class="W200 publicCss">{{v.updated_at|dataForm}}</div>
        <div class="W200 publicCss">{{v.created_at|dataForm}}</div>
        <div :class="[v.status==0?'redColor':'greenColor','W120 publicCss']">{{v.status==0?'已拉黑':'正常'}}</div>
        <div class="W240 publicCss operation">
          <span @click="edit(v)">编辑</span>
          <span @click="firbid(v)">{{v.status==0?'启用':'禁用'}}</span>
        </div>
        <div class="messagebox" v-show="v.editBoxShow" @click="v.editBoxShow=false">
        </div>
        <div class="messagecont"  v-show="v.editBoxShow">
          <div class="addGY">
            编辑管理员
          </div>
          <div class="use">
            <input  v-model="v.username" disabled="disabled" :class="[editAccountFlag?'linelast':'']" type="" name="" placeholder="用户名">
          </div>
          <div class="use">
            <input type="password"  :class="[editPassFlag?'linelast':'']"   v-model="editPass" name="" placeholder="密码">
          </div>
          <div @click="save(v)" :class="[editBntIf?'bntlast':'bnt','addPublic']">
            保存
          </div>
        </div>
      </div>
    </div>
    <Pages v-if="totleNums/20>1?true:false" :totlePages.sync="totleNums" :nowPages.sync="nowNum"></Pages>
    <div class="messagebox" v-if="boxShow" @click="boxShow=false">
    </div>
    <div class="messagecont" v-if="boxShow">
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
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import Pages from '@/components/pages'

export default {
  name: 'Administratorsettings',
  components:{Pages},
  data () {
    return {
      totleNums:1,
      nowNum:'1',
      hookUrl:hookicon,
      tableList:[],
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
      editAccountFlag:true,
      editPassFlag:false
    }
  },
  mounted(){
    this.getAjaxList()
  },
  methods:{
    getAjaxList(){
      var that  = this
      this.Axios.get(`/api/y2/frontend/web/index.php?r=user/adminlist&page=${this.nowNum}&per-page=20`)
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.editBoxShow = false
        })
        that.tableList = data.data.data
        that.totleNums = data.data.pagelist.count
        that.nowNum = data.data.pagelist.page
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    firbidAjax(url,id){
      var that = this
      this.Axios.post(url,{id:id})
      .then(function (data) {
        that.getAjaxList()
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    firbid(v){//'启用':'禁用'
      console.log(v)
      if(v.status == 0){
        this.firbidAjax(`/api/y2/frontend/web/index.php?r=user/adminopen`,v.id)
      }else{
        this.firbidAjax(`/api/y2/frontend/web/index.php?r=user/admindel`,v.id)
      }
    },
    edit(v){//编辑
      this.editAccount = '';
      this.editPass = '';
      v.editBoxShow = true
    },
    addAdmin(){//添加管理员
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
    addsuccess(){//添加管理员账号
      if(this.bntIf){
        var that  = this
        this.Axios.post(`/api/y2/frontend/web/index.php?r=user/adminadd`,{username:this.account,password:this.pass})
        .then(function (data) {
          that.boxShow = false
          that.getAjaxList()
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    editIfBnt(){
      if(this.editAccountFlag && this.editPassFlag){
        this.editBntIf = true
      }else{
        this.editBntIf = false
      }
    },
    save(v){//编辑管理员保存
      if(this.editBntIf){
        var that  = this
        this.Axios.post(`/api/y2/frontend/web/index.php?r=user/adminupdate`,{id:v.id,password:this.editPass})
        .then(function (data) {
          v.editBoxShow = false
          that.getAjaxList()
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  },
  watch:{
    nowNum(){
      this.getAjaxList()
    },
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
      position: fixed;
      top:0;
      left:0;
      height:100%;
      z-index: 3333;
      background: rgba(0,0,0,0.40);
      width:100%;
    }
    .messagecont{
        overflow:hidden;
        position:fixed;
        top:50%;
        margin-top:-127px;
        left:50%;
        z-index: 5555;
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
      box-sizing:border-box;
      padding-bottom: 30px;
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
      .redColor{
        color:#D61E2A;
      }
      .greenColor{
        color:#3DB866;
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
