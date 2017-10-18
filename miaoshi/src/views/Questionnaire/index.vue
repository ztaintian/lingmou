<template>
  <div class="questionnaire">
  	<div class="zune">
	  	<span class="name">问卷名称</span>
	  	<div class="right">
		  	<input class="nameipt"   v-model="nameQuestion" type="" name="">
		  	<span class="errorRed count errorTip" v-show="fishFlag&&nameQuestion.length==0">（请填写问题的选项）</span>
	  		<span :class="[(fishFlag&&nameQuestion.length==0)?'errorRed':'','count']">{{nameQuestion.length}}/35</span>
	  	</div>
  	</div>
  	<div class="zune datetime">
	  	<span class="name">截止时间</span>
	  	<div class="right bc">
		  	<el-date-picker
		      v-model="value1"
		      type="date"
		      class="data"
		      placeholder="选择日期"
		      :clearable = 'false'
		      :editable = 'false'
		     >
    		</el-date-picker>
			  <el-select class="selecttimee" v-model="selecttime" placeholder="请选择">
			    <el-option
			      v-for="item in timeDate"
			      :key="item.id"
			      :label="item"
			      :value="item">
			    </el-option>
			  </el-select>
	  	</div>
  	</div>
  	<div class="line linetop"></div>
  	<div class="questionOne" v-for="(v,indexQ) in questionList">
  		<span class="one">{{indexQ|questionToString}}</span>
  		<span class="ifShow" @click="show(v)">{{v.show?'收起':'展开'}}</span>
  		<span class="ifShow del" v-show="v.delShow" @click="delQuestion(indexQ)">删除问题</span>
  		<span class="ifShow" v-if="v.mustAddFlag" style="color:#D61E2A;margin-right:30px;cursor:default;">（问题填写完整才能添加下一个问题）</span>
  		<div class="showzoun" v-show="v.show">
		  	<div class="zune">
			  	<span class="name title" style="font-family:'Microsoft YaHei'">标题</span>
			  	<div class="right">
				  	<input class="nameipt" type="" v-model="v.title" name="">
				  	<span class="errorRed count errorTip" v-show="(fishFlag||choiceFlag)&&v.title.length==0">（请填写问题的选项）</span>
			  		<span :class="[(v.title.length==0&&(fishFlag||choiceFlag))?'errorRed':'','count']">{{v.title.length}}/35</span>
			  	</div>
		  	</div>
		  	<div class="choice">
		  		<span class="type">类型</span>
		  		<img  :src="v.radioShow1?radioaimgUrl:radioimgUrl" alt="" @click="radioQus(indexQ,1,v)"><span class="radioText">单选</span>
		  		<img :src="v.radioShow2?radioaimgUrl:radioimgUrl" alt="" @click="radioQus(indexQ,2,v)"><span class="radioText">多选</span>
		  		<img :src="v.radioShow3?radioaimgUrl:radioimgUrl" alt="" @click="radioQus(indexQ,3,v)"><span class="radioText">填空</span>
		  	</div>
		  	<div class="zune choiceOne" v-for="(v,indexC) in v.choiceList">
			  	<span class="name choiceSpan" style="font-family: 'Microsoft YaHei'">选项{{indexC+1}}</span>
			  	<div class="right">
				  	<input class="nameipt" type="" v-model="v.choiceIpt" name="">
				  	<span class="errorRed count errorTip" v-show="(fishFlag||choiceFlag)&&v.choiceIpt.length==0">（请填写问题的选项）</span>
			  		<span class="count" :class="[((fishFlag||choiceFlag)&&v.choiceIpt.length==0)?'errorRed':'','count']">{{v.choiceIpt.length}}/35</span>
			  	</div>
			  	<span class="delchoice" @click="delChoice(indexC,indexQ)" v-if="v.delCe">删除选项</span>
		  	</div>
		  	<div class="addchoice" @click="addChoice(indexQ)">
		  		<a href="javascript:;" >＋添加选项</a>
		  	</div>
  		</div>
  		<div class="line"></div>
  	</div>
  	<div class="addquestion">
  		<a href="javascript:;" @click="addQuestion">＋添加问题</a>
  	</div>
  	<div style="cursor:pointer;" @click="finshed">
  		完成
  	</div>
  </div>
</template>

<script>
import icon from '@/assets/ic_V@1x.png'
import icondate from '@/assets/ic_select date@1x.png'
import iconradio from '@/assets/ic_not selected@1x.png'
import iconradioActive from '@/assets/ic_selected@1x.png'
export default {
  name: 'Questionnaire',
  data () {
    return {
    	fishFlag:false,
    	choiceFlag:false,
    	value1: new Date(),
    	nameQuestion:'',
    	imgUrl:icon,
    	dateimgUrl:icondate,
    	radioimgUrl:iconradio,
    	radioaimgUrl:iconradioActive,
    	radioShow:false,
    	timeDate:[],
    	selecttime:'00时',
    	radio:false,
    	questionList:[{radioShow1:true,radioShow2:false,radioShow3:false,title:'',error:true,show:true,radio:'radio0',choiceList:[{delCe:false,choiceIpt:''}],delShow:false,mustAddFlag:false}],
    	bacStyles:'background:  #F5F5F5 url('+icon+')  no-repeat;background-position:95% 40%;'
    }
  },
  mounted:function(){
  	document.querySelector('#left').style.height = document.querySelector('#right').offsetHeight+'px'
  	for(var i=0;i<24;i++){
  		if(i>9){
  			this.timeDate.push(i+'时')
  		}else{
  			this.timeDate.push('0'+i+'时')
  		}
  	}
  },
	computed: {
	},
  watch:{
  	nameQuestion(){
  		this.nameQuestion = this.nameQuestion.slice(0,35)
  	},
  	questionList:{
  		handler:function(val,oldval){
  			for(var i=0;i<val.length;i++){
  				this.questionList[i].title = 	this.questionList[i].title.slice(0,35);
  				for(var j=0;j<this.questionList[i].choiceList.length;j++){
  					this.questionList[i].choiceList[j].choiceIpt = this.questionList[i].choiceList[j].choiceIpt.slice(0,35)
  				}
  			}
	  		var questionList = this.questionList[this.questionList.length-1]
	  		for(var j=0;j<questionList.choiceList.length;j++){
	  			if(questionList.title!=null && questionList.title!=''&&questionList.choiceList[j].choiceIpt != '' && questionList.choiceList[j].choiceIpt!=null){
	  				questionList.mustAddFlag = false
	  			}
	  		}
  		},
  		deep:true
  	}
  },
  methods:{
  	finshed:function(){
  		this.fishFlag = true;
  	},
  	radioQus:function(index,num,bb){
  		if(num === 1){
  			this.questionList[index].radioShow1 = true
  			this.questionList[index].radioShow2 = false
  			this.questionList[index].radioShow3 = false
  		}else if(num === 2){
  			this.questionList[index].radioShow1 = false
  			this.questionList[index].radioShow2 = true
  			this.questionList[index].radioShow3 = false
  		}else{
  			this.questionList[index].radioShow1 = false
  			this.questionList[index].radioShow2 = false
  			this.questionList[index].radioShow3 = true
  		}
  	},
  	addQuestion(){
  		this.choiceFlag = true
  		var questionList = this.questionList[this.questionList.length-1]
  		for(var i=0;i<questionList.choiceList.length;i++){
  			if(questionList.title==null||questionList.title==''||questionList.title==undefined||questionList.choiceList[i].choiceIpt == '' || questionList.choiceList[i].choiceIpt==null||questionList.choiceList[i].choiceIpt == undefined){
  				questionList.mustAddFlag = true
  				return
  			}
  		}
			this.fishFlag = false
			this.choiceFlag = false
  		this.questionList.push({radioShow1:true,radioShow2:false,radioShow3:false,title:'',error:true,show:true,radio:'radio'+this.questionList.length,choiceList:[{delCe:false,choiceIpt:''}],delShow:false})
  		if(this.questionList.length > 1){
  			this.questionList[this.questionList.length-2].delShow = false;
  			this.questionList[this.questionList.length-1].delShow = true;
  		}
  	},
  	addChoice:function(index){
  		this.questionList[index].choiceList.push({delCe:false,choiceIpt:''})
  		if(this.questionList[index].choiceList.length > 1){
  			this.questionList[index].choiceList[this.questionList[index].choiceList.length-2].delCe = false;
  			this.questionList[index].choiceList[this.questionList[index].choiceList.length-1].delCe = true;
  		}
  	},
  	delChoice:function(indexC,indexQ){
  		this.questionList[indexQ].choiceList.splice(indexC,1)
  		if(this.questionList[indexQ].choiceList.length > 1){
  			this.questionList[indexQ].choiceList[this.questionList[indexQ].choiceList.length-2].delCe = false;
  			this.questionList[indexQ].choiceList[this.questionList[indexQ].choiceList.length-1].delCe = true;
  		}
  	},
  	show:function(v){
  		v.show = !v.show
  	},
  	delQuestion:function(index){
  		this.questionList.splice(index,1)
  		if(this.questionList.length > 1){
  			this.questionList[this.questionList.length-2].delShow = false;
  			this.questionList[this.questionList.length-1].delShow = true;
  		}
  	}
  }
}
</script>

<style lang="scss">
	.questionnaire{
		font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
		overflow: hidden;
		padding:30px 0 0 40px;
		width:96.6%;
		background: #FFFFFF;
		.zune{
			overflow: hidden;
		}
		input{
			border: none;
			background:#F5F5F5;
		}
		.right{
			float:left;
			width:600px;
			background:#F5F5F5;
			position: relative;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			.nameipt{
				height:40px;
				width:550px;
			}
			.count{
				height:40px;
				font-family:'Microsoft YaHei';
				position: absolute;
				right:8px;
				top:15px;
				font-size: 14px;
				color: #C4C4C4;
			}
			.errorRed{
				color:#D61E2A;
			}
			.errorTip{
				right:40px;
			}
			.selecttimee .el-input{
	    	.el-scrollbar{
	    		width:150px;
	    	}
	    	.el-input__icon:before{
	    		color:#8C8C8C;
	    	}
				.el-input__inner{
					height: 42px;
	    		border: 1px solid #E0E0E0;
	    		width:150px;
				}

				}
		}
		.bc{
			background:#fff;
			border:0;
		}
		.name{
			font-family: "Microsoft YaHei";
			display: inline-block;
			float: left;
			line-height: 40px;
			margin-right: 20px;
			font-family: 'PingFangSC-Medium';
			font-size: 14px;
			color: #000000;
			font-weight: 900;
		}
		.choiceSpan{
			font-weight:normal;
			color: #333333;
		}
		.data{
			width:150px;
			height:40px;
			background: #F5F5F5;
			color: #333333;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			float:left;
			margin-right:10px;
			.el-input__inner{
				font-size: 14px;
				color: #333333;
			}
		}
		.datetime{
			margin-top: 16px;
			margin-bottom:30px;
			position: relative;
			.dateimg{
				position: absolute;
				top:8px;
				left:122px;
			}
			.el-icon-date:before{
				content:'';
			}
			.el-icon-date{
				background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIBJREFUSA3tklEKwCAMQ93YkXsM77zNz9VnK3SFDRT8aGqaJljKOp9OoNZ6tjta0us33j4iv4VvepC1sX5LtYg8ZqY7SBfoXEYiIm66A1NAf0Ov7uK4AVOACGGMcpwdStx0B6aAl7nuk1NTgAhhjHKcHUrcdAcHbUeb0LuF/SOBC6IJQL9DepUnAAAAAElFTkSuQmCC) no-repeat center;
			}
		}
		.szune{
			float:left;
		}
		.selecttime{
			font-family: "Microsoft YaHei";
			appearance: none;
			margin-left: 10px;
			padding:0 0 0 16px;
			outline: none;
			height:40px;
			width:134px;
			background: #F5F5F5;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			color: #333333;
			font-size: 14px;
 			transition: width 2s, height 20s;
 			outline: none;
			option{
				font-size: 14px;
				color: #333333;
				line-height:19px;
			}
		}
		.questionOne{
			padding:0 0 0 76px;
			width:89.5%;
			border-radius: 4px;
			overflow: hidden;
			.one{
				font-size: 14px;
				line-height:52px;
				font-weight:900;
				color: #000000;
			}
			.ifShow{
				display:inline-block;
				float:right;
				cursor: pointer;
				font-size: 14px;
				line-height:52px;
				color: #2D78B3;
				letter-spacing: 0;
			}
			.del{
				margin-right:30px;
				font-family: 'Microsoft YaHei';
			}
			.delchoice{
				margin-left:20px;
				float:left;
				cursor: pointer;
				font-size: 14px;
				line-height:40px;
				color: #2D78B3;
			}
			.choiceOne{
				margin:0 0 8px 48px;
				font-weight: normal;
			}
			.addchoice{
				border: 1px  dotted #C4C4C4;
				border-radius: 4px;
				width:600px;
				cursor:pointer;
				height:40px;
				text-align: center;
				margin-left:104px;
				margin-bottom: 21px;
				a{
					line-height:40px;
					font-size: 14px;
					color: #2D78B3;
					text-decoration: none;
				}
			}
		}
		.addquestion{
			margin: 0 0 163px 76px;
			width:89.5%;
			cursor:pointer;
			height:40px;
			border-radius: 4px;
			a{
				line-height:40px;
				font-size: 14px;
				color: #2D78B3;
				text-decoration: none;
			}
		}
		.line{
			background: #EBEBEB;
			width:100%;
			height:1px;
		}
		.linetop{
			margin-left:72px;
			width: 90%;
		}
		.showzoun{
			width:97%;
			.title{
				font-size: 14px;
				color: #333333;
				font-weight: normal;
				margin-right:18px;
			}
			overflow: hidden;
		}
		.choice{
			overflow: hidden;
			margin-top:19px;
			margin-bottom:16px;
			input[type="radio"] {
       	opacity: 0;
      }
      .radioText{
      	font-family: 'Microsoft YaHei';
      	font-size: 14px;
				color: #333333;
				margin-right:20px;
      }
      img{
      	vertical-align: middle;
      	cursor:pointer;
      }
      .el-radio__inner::after{
      	background:url();
      }
      .radio{
      	margin-right:10px;
      }
			.type{
				font-size: 14px;
				color: #333333;
				margin-right:10px;
			}
		}
	}
</style>