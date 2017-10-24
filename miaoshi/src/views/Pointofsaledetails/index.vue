<template>
  <div class="pointofsaledetails">
    <div class="content">
      <div class="top">
        <span class="title">快客便利店徐汇店（5505032）</span>
        <span class="pre">下一个</span>
        <span class="pre">上一个</span>
        <div class="tip">
          123422／105／2017-11-18
        </div>
      </div>
      <div class="center">
        <div class="left">
          <div class="titl">场景数据</div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
        </div>
      </div>
      <div class="sku">
        <div class="left">
          <div class="title">
            缺失必备 SKU
          </div>
          <div class="p">
            <span>缺失</span><span>可口可乐罐装300ml</span>
          </div>
          <div class="p">
            <span>缺失</span><span>美汁源果粒橙热带水果味600ml</span>
          </div>
          <div class="p">
            <span>缺失</span><span>美汁源果粒橙热带水果味600ml</span>
          </div>
        </div>
        <div class="left right">
          <div class="title">
            缺失重点 SKU
          </div>
          <div class="p">
            <span>缺失</span><span>可口可乐罐装300ml</span>
          </div>
          <div class="p">
            <span>缺失</span><span>美汁源果粒橙热带水果味600ml</span>
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
          <span class="">识别图片</span>
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
import iconUnqualified from '@/assets/ic_unqualified@2x.png'

export default {
  name: 'Pointofsaledetails',
  data () {
    return {
      imgList:[{},{},{},{},{}],
      iconUrlA:hookiconA,
      iconUrl:hookicon,
      iconUnqualifiedUrl:iconUnqualified,
      iconFlag:false,
      iconFoldURl:iconFold,
      iconEnlargeUrl:iconEnlarge,
      iconNarrowUrl:iconNarrow,
      vueUrl:iconVue,
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
    }
  }
}
</script>

<style lang="scss">
  .pointofsaledetails{
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
          float: left;
          .cycly{
            position: relative;
            height:90px;
            width:120px;
            float:left;
            margin-right:6px;
            background: #F5F5F5;
            border-radius: 4px;
            vertical-align: middle;
            text-align: center;
            .Unqualified{
              position:absolute;
              z-index: 999;
              width:50px;
              heiight:50px;
              right:-30px;
              top:-10px;
            }
            .percentage{
              font-family:'Avenir-Black';
              font-size: 24px;
              color: #50B7EB;
              margin-top:15px;
            }
            .describe{
              margin-top:6px;
              font-size: 14px;
              color: #000000;
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
      .sku{
        overflow: hidden;
        margin-top:40px;
        .left{
          float:left;
          .p{
            margin-bottom:8px;
            span:nth-of-type(1){
              font-size: 14px;
              color: #D61E2A;
              margin-right:20px;
            }
            span:nth-of-type(2){
              font-size: 14px;
              color: #333333;
            }
          }
          .title{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #000000;
            font-weight:bold;
            margin-bottom:16px;
          }
        }
        .right{
          margin-left:170px;
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
          span:nth-of-type(3){
            font-family: 'PingFangSC-Medium';
            font-size: 16px;
            color: #000000;
            float: left;
            font-weight: bold;
            margin-left:30px;
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
