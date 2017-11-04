<template>
  <div class="mustsku">
    <div class="table">
      <div class="Theaded">
        <div class="W300 publicCss">编号</div>
        <div class="W120 publicCss">图片</div>
        <div class="W360 publicCss">sku名</div>
        <div class="W200 publicCss">父品牌</div>
        <div class="W140 publicCss">状态</div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W300 publicCss">{{v.id}}</div>
        <div class="W120 publicCss"><img  class="img" :src="v.picture" alt=""></div>
        <div class="W360 publicCss">{{v.sku_name}}</div>
        <div class="W200 publicCss">可口可乐</div>
        <div class="W140 publicCss"><span v-if="v.state==1" :class="[v.state==1?'blueClocor':'']">生效中</span><span v-if="v.state!=1" :class="[v.state==1?'redClocor':'']">已失效</span></div>
      </div>
    </div>
    <Pages :totlePages.sync="totleNums" v-if="totleNums/20>1"  :nowPages.sync="nowNum"></Pages>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import Pages from '@/components/pages'

export default {
  name: 'Mustsku',
  components:{Pages},
  data () {
    return {
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
    .table{
      margin:30px auto 0;
      width:1120px;
      padding-bottom: 30px;
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
    .tablelist{
      overflow: hidden;
      border-bottom: 1px solid #E0E0E0;
      .img{
        width:36px;
        height:36px;
        vertical-align: middle;
      }
    }
  }
</style>
