<template>
  <div class="questionnairedetails">
    <div class="content">
      <div class="top">
        <span class="title">{{titleList.title}}</span>
        <span class="pre" @click="choice(0)">下一个</span>
        <span class="pre" @click="choice(1)">上一个</span>
        <div class="tip">
          {{storeList.group_number}}／{{storeList.line_number}}／{{titleList.endtime|dataFormYMD}}／{{storeList.storename}}
        </div>
      </div>
      <div class="center">
        <div  class="left">
          <div v-for="(v,indexC) in choiceList">
            <div  class="allquestion" v-if="v.questions.type == 1">
              <div  class="title">
                {{v.questions.sort}}、{{v.questions.content}}（单选题）
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option1">
                选项1：{{v.questions.option1}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option2">
                选项2：{{v.questions.option2}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option3">
                选项3：{{v.questions.option3}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option4">
                选项4：{{v.questions.option4}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option5">
                选项5：{{v.questions.option5}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option6">
                选项6：{{v.questions.option6}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option7">
                选项7：{{v.questions.option7}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option8">
                选项8：{{v.questions.option8}}
              </div>
            </div>
            <div  class="allquestion" v-if="v.questions.type == 2">
              <div  class="title">
                 {{v.questions.sort}}、{{v.questions.content}}（多选题）
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option1">
                选项1：{{v.questions.option1}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option2">
                选项2：{{v.questions.option2}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option3">
                选项3：{{v.questions.option3}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option4">
                选项4：{{v.questions.option4}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option5">
                选项5：{{v.questions.option5}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option6">
                选项6：{{v.questions.option6}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option7">
                选项7：{{v.questions.option7}}
              </div>
              <div  :class="[v.d1 ==1?'blurColor':'','chioce']" v-if="v.questions.option8">
                选项8：{{v.questions.option8}}
              </div>
            </div>
            <div  class="allquestion" v-if="v.questions.type == 3">
              <div  class="title">
                {{v.questions.sort}}、{{v.questions.content}}（填空题）
              </div>
              <div class="chioce blurColor">
                {{v.answer}}
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="titl">所属售点</div>
          <div class="box">
            <div class="ttdetail">
              <span>快客徐汇店 000222888</span><span class="detail">详情></span>
            </div>
            <p><span>售点sku数：23；</span><span>必备sku数：15/16；</span><span>重点sku数：9/12</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Questionnairedetails',
  data () {
    return {
      choiceList:[],
      storeList:{},
      titleList:{},
      q_id:'',
      store_id:''

    }
  },
  mounted(){
    this.q_id = this.$router.currentRoute.query.q_id
    this.store_id = this.$router.currentRoute.query.store_id
    this.getAjaxList()
  },
  methods:{
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
        console.log('下一个')
      }else{
        console.log('上一个')
      }
    }
  }
}
</script>

<style lang="scss">
  .questionnairedetails{
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
        margin-bottom: 40px;
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
          margin-top: 8px;
          font-size: 14px;
          color: #333333;
        }
      }
      .center{
        overflow: hidden;
        float: left;
        .left{
          overflow: hidden;
          float: left;
          width:540px;
          .allquestion{
            margin-bottom:30px;
            .chioce{
              margin-bottom:8px;
            }
            .blurColor{
              color:#2D78B3;
            }
            .title{
              font-size:14px;
              color:#000000;
              margin-bottom: 16px;
              font-weight: bold;
            }
          }
        }
      }
      .right{
        overflow: hidden;
        width:460px;
        margin-bottom:24px;
        float: right;
        .titl{
          font-family:'PingFangSC-Medium';
          font-size:16px;
          color:#000000;
          margin-bottom: 16px;
          font-weight: bold;
        }
        .box{
          width:400px;
          height:40px;
          border: 2px solid #F5F5F5;
          border-radius: 4px;
          padding:30px 20px 30px 20px;
          .ttdetail{
            span:nth-of-type(1){
              font-size: 14px;
              color: #000000;
              font-weight: bold;
            }
            .detail{
              float: right;
              font-size: 14px;
              color: #2D78B3;
            }
          }
        }
      }
    }
  }
</style>
