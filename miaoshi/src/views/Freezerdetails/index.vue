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
          <div class="titl">场景数据</div>
          <div class="cycly">
            <svg>
              <circle cx="52" cy="52" r="50" fill="none" stroke="#50B7EB" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo1"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              21.7%
            </div>
            <div class="describe">
              纯净度
            </div>
          </div>
          <div class="cycly">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#54D17D" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo2"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              21.7%
            </div>
            <div class="describe">
              饱和度
            </div>
          </div>
          <div class="cycly">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#E7414C" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo3"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              21.7%
            </div>
            <div class="describe">
              空缺率
            </div>
          </div>
          <div class="cycly">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo4"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              99.0%
            </div>
            <div class="describe">
              空缺数
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
      <div class="picture">
        <div class="title">
          <span>识别产品（共27，top8，重点1）</span>
          <div class="img">
            <img :src="iconFlag?iconUrlA:iconUrl" @click="changeImg" alt="">
          </div>
          <span>显示全部</span>
        </div>
        <div class="tree">
          <div class="left">
            <!-- <el-tree :data="data" @node-click="handleNodeClick"></el-tree> -->
            <div class="treeLi" v-for="(v,index) in dataList">
              <div class="li" @click="liClick(v)">
                <img :src="iconFoldURl"  :class="v.childShow?'imgTranform':''" alt=""><span>{{v.title}}</span>
              </div>
              <div v-if="v.childShow"  v-for="(vC,indexC) in v.childrenList">
                <div @click="childClick(vC)" class="li mgLeft10"  >
                  <img :src="iconFoldURl"  :class="vC.childrenShow?'imgTranform':''" alt="">
                  <span>{{vC.children1}}</span>
                </div>
                <div class="li mgLeft20" @click="getGoods(vCC)" v-for="(vCC,indexCC) in vC.childrenHave"  v-if="vC.childrenShow">
                  <span>{{vCC.title}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <img class="img1" :src="iconNarrowUrl" alt="">
            <img class="img2" :src="iconEnlargeUrl" alt="">
            <div  class="imgMain">
              <img :src="vueUrl" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">原图（6）</div>
        <div class="img" v-for="v in imgList">
          <img :src="vueUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hookiconA from '@/assets/ic_selected@1x.png'
import hookicon from '@/assets/ic_not selected@1x.png'
import iconFold from '@/assets/ic_fold@1x.png'
import iconEnlarge from '@/assets/ic_bigger_normal@1x.png'
import iconNarrow from '@/assets/ic_smaller_normal@1x.png'
import iconVue from '@/assets/vue.png'

export default {
  name: 'Freezerdetails',
  data () {
    return {
      imgList:[{},{},{},{},{}],
      iconUrlA:hookiconA,
      iconUrl:hookicon,
      iconFlag:false,
      iconFoldURl:iconFold,
      iconEnlargeUrl:iconEnlarge,
      iconNarrowUrl:iconNarrow,
      vueUrl:iconVue,
      // data: [{
      //   label: '一级 1',
      //   children: [{
      //     label: '二级 1-1',
      //     children: [{
      //       label: '三级 1-1-1'
      //     }]
      //   }]
      // },{
      //   label: '一级 1',
      //   children: [{
      //     label: '二级 1-1',
      //     children: [{
      //       label: '三级 1-1-1'
      //     }]
      //   }]
      // },{
      //   label: '一级 1',
      //   children: [{
      //     label: '二级 1-1',
      //     children: [{
      //       label: '三级 1-1-1'
      //     }]
      //   }]
      // },{
      //   label: '一级 1',
      //   children: [{
      //     label: '二级 1-1',
      //     children: [{
      //       label: '三级 1-1-1'
      //     }]
      //   }]
      // },{
      //   label: '一级 1',
      //   children: [{
      //     label: '二级 1-1',
      //     children: [{
      //       label: '三级 1-1-1'
      //     }]
      //   }]
      // }],
      dataList:[{
        title:'美汁源',
        childShow:false,
        childrenList:[{
          children1:'果粒奶优300ml',childrenShow:false,childrenHave:[{title:'热带水果300ml'},{title:'热带水果500ml'}]
        },{
          children1:'果粒奶优400ml',childrenShow:false
        }]
      },{
        title:'美汁源',
        childShow:false,
        childrenList:[{
          children1:'果粒奶优300ml',childrenShow:false,childrenHave:[{title:'热带水果300ml'},{title:'热带水果500ml'}]
        },{
          children1:'果粒奶优400ml',childrenShow:false
        }]
      },{
        title:'美汁源',
        childShow:false,
        childrenList:[{
          children1:'果粒奶优300ml',childrenShow:false,childrenHave:[{title:'热带水果300ml'},{title:'热带水果500ml'}]
        },{
          children1:'果粒奶优400ml',childrenShow:false
        }]
      },{
        title:'美汁源',
        childShow:false,
        childrenList:[{
          children1:'果粒奶优300ml',childrenShow:false,childrenHave:[{title:'热带水果300ml'},{title:'热带水果500ml'}]
        },{
          children1:'果粒奶优400ml',childrenShow:false
        }]
      },{
        title:'美汁源',
        childShow:false
      },{
        title:'美汁源',
        childShow:false
      }]
    }
  },
  mounted(){
    this.circleSet(21.7, document.querySelector("#J_demo1"))
    this.circleSet(21.7, document.querySelector("#J_demo2"))
    this.circleSet(21.7, document.querySelector("#J_demo3"))
    this.circleSet(99, document.querySelector("#J_demo4"))
  },
  methods:{
    getGoods(v){
      console.log(v)
    },
    childClick(v){
      v.childrenShow = !v.childrenShow
    },
    liClick(v){
      v.childShow = !v.childShow
    },
    handleNodeClick(data){
      console.log(data)
    },
    changeImg(){
      this.iconFlag = !this.iconFlag
    },
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
          .cycly{
            position: relative;
            height:108px;
            width:108px;
            float:left;
            margin-right:32px;
            .percentage{
              position:absolute;
              top:24px;
              left:20px;
              font-family:'Avenir-Black';
              font-size: 24px;
              color: #333333;
            }
            .describe{
              position:absolute;
              top:57px;
              left:28px;
              font-size: 14px;
              color: #333333;
            }
            .demo2{
              transform-origin: center;
              transition: stroke-dasharray .3s ease-in;
            }
          }
          .titl{
            font-family:'PingFangSC-Medium';
            font-size:16px;
            color:#000000;
            margin-bottom: 16px;
            font-weight: bold;
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
      .picture{
        margin-top:40px;
        .title{
          overflow: hidden;
          span:nth-of-type(1){
            font-family: 'PingFangSC-Medium';
            font-size: 16px;
            color: #000000;
            float: left;
            font-weight: bold;
          }
          .img{
            margin-left:44px;
            cursor: pointer;
            float: left;
          }
          span:nth-of-type(2){
            font-family: 'Microsoft YaHei';
            font-size: 14px;
            color: #333333;
            float: left;
            margin-top:4px;
          }
        }
        .tree{
          overflow: hidden;
          .left::-webkit-scrollbar{
            width: 4px;
            background-color: #fff;
          }
          .left::-webkit-scrollbar-thumb{
            background:#ccc;
            border-radius: 3px;
          }
          .left{
            float: left;
            overflow-y: scroll;
            width:360px;
            height:480px;
            border: 2px solid #F5F5F5;
            border-radius: 4px;
            background:#F5F5F5;
            .treeLi{
              background:#fff;
              .mgLeft10{
                padding-left:15px;
              }
              .mgLeft20{
                padding-left:57px;
              }
            }
            img{
              vertical-align: middle;
            }
            .li{
              cursor:pointer;
              line-height:25px;
              border-bottom: 1px solid #F5F5F5;
              .imgTranform{
                transform:rotate(90deg);
              }
            }
            .el-tree-node__content{
              border-bottom:1px solid #F5F5F5;
            }
            .el-tree{
              border:none;
            }
            .el-tree-node__expand-icon{
              border-left-color: #000;
            }
            .is-leaf{
              border-left-color: #fff;
              border:none;
            }
          }
          .right{
            float: right;
            width:718px;
            height:484px;
            background: #F5F5F5;
            border-radius: 4px;
            position:relative;
            .img1{
              cursor:pointer;
              position:absolute;
              right:48px;
              top:10px;
            }
            .img2{
              cursor:pointer;
              position:absolute;
              right:10px;
              top:10px;
            }
            .imgMain{
              width:233.9px;
              height:460px;
              margin:0 auto;
              vertical-align: middle;
            }
          }
        }
      }
      .bottom{
        margin:40px 0  16px 0;
        .title{
          font-family: 'PingFangSC-Medium';
          font-size: 16px;
          color: #000000;
          font-weight: bold;
          margin-bottom:16px;
        }
        .img{
          overflow: hidden;
          float: left;
          margin-right: 8px;
          img{
            width:76px;
            height:76px;
            float:left;
          }
        }
      }
    }
  }
</style>
