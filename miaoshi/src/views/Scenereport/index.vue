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
          <input class="nameipt" v-model="salePoint" />
        </div>
        <div class="salereport">
          <span class="time twoTime">报告编号:</span>
          <input class="nameipt ml3"   v-model="reportNumber" type="" name="">
        </div>
        <div class="salereport">
          <span class="time twoTime" style="width:56px;">线路:</span>
          <input class="nameipt ml5"   v-model="lineNumber" type="" name="">
        </div>
      </div>
      <div class="sameBlock">
        <div class="salereport">
          <span class="time twoTimeTwo">类型:</span>
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
          <input class="nameipt ml5"   v-model="SalesOffice" type="" name="">
        </div>
        <div class="salereport" style="margin-right: 50px">
          <span class="time twoTime" style="width:56px;">备注名:</span>
          <input class="nameipt ml5"   v-model="Memoname" type="" name="">
        </div>
        <span class="search" @click="Brush">筛选</span>
      </div>
    </div>
    <div style="height:44px;line-height:44px;text-align: right;float: right;margin-right:28px;cursor:pointer;width:90px;" @click="exportFile">
      <img :src="exportUrl" alt="" style="margin-top:-2px;vertical-align:middle;"><span style="display:inline-block;color: #2D78B3;">导出Excel</span>
    </div>
    <div class="table" v-if="questionFalg">
      <div class="Theaded">
        <div class="W200 publicCss">时间</div>
        <div class="W140 publicCss">场景报告编号</div>
        <div class="W200 publicCss">场景</div>
        <div class="W140 publicCss">图像数量</div>
        <div class="W200 publicCss">售点</div>
        <div class="W120 publicCss">营业所</div>
        <div class="W120 publicCss">线路</div>
      </div>
      <div v-for="(v,index) in tableList" @mouseenter="enter(v,index)" @mouseleave="leave(v,index)" @click="freezerdetails(v)" :class="[v.showBc?'tablelistBc':'','tablelist']">
        <div class="W200 publicCss">{{v.created_at|dataForm}}</div>
        <div class="W140 publicCss">{{v.scene_report_number}}</div>
        <div class="W200 publicCss">{{v.name}}</div>
        <div class="W140 publicCss">{{v.p_n}}</div>
        <div class="W200 publicCss">{{v.storename}}</div>
        <div class="W120 publicCss">{{v.group_number}}</div>
        <div class="W120 publicCss">{{v.line_number}}</div>
      </div>
    </div>
    <div class="table" v-if="!questionFalg">
      <div class="Theaded">
        <div class="W300 publicCss">时间</div>
        <div class="W240 publicCss">问卷报告编号</div>
        <div class="W300 publicCss">售点</div>
        <div class="W160 publicCss">营业所</div>
        <div class="W120 publicCss">线路</div>
      </div>
      <div v-for="(v,index) in tableList" @mouseenter="enter(v,index)" @mouseleave="leave(v,index)" @click="freezerdetails(v)" :class="[v.showBc?'tablelistBc':'','tablelist']">
        <div class="W300 publicCss">{{v.createtime|dataForm}}</div>
        <div class="W240 publicCss">{{v.scene_report_number}}</div>
        <div class="W300 publicCss">{{v.storename}}</div>
        <div class="W160 publicCss">{{v.group_number}}</div>
        <div class="W120 publicCss">{{v.line_number}}</div>
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
      questionFalg:true,
      SalesOffice:'',
      Memoname:'',
      lineNumber:'',
      clickBrush:false,
      totleNums:1,
      nowNum:'1',
      dataTime:'',
      time1:'',
      dataTime2:'',
      time2:'',
      radioimgUrl:iconradio,
      radioaimgUrl:iconradioActive,
      yestoday:false,
      lastSeven:false,
      lastMounth:false,
      salePoint:'',
      salePointList:['快客','全家'],
      statusList:['全部','冰柜','货架','堆头','问卷'],
      all:true,
      compent:false,
      ing:false,
      reportNumber:'',
      statusVal:'',
      tableList:[],
      num_type_id:''
    }
  },
  mounted(){
    this.getAjaxList(`${this.api}/scene-report/index?page=${this.nowNum}&per-page=20`)
  },
  watch:{
    nowNum(){
      if(this.clickBrush){
        if(this.statusVal == '冰柜'){
          this.num_type_id = 1
        }else if(this.statusVal == '货架'){
          this.num_type_id = 2
        }else if(this.statusVal == '堆头'){
          this.num_type_id = 3
        }else if(this.statusVal == '问卷'){
           this.num_type_id = 4
        }else if(this.statusVal == '全部'){
           this.num_type_id = ''
        }
        this.getAjaxList(`${this.api}/scene-report/index?page=${this.nowNum}&per-page=20&starttime=${this.time1}&endtime=${this.time2}&store_name=${this.salePoint}&scene_report_number=${this.reportNumber}&type_id=${this.num_type_id}&group_number=${this.SalesOffice}&line_number=${this.lineNumber}&name=${this.Memoname}`)
      }else{
        this.getAjaxList(`${this.api}/scene-report/index?page=${this.nowNum}&per-page=20`)
      }
    }
  },
  methods:{
    exportFile(){
      window.location.href = `${this.apiLoad}/scene-report/export-excel`
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
    Brush(){//刷选
      this.clickBrush = true
      this.time1 = this.dataTime?(new Date(this.dataTime).getTime())/1000:''
      this.time2 = this.dataTime2?(new Date(this.dataTime2).getTime())/1000:''
      if(this.statusVal == '冰柜'){
        this.num_type_id = 1
        this.questionFalg = true
      }else if(this.statusVal == '货架'){
        this.num_type_id = 2
        this.questionFalg = true
      }else if(this.statusVal == '堆头'){
        this.num_type_id = 3
        this.questionFalg = true
      }else if(this.statusVal == '问卷'){
        this.num_type_id = 4
        this.questionFalg = false
      }else if(this.statusVal == '全部'){
        this.num_type_id = ''
        this.questionFalg = true
      }
      this.nowNum = '1'
      this.getAjaxList(`${this.api}/scene-report/index?page=${this.nowNum}&per-page=20&starttime=${this.time1}&endtime=${this.time2}&store_name=${this.salePoint}&scene_report_number=${this.reportNumber}&type_id=${this.num_type_id}&group_number=${this.SalesOffice}&line_number=${this.lineNumber}&name=${this.Memoname}`)

    },
    getDate(num){
      var nowDate = new Date().getTime()-24*60*60*1000
      var nowDatelast = new Date().getTime()-24*60*60*1000*num
      this.dataTime = new Date(nowDatelast).getFullYear()+'-'+(new Date(nowDatelast).getMonth()+1)+'-'+new Date(nowDatelast).getDate()+' 00:00:00'
      this.dataTime2 = new Date(nowDate).getFullYear()+'-'+(new Date(nowDate).getMonth()+1)+'-'+new Date(nowDate).getDate()+' 23:59:59'
    },
    freezerdetails(v){
      if(this.questionFalg){
        console.log(v.id)
        if(v.type_id == 1){
          // this.$router.push({path:'/home/freezerdetails',query:{id:v.id}})
          window.open(`${this.api}/index.html#/home/freezerdetails?id=${v.id}`)
        }else{
          // this.$router.push({path:'/home/storagerack',query:{id:v.id}})
          window.open(`${this.api}/index.html#/home/storagerack?id=${v.id}`)
        }
      }else{
        this.$router.push({path:`/home/questionnairedetails`,query:{q_id:v.q_id,store_id:v.store_id}})
      }
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
        this.getDate(1)
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
          margin-left: 3px;
        }
        .search{
          display:inline-block;
          float: right;
          background: #2D78B3;
          border-radius: 4px;
          height:30px;
          width:60px;
          cursor:pointer;
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
        width:98px;height:20px;
        text-align: right;
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
      padding-bottom: 20px;
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
      cursor: pointer;
      border-bottom: 1px solid #E0E0E0;
    }
    .tablelistBc{
      background: #F5F5F5;
    }
  }
</style>
