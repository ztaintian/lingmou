<template>
  <div class="freezerdetails">
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
        <div class="left">
          <span>场景数据</span>
          <div style="height:108px;width:108px;float:left;">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#50B7EB" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo1"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
          </div>
          <div style="height:108px;width:108px;float:left;">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#54D17D" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo2"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
          </div>
          <div style="height:108px;width:108px;float:left;">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#E7414C" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo3"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
          </div>
          <div style="height:108px;width:108px;float:left;">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo4"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
          </div>
        </div>
        <div class="right">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'

export default {
  name: 'Freezerdetails',
  data () {
    return {
    }
  },
  mounted(){
    this.circleSet(100-80, document.querySelector("#J_demo1"))
    this.circleSet(100-80, document.querySelector("#J_demo2"))
    this.circleSet(100-60, document.querySelector("#J_demo3"))
    this.circleSet(100-80, document.querySelector("#J_demo4"))
  },
  methods:{
    circleSet(num,dom){
      var circleLength = Math.floor(2 * Math.PI * dom.getAttribute("r"));
      dom.setAttribute("stroke-dasharray","" + circleLength*num/ 100 + ",10000");
      dom.style.transform = 'rotate(-'+90+'deg)'
    }
  }
}
</script>

<style lang="scss">
  .freezerdetails{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .content{
      padding:30px 30px 0 30px;
      .demo2{
        transform-origin: center;
        transition: stroke-dasharray .3s ease-in;
      }
      .top{
        margin-bottom: 40px;
        .title{
          font-size: 20px;
          color: #000000;
          margin-bottom: 8px;
        }
        .pre{
          background: #F5F5F5;
          border: 1px solid #E0E0E0;
          border-radius: 4px;
          display: inline-block;
          width:60px;
          height:24px;
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
          span{
            font-family:'PingFangSC-Medium';
            font-size:16px;
            color:#000000;
            display:inline-block;
            margin-bottom: 16px;
          }
        }
      }
    }
  }
</style>
