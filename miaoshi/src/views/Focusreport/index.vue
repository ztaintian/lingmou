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
          <input class="nameipt" v-model="storeName" >
        </div>
        <div class="salereport">
          <span class="time twoTime">售点报告编号:</span>
          <input class="nameipt ml3"   v-model="reportNumber" type="" name="">
        </div>
        <div class="salereport">
          <span class="time twoTime" style="width:56px;">线路:</span>
          <input class="nameipt ml5"   v-model="lineNumber" type="" name="">
        </div>
      </div>
      <div class="sameBlock" style="margin-left:-26px;">
        <div class="salereport">
          <span class="time twoTimeTwo" style="width:70px;">任务类型:</span>
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
          <input class="nameipt ml5"   v-model="groupNumber" type="" name="">
        </div>
        <span class="search" @click="Brush">筛选</span>
      </div>
    </div>
    <div style="height:44px;line-height:44px;text-align: right;float: right;margin-right:28px;cursor:pointer;width:90px;" @click="exportFile">
      <img :src="exportUrl" alt="" style="margin-top:-2px;vertical-align:middle;"><span style="display:inline-block;color: #2D78B3;">导出Excel</span>
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
        <div class="W170 publicCss">{{v.created_at|dataForm}}</div>
        <div class="W100 publicCss">{{v.store_report_number}}</div>
        <div class="W150 publicCss" style="width: 150px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{v.storename}}</div>
        <div class="W70 publicCss">{{v.group_number}}</div>
        <div class="W70 publicCss">{{v.line_number}}</div>
        <div class="W80 publicCss">{{v.sku_total_num}}</div>
        <div class="W80 publicCss">{{v.sku_necessary_num_act}}/{{v.sku_necessary_num}}</div>
        <div class="W80 publicCss">{{v.sku_important_num_act}}/{{v.sku_important_num}}</div>
        <div class="W90 publicCss">{{v.purity}}%</div>
        <div class="W90 publicCss">{{v.saturation}}%</div>
        <div class="W70 publicCss">{{v.scene_num}}</div>
        <div class="W70 publicCss">{{v.status==0?'进行中':'完成'}}</div>
      </div>
    </div>
    <Pages :totlePages.sync="totleNums" v-if="totleNums/20>1" :nowPages.sync="nowNum"></Pages>
  </div>
</template>

<script>
import iconradio from '@/assets/ic_not selected@1x.png'
import iconradioActive from '@/assets/ic_selected@1x.png'
import Pages from '@/components/pages'
import exporticon from '@/assets/ic_import@1x.png'
export default {
  name: 'Focusreport',
  components:{Pages},
  data () {
    return {
      exportUrl:exporticon,
      clickBrush:false,
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
      statusList:['全部','计划','临时'],
      all:true,
      compent:false,
      ing:false,
      reportNumber:'',
      statusVal:'',
      tableList:[],
      time1:'',
      time2:'',
      reportNumber:'',
      lineNumber:'',
      groupNumber:'',
      storeName:''
    }
  },
  mounted(){
    this.getAjaxList(`${this.api}/store-report/index?page=${this.nowNum}&per-page=20`)
  },
  watch:{
    nowNum(){
      if(this.clickBrush){
        if(this.statusVal == '临时'){
          this.num_type_id = 1
        }else if(this.statusVal == '计划'){
          this.num_type_id = 0
        }else if(this.statusVal == '全部' || this.statusVal == ''){
          this.num_type_id = ''
        }
        this.getAjaxList(`${this.api}/store-report/index?page=${this.nowNum}&per-page=20&starttime=${this.time1}&endtime=${this.time2}&store_report_number=${this.reportNumber}&task_type=${this.num_type_id}&group_number=${this.groupNumber}&line_number=${this.lineNumber}&store_name=${this.storeName}`)
      }else{
        this.getAjaxList(`${this.api}/scene-report/index?page=${this.nowNum}&per-page=20`)
      }
    }
  },
  methods:{
    exportFile(){
      window.location.href = `${this.apiLoad}/store-report/export-excel`
    },
    getDate(num){
      var nowDate = new Date().getTime()-24*60*60*1000
      var nowDatelast = new Date().getTime()-24*60*60*1000*num
      this.dataTime = new Date(nowDatelast).getFullYear()+'-'+(new Date(nowDatelast).getMonth()+1)+'-'+new Date(nowDatelast).getDate()+' 00:00:00'
      this.dataTime2 = new Date(nowDate).getFullYear()+'-'+(new Date(nowDate).getMonth()+1)+'-'+new Date(nowDate).getDate()+' 23:59:59'
    },
    Brush(){//刷选
      this.clickBrush = true
      this.time1 = this.dataTime?(new Date(this.dataTime).getTime())/1000:''
      this.time2 = this.dataTime2?(new Date(this.dataTime2).getTime())/1000:''
      if(this.statusVal == '临时'){
        this.num_type_id = 1
      }else if(this.statusVal == '计划'){
        this.num_type_id = 0
      }else if(this.statusVal == '全部' || this.statusVal == '' ){
        this.num_type_id = ''
      }
      this.nowNum = '1'
      this.getAjaxList(`${this.api}/store-report/index?page=${this.nowNum}&per-page=20&starttime=${this.time1}&endtime=${this.time2}&store_report_number=${this.reportNumber}&task_type=${this.num_type_id}&group_number=${this.groupNumber}&line_number=${this.lineNumber}&store_name=${this.storeName}`)

    },
    getAjaxList(url){
      var that  = this
      this.Axios.get(url)
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
      // this.$router.push(`/home/pointofsaledetails?id=${v.id}`)
      window.open(`${this.api}/index.html#/home/pointofsaledetails?id=${v.id}`)
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
      margin:24px 0 0 24px;
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
        .ml3{
          margin-left:3px;
        }
        .search{
          display:inline-block;
          float: right;
          cursor:pointer;
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
