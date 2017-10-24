<template>
  <div class="questionnairedetails">
    <div class="content">
      <div class="top">
        <span class="title">场景名称（5505032）</span>
        <span class="pre">下一个</span>
        <span class="pre">上一个</span>
        <div class="tip">
          123422／105／2017-11-18／1222222售点名称
        </div>
      </div>
      <div class="center">
        <div  class="left">
          <div  class="allquestion">
            <div  class="title">
              1、可口可乐新品在上海市徐汇区家乐福在国庆期间有哪些优惠促销
            </div>
            <div v-for="v in choiceList" class="chioce">
              选项1：选项名称
            </div>
          </div>
          <div  class="allquestion">
            <div  class="title">
              2、可口可乐新品在上海市徐汇区家乐福在国庆期间有哪些优惠促销活动？（多选题）
            </div>
            <div v-for="v in choiceList" class="chioce">
              选项1：选项名称
            </div>
          </div>
          <div  class="allquestion">
            <div  class="title">
              3、可口可乐新品在上海市徐汇区家乐福在国庆？（填空题）
            </div>
            <div class="chioce">
              回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回
            </div>
          </div>
          <div  class="allquestion">
            <div  class="title">
              5、可口可乐新品在上海市徐汇区家乐福在国庆期间有哪些优惠促销活动？（多选题）
            </div>
            <div class="chioce">
              回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回
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
      choiceList:[{},{},{}]
    }
  },
  mounted(){
  },
  methods:{
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
        .left{
          overflow: hidden;
          float: left;
          width:540px;
          .allquestion{
            margin-bottom:30px;
            .chioce{
              margin-bottom:8px;
            }
            .title{
              font-size:14px;
              color:#000000;
              margin-bottom: 16px;
              font-weight: bold;
            }
          }
        }
        .right{
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
  }
</style>
