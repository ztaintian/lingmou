<template>
  <div class="mustsku">
    <div style="overflow:hidden;position:fixed;background:#fff;z-index:888;width:100%;">
      <div style="float: left;margin-top: 30px; margin-left:30px; ">
        渠道：
      </div>
      <div class="dataImg" style="float: left;margin-top: 27px;">
        <img  :src="yestoday?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(1)"><span class="radioText">全部</span>
        <div v-for="v in topList" style="display:inline-block;">
          <img :src="v.lastSeven?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(v)"><span class="radioText">{{v.typename}}</span>
        </div>
       <!--  <img :src="lastMounth?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(3)"><span class="radioText">便利店</span>
        <img :src="lastLast?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(4)"><span class="radioText">烟酒行</span> -->
      </div>
    </div>
    <div style="font-size: 18px;color: #000000;margin-left:28px;margin-top: 90px;">
      <span>必备SKU</span><span style="float: right;margin-right:22px;height:30px;line-height: 30px;text-align: center;display:inline-block;background:#4285BA;width:100px;border-radius: 4px;color:#fff;font-size:14px;" >添加</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W100 publicCss">序号</div>
        <div class="W120 publicCss">类名</div>
        <div class="W360 publicCss">适用渠道</div>
        <div class="W300 publicCss">包含SKU</div>
        <div class="W140 publicCss">创建时间</div>
        <div class="W100 publicCss">操作</div>
      </div>
      <div class="imgMain" style="height:354px;overflow-y:scroll;overflow-x: hidden;border-bottom:1px solid #eee;">
        <div v-for="(v,index) in tableList" @mouseenter="enter(v)" @mouseleave="leave(v)" :class="[v.showBc?'tablelistBc':'','tablelist']" >
          <div class="W100" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">{{v.id}}</div>
          <div class="W120" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">{{v.g_name}}</div>
          <div class="W360 publicCss title"><span v-for="(vc,indexc) in v.storeType">{{vc.typename}}<span v-if="(indexc+1) !=v.storeType.length">、</span></span></div>
          <div class="W300" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;"><span v-for="(vcc,indexccc) in v.skus">{{vcc.sku_name}}<span v-if="(indexccc+1) !=v.skus.length">、</span></span></div>
          <div class="W140" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">{{v.created_at|dataFormYMD}}</div>
          <div class="W100 publicCss"><span style="display:inline-block;width:50px;text-align: center;color:#2D78B3;cursor: pointer;" @click="modify(v)">修改</span><span style="width:50px;text-align: center;display:inline-block;color:#D61E2A ;cursor: pointer;" @click="del(v)">删除</span>
            <div v-if="v.openShow" class="messageBox">
              <img class="img1" :src="sanjiaoUrl" alt="">
              <div class="count">
                确认删除”{{v.g_name}}”？
              </div>
              <div class="decrite">
                删除该必备/重点SKU后，之后的售点报告将立即按新的标准执行，在此之前已生成的售点报告仍沿用之前的标准不受影响。
              </div>
              <div @click="confimOpen(v)" class="btnAA btnAAS">
                 确定
              </div>
              <div @click="canlve(v)" class="btnAA btnAAC">
                 取消
              </div>
            </div>
          </div>
          <div class="messagebox" v-if="v.editBoxShow"></div>
          <div class="messagecont" v-if="v.editBoxShow">
            <div class="addGY">
              修改提示
            </div>
            <div class="use">
              修改该必备/重点SKU后，之后的售点报告将立即按新的标准执行，在此之前已生成的售点报告仍沿用之前的标准不受影响。
            </div>
            <div style="margin-top:30px;">
              <span class="confim ml150" @click="confimAdd(v)">确认</span><span class="confim ml20" @click="canverAdd(v)">取消</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div style="font-size: 18px;color: #000000;margin-left:28px;margin-top: 30px;">
      <span>重点SKU类</span><span style="float: right;margin-right:22px;height:30px;line-height: 30px;text-align: center;display:inline-block;background:#4285BA;width:100px;border-radius: 4px;color:#fff;font-size:14px; cursor:pointer;" @click="addSKU(1)">添加</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W100 publicCss">序号</div>
        <div class="W120 publicCss">类名</div>
        <div class="W360 publicCss">适用渠道</div>
        <div class="W300 publicCss">包含SKU</div>
        <div class="W140 publicCss">创建时间</div>
        <div class="W100 publicCss">操作</div>
      </div>
      <div class="imgMain" style="height:354px;overflow-y:scroll;overflow-x: hidden;border-bottom:1px solid #eee;">
        <div v-for="(v,index) in importTableList"  @mouseenter="enter(v)" @mouseleave="leave(v)" :class="[v.showBc?'tablelistBc':'','tablelist']" >
          <div class="W100" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">{{v.id}}</div>
          <div class="W120" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">{{v.g_name}}</div>
          <div class="W360 publicCss title"><span v-for="(vc,indexc) in v.storeType">{{vc.typename}}<span v-if="(indexc+1) !=v.storeType.length">、</span></span></div>
          <div class="W300" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;display:flex;"><span v-for="(vcc,indexccc) in v.skus">{{vcc.sku_name}}<span v-if="(indexccc+1) !=v.skus.length">、</span></span></div>
          <div class="W140" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">2019-12-12 23:45</div>
          <div class="W100 publicCss"><span @click="modify(v)" style="display:inline-block;width:50px;text-align: center;color:#2D78B3;cursor: pointer;">修改</span><span style="width:50px;text-align: center;display:inline-block;color:#D61E2A ;cursor: pointer;" @click="del(v)">删除</span>
            <div v-if="v.openShow" class="messageBox">
              <img class="img1" :src="sanjiaoUrl" alt="">
              <div class="count">
                确认删除”{{v.username}}”？
              </div>
              <div class="decrite">
                删除该必备/重点SKU后，之后的售点报告将立即按新的标准执行，在此之前已生成的售点报告仍沿用之前的标准不受影响。
              </div>
              <div @click="confimOpen(v)" class="btnAA btnAAS">
                 确定
              </div>
              <div @click="canlve(v)" class="btnAA btnAAC">
                 取消
              </div>
            </div>
          </div>
          <div class="messagebox" v-if="v.editBoxShow"></div>
          <div class="messagecont" v-if="v.editBoxShow">
            <div class="addGY">
              修改提示
            </div>
            <div class="use">
              修改该必备/重点SKU后，之后的售点报告将立即按新的标准执行，在此之前已生成的售点报告仍沿用之前的标准不受影响。
            </div>
            <div style="margin-top:30px;">
              <span class="confim ml150" @click="confimAdd(v)">确认</span><span class="confim ml20" @click="canverAdd(v)">取消</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import Pages from '@/components/pages'
import iconradio from '@/assets/ic_not selected@1x.png'
import iconradioActive from '@/assets/ic_selected@1x.png'
import sanjiao from '@/assets/sj@1x.png'
export default {
  name: 'Mustsku',
  components:{Pages},
  data () {
    return {
      sanjiaoUrl:sanjiao,
      yestoday:true,
      lastSeven:false,
      lastMounth:false,
      lastLast:false,
      radioimgUrl:iconradio,
      radioaimgUrl:iconradioActive,
      totleNums:0,
      nowNum:'1',
      hookUrl:hookicon,
      tableList:[],
      importTableList:[],
      topList:[],
      topId:''
    }
  },
  mounted(){
    this.getAjaxListTop()
    this.getAjaxListMust(this.topId)
    this.getAjaxListImport(this.topId)
  },
  watch:{
    nowNum(){
      this.getAjaxList()
    }
  },
  filters:{
    dataFormYMD(date){
      if(date == null || date == '' || date == 0){
        return ''
      }else{
        var d = new Date(Number(date)*1000);
        var year = d.getFullYear();
        var month = d.getMonth() + 1<10?'0' + (d.getMonth() + 1) :d.getMonth() + 1;
        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours() <10 ? '0'+d.getHours(): '' + d.getHours();
        var minutes = d.getMinutes()<10?'0' + d.getMinutes() : '' + d.getMinutes();
        var seconds = d.getSeconds()<10?'0' + d.getSeconds() : '' + d.getSeconds();;
        return year+ '-' + month + '-' + day+' ' + hour + ':' + minutes
      }
    }
  },
  methods:{
    enter(v){
      v.showBc = true
    },
    leave(v){
      v.showBc = false
    },
    confimAdd(v){
     
    },
    canverAdd(v){
      v.editBoxShow = false
    },
    modify(v){
      console.log(v)
      v.editBoxShow = true
    },
    addSKU(num){
      this.$router.push('/home/addSKU')
      console.log(num)
    },
    confimOpen(v){
      var that  = this
      this.Axios.post(`${this.api}/sku/del`,{id:v.id})
      .then(function (data) {
        v.openShow =false
        that.getAjaxListMust(that.topId)
        that.getAjaxListImport(that.topId)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    allHidden(){
      for(var i=0;i<this.tableList.length;i++){
        this.tableList[i].tipShow = false
        this.tableList[i].openShow = false
        this.tableList[i].editBoxShow = false
      }
    },
    canlve(v){
      v.openShow = false
    },
    del(v){
      this.allHidden()
      v.openShow = true

    },
    choiceData(v){
      if(v === 1){
        this.yestoday = true
        for(var i=0; i<this.topList.length;i++){
          this.topList[i].lastSeven = false
        }
        this.topId = ''
        this.getAjaxListMust(this.topId)
        this.getAjaxListImport(this.topId)
      }else{
        this.yestoday = false
        for(var i=0; i<this.topList.length;i++){
          this.topList[i].lastSeven = false
        }
        v.lastSeven =true
        this.topId = v.id
        this.getAjaxListMust(this.topId)
        this.getAjaxListImport(this.topId)
      }
    },
    getAjaxListTop(){
      var that  = this
      this.Axios.post(`${this.api}/sku/store-type`)
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.lastSeven = false
        })
        that.topList = data.data.data
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getAjaxListMust(type_id){
      var that  = this
      this.Axios.post(`${this.api}/sku/bb-sku`,{type_id:type_id})
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.openShow =false
          val.showBc =false
          val.editBoxShow =false
        })
        that.tableList = data.data.data
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getAjaxListImport(type_id){
      var that  = this
      this.Axios.post(`${this.api}/sku/zd-sku`,{type_id:type_id})
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.openShow =false
          val.showBc =false
          val.editBoxShow =false
        })
        that.importTableList = data.data.data
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss">
  .mustsku{
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
      background: rgba(0,0,0,0.4);
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
          margin:30px 0 25px 0;
          font-size: 20px;
          color: #000000;
          text-align: center;
          letter-spacing: 0;
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
          width:414px;
          margin:0 auto;
          line-height:25px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
        }
        .confim{
          cursor:pointer;
          text-align: center;
          line-height:30px;
          font-family: PingFangSC-Regular;
          color: #FFFFFF;
          background: #2D78B3;
          border-radius: 4px;
          display:inline-block;
          width:100px;
          height:30px;
        }
        .ml150{
          margin-left:150px;
        }
        .ml20{
          margin-left:20px;
        }
        background:#fff;
        border-radius: 4px;
        height:211px;
        width:520px;
    }
    .dataImg{
      display: inline-block;
      margin-left: 10px;
      img{
        vertical-align: middle;
        cursor:pointer;
      }
      .radioText{
        margin-right: 20px;
      }
    }
    .table{
      border:1px solid #eee;
      margin:16px auto 0;
      width:1122px;
      border-radius: 4px;
      margin-bottom: 30px;
      border-bottom: 0;
      box-sizing:border-box;
      
      min-height:40px;
      .Theaded{
        overflow:hidden;
        color: #000000;
        font-weight:bold;
        border-radius: 4px;
        background: #F5F5F5;
        line-height:40px;
      }
      overflow:hidden;
      vertical-align: middle;
      .publicCss{
        display:inline-block;
        float: left;
        min-height:40px;
        line-height:40px;
        text-align: center;
        vertical-align: middle;
        color: #000000;
      }
      .blueClocor{
        color:#3DB866;
      }
      .redClocor{
        color:#D61E2A;
      }
    }
    .imgMain::-webkit-scrollbar{
      width: 4px;
      height:4px;
      background-color: #fff;
    }
    .imgMain::-webkit-scrollbar-thumb{
      background:#ccc;
      border-radius: 3px;
    }
    .tablelist{
      position:relative;
      .messageBox{
        position:absolute;
        z-index:777;
        width:360px;
        height:190px;
        background:#000;
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
        border-radius: 4px;
        top:52px;
        right:2px;
        text-align: center;
      }


        .secrit{
          display:inline-block;
          cursor: pointer;
          color:#2D78B3;
          margin-right: 22px;
        }
        .count{
          font-family: "Microsoft YaHei";
          font-size: 16px;
          color: #000000;
          font-weight:bold;
          margin:20px 0 15px 0;
          line-height:20px;
        }
        .decrite{
          font-weight:bold;
          width:288px;
          margin:0 auto;
          line-height:20px;
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
          margin-left:90px;
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
      .img1{
        position:absolute;
        top:-9px;
        right:30px;
      }
      display:flex;
      width:1122px;
      align-items:center;
      min-height:40px;
      border-bottom: 1px solid #E0E0E0;
    }
    .tablelistBc{
      background: #F5F5F5;
    }

  }
</style>
