<template>
  <div class="mustsku">
    <div style="overflow:hidden;">
      <div style="float: left;margin-top: 30px; margin-left:30px; ">
        渠道：
      </div>
      <div class="dataImg" style="float: left;margin-top: 27px;">
        <img  :src="yestoday?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(1)"><span class="radioText">全部</span>
        <img :src="lastSeven?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(2)"><span class="radioText">大型商超</span>
        <img :src="lastMounth?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(3)"><span class="radioText">便利店</span>
        <img :src="lastLast?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(4)"><span class="radioText">烟酒行</span>
      </div>
    </div>
    <div style="font-size: 18px;color: #000000;margin-left:28px;margin-top: 30px;">
      <span>必备SKU</span><span style="float: right;margin-right:22px;height:30px;line-height: 30px;text-align: center;display:inline-block;background:#4285BA;width:100px;border-radius: 4px;color:#fff;font-size:14px;" >添加</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W300 publicCss">序号</div>
        <div class="W120 publicCss">类名</div>
        <div class="W360 publicCss">适用渠道</div>
        <div class="W200 publicCss">包含SKU</div>
        <div class="W140 publicCss">创建时间</div>
      </div>
      <div class="imgMain" style="height:354px;overflow-y:scroll;overflow-x: hidden;border-bottom:1px solid #eee;">
        <div v-for="(v,index) in tableList" class="tablelist">
          <div class="W300 publicCss">{{v.id}}</div>
          <div class="W120 publicCss"><img  class="img" :src="v.picture" alt=""></div>
          <div class="W360 publicCss">{{v.sku_name}}</div>
          <div class="W200 publicCss">可口可乐</div>
          <div class="W140 publicCss"><span v-if="v.state==1" :class="[v.state==1?'blueClocor':'']">生效中</span><span v-if="v.state!=1" :class="[v.state==1?'redClocor':'']">已失效</span></div>
        </div>
      </div>
    </div>
    <Pages :totlePages.sync="totleNums" v-if="totleNums/20>1"  :nowPages.sync="nowNum"></Pages>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import Pages from '@/components/pages'
import iconradio from '@/assets/ic_not selected@1x.png'
import iconradioActive from '@/assets/ic_selected@1x.png'

export default {
  name: 'Mustsku',
  components:{Pages},
  data () {
    return {
      yestoday:true,
      lastSeven:false,
      lastMounth:false,
      lastLast:false,
      radioimgUrl:iconradio,
      radioaimgUrl:iconradioActive,
      totleNums:0,
      nowNum:'1',
      hookUrl:hookicon,
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
    choiceData(num){
      if(num === 1){
        this.yestoday = true
        this.lastSeven = false
        this.lastMounth = false
         this.lastLast = false
        // this.getDate(num)
      }else if(num === 2){
        this.yestoday = false
        this.lastSeven = true
        this.lastMounth = false
         this.lastLast = false
        // this.getDate(7)
      }else if(num === 3){
        this.yestoday = false
        this.lastSeven = false
        this.lastMounth = true
         this.lastLast = false
        // this.getDate(30)
      }else{
        this.yestoday = false
        this.lastSeven = false
        this.lastMounth = false
        this.lastLast = true
      }
    },
    getAjaxList(){
      var that  = this
      this.Axios.get(`${this.api}/sku/index?page=${this.nowNum}&per-page=20&type=1`)
      .then(function (data) {
        that.tableList = data.data.data
        that.totleNums = data.data.pagelist.count
        that.nowNum = data.data.pagelist.page
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
      overflow: hidden;
      width:1122px;

      border-bottom: 1px solid #E0E0E0;
      .img{
        width:36px;
        height:36px;
        vertical-align: middle;
      }
    }
  }
</style>
