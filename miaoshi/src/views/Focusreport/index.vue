<template>
  <div class="focusreport">
    <div class="screen">
      <div class="sameBlock">
        <span class="time twoTimeTwo" >时间:</span>
        <el-date-picker
          v-model="dataTime"
          type="datetime"
          :clearable='false'
          :editable = 'false'
          placeholder="选择日期时间">
        </el-date-picker>
        <span class="to">至</span>
        <el-date-picker
          v-model="dataTime2"
          type="datetime"
          :editable = 'false'
          :clearable='false'
          placeholder="选择日期时间">
        </el-date-picker>
        <div class="dataImg">
          <img  :src="yestoday?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(1)"><span class="radioText">昨日</span>
          <img :src="lastSeven?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(2)"><span class="radioText">近7天</span>
          <img :src="lastMounth?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(3)"><span class="radioText">近30天</span>
        </div>
      </div>
      <div class="sameBlock">
        <div class="salereport">
          <span class="time twoTimeTwo">售点:</span>
          <input class="nameipt" v-model="salePoint" >
        </div>
        <div class="salereport">
          <span class="time twoTime">售点报告编号:</span>
          <input class="nameipt ml5"   v-model="reportNumber" type="" name="">
        </div>
        <div class="salereport">
          <span class="time twoTime" style="width:56px;">线路:</span>
          <input class="nameipt ml5"   v-model="reportNumber" type="" name="">
        </div>
      </div>
      <div class="sameBlock">
        <div class="salereport">
          <span class="time twoTimeTwo">状态:</span>
          <el-select class="salePoint" v-model="statusVal" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="salereport">
          <span class="time twoTime">营业所:</span>
          <input class="nameipt ml5"   v-model="reportNumber" type="" name="">
        </div>
        <span class="search">刷选</span>
      </div>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W170 publicCss">时间</div>
        <div class="W100 publicCss">售点报告编号</div>
        <div class="W150 publicCss">售点</div>
        <div class="W70 publicCss">营业所</div>
        <div class="W70 publicCss">线路</div>
        <div class="W80 publicCss">售点SKU</div>
        <div class="W80 publicCss">必备SKU</div>
        <div class="W80 publicCss">重点SKU</div>
        <div class="W90 publicCss">冰柜纯净度</div>
        <div class="W90 publicCss">冰柜饱和度</div>
        <div class="W70 publicCss">场景数</div>
        <div class="W70 publicCss">状态</div>
      </div>
      <div v-for="(v,index) in tableList" @mouseenter="enter(v,index)" @mouseleave="leave(v,index)" :class="[v.showBc?'tablelistBc':'','tablelist']" @click="pointofsaledetails(v)" >
        <div class="W170 publicCss">2017-12-20  23:49:59</div>
        <div class="W100 publicCss">99990000222</div>
        <div class="W150 publicCss">快客便利店(徐汇区店…</div>
        <div class="W70 publicCss">888999</div>
        <div class="W70 publicCss">000</div>
        <div class="W80 publicCss">19</div>
        <div class="W80 publicCss">12/20</div>
        <div class="W80 publicCss">11/23</div>
        <div class="W90 publicCss">90%</div>
        <div class="W90 publicCss">11%</div>
        <div class="W70 publicCss">99</div>
        <div class="W70 publicCss">进行中</div>
      </div>
    </div>
    <Pages :totlePages.sync="totleNums" v-if="totleNums/20>1" :nowPages.sync="nowNum"></Pages>
  </div>
</template>

<script>
import iconradio from '@/assets/ic_not selected@1x.png'
import iconradioActive from '@/assets/ic_selected@1x.png'
import Pages from '@/components/pages'
export default {
  name: 'Focusreport',
  components:{Pages},
  data () {
    return {
      totleNums:0,
      nowNum:'1',
      dataTime:'',
      dataTime2:'',
      radioimgUrl:iconradio,
      radioaimgUrl:iconradioActive,
      yestoday:false,
      lastSeven:false,
      lastMounth:false,
      salePoint:'',
      salePointList:['快客','全家'],
      statusList:['全部','已完成','进行中'],
      all:true,
      compent:false,
      ing:false,
      reportNumber:'',
      statusVal:'',
      tableList:[{showBc:false},{showBc:false},{showBc:false}]
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
      this.Axios.get(`${this.api}/y2/frontend/web/index.php?r=scene-report/index&page=${this.nowNum}&per-page=20`)
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.showBc = false
        })
        that.tableList = data.data.data
        that.totleNums = data.data.pagelist.count
        that.nowNum = data.data.pagelist.page
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    pointofsaledetails(v){
      var aa =11
      this.$router.push(`/home/pointofsaledetails?aa=${aa}`)
    },
    enter(v,index){
      for(var i=0;i<this.tableList.length;i++){
        this.tableList[i].showBc = false
      }
      v.showBc = true
    },
    leave(v,index){
      for(var i=0;i<this.tableList.length;i++){
        this.tableList[i].showBc = false
      }
    },
    getDate(num){
      var nowDate = new Date().getTime()-24*60*60*1000
      var nowDatelast = new Date().getTime()-24*60*60*1000*num
      this.dataTime = new Date(nowDatelast).getFullYear()+'-'+new Date(nowDatelast).getMonth()+'-'+new Date(nowDatelast).getDate()+' 00:00:00'
      this.dataTime2 = new Date(nowDate).getFullYear()+'-'+new Date(nowDate).getMonth()+'-'+new Date(nowDate).getDate()+' 23:59:59'
    },
    choiceData(num){
      if(num === 1){
        this.yestoday = true
        this.lastSeven = false
        this.lastMounth = false
        this.getDate(num)
      }else if(num === 2){
        this.yestoday = false
        this.lastSeven = true
        this.lastMounth = false
        this.getDate(7)
      }else{
        this.yestoday = false
        this.lastSeven = false
        this.lastMounth = true
        this.getDate(30)
      }
    },
    choiceStates(num){
      if(num === 1){
        this.all = true
        this.compent = false
        this.ing = false
      }else if(num === 2){
        this.all = false
        this.compent = true
        this.ing = false
      }else{
        this.all = false
        this.compent = false
        this.ing = true
      }
    }
  }
}
</script>

<style lang="scss">
  .focusreport{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .screen{
      width:1090px;
      background: #F5F5F5;
      border-radius: 4px;
      margin:24px 0 20px 24px;
      padding:20px 0 4px 30px;
      .sameBlock{
        margin-bottom: 16px;
        overflow:hidden;
        .nameipt{
          width:200px;
          height:26px;
          background: #FFFFFF;
          border: 1px solid #E0E0E0;
          border-radius: 5px;
          color: #333333;
        }
        .ml5{
          margin-left:5px;
        }
        .search{
          display:inline-block;
          float: right;
          background: #2D78B3;
          border-radius: 4px;
          height:30px;
          width:60px;
          color:#FFFFFF ;
          text-align: center;
          line-height: 30px;
          margin-right:30px;
        }
        .salereport{
          float: left;
          margin-right:60px;
        }
        .salePoint{
          width:200px;
          .focusreport .screen .el-input__icon:after{
            content:'';
          }
          .el-icon-caret-top:before{
            content:'';
          }
        }
        .statusText{
          font-size: 14px;
          color: #000000;
          font-weight: bold;
          margin-left:60px;
          margin-right:8px;
        }
        .sataus{
          display:inline-block;
          .radioText{
            margin-right:20px;
          }
          img{
            vertical-align: middle;
          }
        }
      }
      .time{
        color:#000000;
        font-size:14px;
        font-weight: bold;
      }
      .twoTime{
        font-family: 'Microsoft YaHei';
        display:inline-block;
        width:98px;
        height:20px;
        text-align:right;
      }
      .W40{
        width:40px;
      }
      .twoTimeTwo{
        font-family: 'Microsoft YaHei';
        display:inline-block;
        width:42px
      }
      .el-date-editor.el-input{
        width:200px;
      }
      .el-input__inner{
        height:30px;
      }
      .el-input__icon:after{
        content:'';
      }
      .el-input__icon:before{
        content:'';
      }
      .el-icon-time{
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIBJREFUSA3tklEKwCAMQ93YkXsM77zNz9VnK3SFDRT8aGqaJljKOp9OoNZ6tjta0us33j4iv4VvepC1sX5LtYg8ZqY7SBfoXEYiIm66A1NAf0Ov7uK4AVOACGGMcpwdStx0B6aAl7nuk1NTgAhhjHKcHUrcdAcHbUeb0LuF/SOBC6IJQL9DepUnAAAAAElFTkSuQmCC) no-repeat center;
      }
      .el-input__icon{
        right:10px;
      }
      .to{
        margin:0 8px;
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
    }
    .table{
      margin:0 auto;
      width:1120px;
      padding-bottom: 30px;
      box-sizing:border-box;
      .W170{
        width:170px;
      }
      .W100{
        width:100px;
      }
      .W160{
        width:160px;
      }
      .W90{
        width:90px;
      }
      .W70{
        width:70px;
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
      cursor: pointer;
      border-bottom: 1px solid #E0E0E0;
    }
    .tablelistBc{
      background: #F5F5F5;
    }
  }
</style>
