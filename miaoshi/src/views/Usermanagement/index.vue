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
        <div class="W160 publicCss">{{v.username}}</div>
        <div class="W200 publicCss">{{v.updated_at|dataForm}}</div>
        <div class="W200 publicCss">{{v.creaetd_at|dataForm}}</div>
        <div :class="[v.is_initial == 0?'redColor':'','W200 publicCss']">{{v.is_initial == 0?'未修改':'已修改'}}</div>
        <div :class="[v.state==0?'redColor':'greenColor','W120 publicCss']">{{v.state==0?'已禁用':'已启用'}}</div>
        <div class="W240 publicCss operation" style="position:relative;">
          <div class="secrit" @click="passwordInit(v)">密码初始化</div>
          <div v-if="v.tipShow" class="messageBox ml76">
            <img class="img" :src="sanjiaoUrl" alt="">
            <div class="count">
              账号：{{v.username}}
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
              账号：{{v.username}}
            </div>
            <div class="decrite">
              确定禁用该帐号？
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
      <div style="height:60px;">
        <Pages style="margin-top:30px;" v-if="totleNums/20>1?true:false" :totlePages.sync="totleNums" :nowPages.sync="nowNum"></Pages>
      </div>
    </div>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import sanjiao from '@/assets/sj@1x.png'
import Pages from '@/components/pages'
export default {
  name: 'Usermanagement',
  components:{Pages},
  data () {
    return {
      totleNums:0,
      nowNum:'1',
      hookUrl:hookicon,
      editBoxShow:false,
      BoxShow:false,
      countent:'',
      sanjiaoUrl:sanjiao,
      tableList:[]
    }
  },
  mounted(){
    this.getAjaxList()
  },
  watch:{
    nowNum(){
      this.getAjaxList()
    }
  },
  methods:{
    getAjaxList(){
      var that  = this
      this.Axios.get(`/api/y2/frontend/web/index.php?r=user/userlist&page=${this.nowNum}&per-page=20`)
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.showBc = false
          val.tipShow = false
          val.openShow = false
        })
        that.tableList = data.data.data
        that.totleNums = data.data.pagelist.count
        that.nowNum = data.data.pagelist.page
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    edit(){
      this.editAccount = '';
      this.editPass = '';
      this.editBoxShow = true
    },
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
      var that  = this
      this.Axios.post(`/api/y2/frontend/web/index.php?r=user/userinit`,{id:v.id})
      .then(function (data) {
        that.getAjaxList()
        v.tipShow = false
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    confimOpen(v){
      var that  = this
      this.Axios.post(`/api/y2/frontend/web/index.php?r=user/userstop`,{id:v.id})
      .then(function (data) {
        v.openShow = false
        that.getAjaxList()
      })
      .catch(function (error) {
        console.log(error);
      });
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
      padding-bottom: 30px;
      box-sizing:border-box;
      .Theaded{
        overflow:hidden;
        color: #000000;
        font-family:"Microsoft YaHei";
        font-weight: bold;
        border-radius: 4px;
        background: #F5F5F5;
      }
      clear:both;
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
