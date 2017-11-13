<template>
  <div class="Questionnairestatistics">
    <div class="content">
      <div class="top">
        <span class="title">{{titleList.title}}</span>
        <div class="tip">
          <span>有效期：2017年11月12日 12：20～2017年12月12日 12：20</span>
          <span style="margin:auto  40px;">状态：进行中／已过期</span>
          <span>完成人数：10人</span>
        </div>
      </div>
      <div class="tab">
        <span @click="questionTab(1,$event)" :class="questionTabFlag?'borderBottom':''">问卷统计</span>
        <span  @click="questionTab(2,$event)" :class="!questionTabFlag?'borderBottom':''">答卷列表</span>
      </div>
      <div class="questionTab" v-if="questionTabFlag">
        <div class="title">
          1、可口可乐新品在上海市徐汇区家乐福在国庆期间有哪些优惠促销活动？（单选题）
        </div>
        <div style="margin-top:12px;margin-bottom:30px;">
          <div style="margin-top:8px;" v-for="v in box">
            <div class="lineAll">
              <div class="lineBottom"></div>
              <div class="line bgColorBlur" ref="lineB"></div>
            </div>
            <span style="margin-left:10px;color:#3DB866;">
              45.5%（999）
            </span><span style="margin-left:20px;color:#707070;">可口可乐</span>
          </div>
        </div>
        <div class="title">
          2、可口可乐新品在上海市徐汇区家乐福在国庆期间有哪些优？（多选题）
        </div>
        <div style="margin-top:12px;margin-bottom:30px;">
          <div style="margin-top:8px;" v-for="v in box">
            <div class="lineAll">
              <div class="lineBottom"></div>
              <div class="line bgColorBlur" ref="lineB"></div>
            </div>
            <span style="margin-left:10px;color:#3DB866;">
              45.5%（999）
            </span><span style="margin-left:20px;color:#707070;">可口可乐</span>
          </div>
        </div>
        <div class="title">
         3、可口可乐新品在上海市徐汇区家乐福在国庆期间有哪些优惠促销活动期间有哪些优惠促销活动？（填空题）
        </div>
        <div style="margin-top:16px;margin-bottom:30px;">
          <div style="margin-top:8px;" v-for="v in box">
            <div style="color: #707070;">
              填写答案1、可口可乐新品在上海市徐汇区家乐福在国庆期间有促销果冻
            </div>
          </div>
        </div>
      </div>
      <div class="questionTabTable" v-if="!questionTabFlag">
        <div class="table">
          <div class="Theaded">
            <div class="W100 publicCss">序号</div>
            <div class="W140 publicCss">答卷编号</div>
            <div class="W200 publicCss">完成时间</div>
            <div class="W200 publicCss">售点</div>
            <div class="W140 publicCss">营业所</div>
            <div class="W120 publicCss">线路</div>
            <div class="W220 publicCss">操作</div>
          </div>
          <div  class="tablelist">
            <div class="W100 publicCss"></div>
            <div class="W140 publicCss"></div>
            <div class="W200 publicCss"></div>
            <div class="W200 publicCss">可口可乐</div>
            <div class="W140 publicCss"></div>
            <div class="W120 publicCss"></div>
            <div class="W220 publicCss"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Questionnairestatistics',
  data () {
    return {
      choiceList:[],
      storeList:{},
      titleList:{
        title:'问卷名称问卷名称问卷名称'
      },
      questionTabFlag:true,
      box:[{},{},{}],
      q_id:'',
      store_id:'',
      nextId:'',
      preId:''
    }
  },
  mounted(){
    // this.q_id = this.$router.currentRoute.query.q_id
    // this.store_id = this.$router.currentRoute.query.store_id
    // this.getAjaxList()
  },
  methods:{
    questionTab(v,e){
      if(v===1){
        this.questionTabFlag = true
      }else{
        this.questionTabFlag = false
      }
    },
    getAjaxList(){
      var that  = this
      this.Axios.post(`${this.api}/question/content`,{q_id:this.q_id ,store_id:this.store_id})
      .then(function (data) {
        console.log(data.data)
        that.choiceList = data.data.data
        that.storeList = data.data.store
        that.titleList = data.data.naire
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    choice(num){
      if(num === 0){
        this.nextId = ''
        console.log('下一个')
      }else{
        this.preId = ''
        console.log('上一个')
      }
    }
  }
}
</script>

<style lang="scss">
  .Questionnairestatistics{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .content{
      overflow: hidden;
      padding:30px 30px 0 30px;
      .top{
        margin-bottom: 45px;
        .title{
          font-size: 20px;
          color: #000000;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .pre{
          cursor: pointer;
          background: #F5F5F5;
          border: 1px solid #E0E0E0;
          border-radius: 4px;
          display: inline-block;
          width:60px;
          height:24px;
          font-size: 14px;
          color: #333333;
          text-align: center;
          line-height: 24px;
          float: right;
          margin-left: 8px;
        }
        .tip{
          margin-top: 16px;
          font-size: 14px;
          color: #8C8C8C;
        }
      }
      .tab{
        overflow:hidden;
        margin-bottom:32px;
        .borderBottom{
          border-bottom: 2px solid #2D78B3;
          color: #2D78B3;
        }
        span{
          display:inline-block;
          width:130px;
          height:30px;
          line-height:30px;
          text-align: center;
          font-size: 14px;
          cursor:pointer;
        }
      }
      .questionTab{
        .title{
          color:#000;
          font-weight:bold;
        }
      .lineAll{
        position:relative;
        display:inline-block;
        height:4px;
        width:100px;
        .lineBottom{
          position:absolute;
          top: -4px;
          left:0;
          height:4px;
          width:100px;
          background:#EEEEEE;
        }
        .line{
          position:absolute;
          top: -4px;
          left:0;
          height:4px;
          width:100px;
          background:#50B7EB;
        }
        .bgColorBlur{
          background:#3DB866;
        }
        .bgColorRed{
          background:#D61E2A;
        }
      }

      }
      .questionTabTable{
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
    }
  }
</style>
