<template>
  <div class="questionnaire">
  	<div class="zune questionnairename">
	  	<span class="name">问卷名称</span>
	  	<div style="height:46px;">
		  	<div :class="[nameGetColor?'fontColor':'','right']">
			  	<input class="nameipt" @focus="nameGetFocus" @blur="nameGetblur" v-model="nameQuestion" type="" name="">
			  	<span class="errorRed count errorTip" v-show="fishFlag&&nameQuestion.length==0">（请填写问卷名称）</span>
		  		<span :class="[(fishFlag&&nameQuestion.length==0)?'errorRed':'','count']">{{nameQuestion.length}}/35</span>
		  	</div>
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
		      :disabledDate = 'true'
		      :clearable = 'false'
		      :editable = 'false'
		      :picker-options="pickerOptions"
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
  		<span class="ifShow del" v-show="v.delShow&&v.show" @click="delQuestion(indexQ)">删除问题</span>
  		<span class="ifShow" v-if="v.mustAddFlag&&choiceFlag" style="color:#D61E2A;margin-right:30px;cursor:default;">（问题填写完整才能添加下一个问题）</span>
  		<div class="showzoun" v-show="v.show">
		  	<div class="zune">
			  	<span class="name title" style="font-family:'Microsoft YaHei'">标题</span>
			  	<div  style="height:46px;">
				  	<div :class="[v.titleGetColcor?'fontColor':'','right']">
					  	<input class="nameipt" type="" @focus="titleFocus(v)" @blur="titleBlur(v)" v-model="v.title" name="">
					  	<span class="errorRed count errorTip" v-show="(fishFlag||choiceFlag)&&v.title.length==0">（请填写问题的选项）</span>
				  		<span :class="[(v.title.length==0&&(fishFlag||choiceFlag))?'errorRed':'','count']">{{v.title.length}}/35</span>
				  	</div>
			  	</div>
		  	</div>
		  	<div class="choice">
		  		<span class="type">类型</span>
		  		<img  :src="v.radioShow1?radioaimgUrl:radioimgUrl" alt="" @click="radioQus(indexQ,1,v)"><span class="radioText">单选</span>
		  		<img :src="v.radioShow2?radioaimgUrl:radioimgUrl" alt="" @click="radioQus(indexQ,2,v)"><span class="radioText">多选</span>
		  		<img :src="v.radioShow3?radioaimgUrl:radioimgUrl" alt="" @click="radioQus(indexQ,3,v)"><span class="radioText">填空</span>
		  	</div>
		  	<div class="zune choiceOne" v-if="v.choiceShow" v-for="(vC,indexC) in v.choiceList">
			  	<span class="name choiceSpan" style="font-family: 'Microsoft YaHei'">选项{{indexC+1}}</span>
			  	<div style="height:46px;">
				  	<div :class="[vC.choiceGetColcor?'fontColor':'','right']">
					  	<input class="nameipt" type="" v-model="vC.choiceIpt" @blur="getBlur(vC)" @focus="getFocus(vC,indexC,indexQ)"  name="">
					  	<span class="errorRed count errorTip" v-show="(fishFlag||choiceFlag||addFlag)&&vC.choiceIpt.length==0">（请填写问题的选项）</span>
				  		<span class="count" :class="[((fishFlag||choiceFlag)&&vC.choiceIpt.length==0)?'errorRed':'','count']">{{vC.choiceIpt.length}}/35</span>
				  	</div>
				  	<span class="delchoice" @click="delChoice(indexC,indexQ)" v-if="vC.delCe">删除选项</span>
			  	</div>
		  	</div>
		  	<div class="addchoice"  v-if="(v.choiceList.length<8) && (v.choiceShow)"  @click="addChoice(indexQ)">
		  		<a href="javascript:;" >＋添加选项</a>
		  	</div>
  		</div>
  		<div class="line"></div>
  	</div>
  	<div class="addquestion">
  		<a href="javascript:;" v-if="questionList.length<16" @click="addQuestion">＋添加问题</a>
	  	<div class="save" @click="saved">
				完成
			</div>
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
			pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      addFlag:false,
    	nameGetColor:false,
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
    	questionList:[{titleGetColcor:false,radioShow1:true,radioShow2:false,radioShow3:false,title:'',error:true,show:true,radio:'radio0',choiceShow:true,choiceList:[{delCe:false,choiceIpt:'',choiceGetColcor:false},{delCe:false,choiceIpt:'',choiceGetColcor:false},{delCe:false,choiceIpt:'',choiceGetColcor:false}],delShow:true,mustAddFlag:false}],
    	bacStyles:'background:  #F5F5F5 url('+icon+')  no-repeat;background-position:95% 40%;'
    }
  },
  mounted:function(){
  	for(var i=0;i<24;i++){
  		if(i>9){
  			this.timeDate.push(i+'时')
  		}else{
  			this.timeDate.push('0'+i+'时')
  		}
  	}
  	this.lastone()
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
  		},
  		deep:true
  	}
  },
  methods:{
  	titleFocus(v){//标题得到焦点
  		v.titleGetColcor = true
  	},
  	titleBlur(v){//标题失去焦点
  		v.titleGetColcor = false
  	},
  	nameGetFocus(){//名称得到焦点
  		this.nameGetColor = true
  	},
  	nameGetblur(){//名称失去焦点
  		this.nameGetColor = false
  	},
  	getFocus:function(v,index,indexQ){//input 等到焦点
  		v.choiceGetColcor = true
  		for(var i=0;i<this.questionList[indexQ].choiceList.length;i++){
  			this.questionList[indexQ].choiceList[i].delCe=false
  		}
  		v.delCe = true
  		this.lastoneC(indexQ)
  	},
  	getBlur(v){//input 失去焦点
  		v.choiceGetColcor =false
  	},
  	saved:function(){//完成
  		this.fishFlag = true;
  		if(this.nameQuestion == null || this.nameQuestion == ''){
  			this.$message({
  				message:'请填写问卷名称'
  			});
  			return
  		}
  		var d = new Date(this.value1)
  		var YMD = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  		if((new Date().getTime()) > (new Date(YMD+' '+this.selecttime.substr(0, 2)+':00'+':00').getTime())){
  			this.$message({
  				message:'问卷时间只能在当前时间之后'
  			});
  			return
  		}
  		//input值判断
  		for(var j=0;j<this.questionList.length;j++){
  			this.questionList[j].mustAddFlag = false
	  		for(var i=0;i<this.questionList[j].choiceList.length;i++){
	  			if(this.questionList[j].title==null||this.questionList[j].title==''||this.questionList[j].choiceList[i].choiceIpt == '' || this.questionList[j].choiceList[i].choiceIpt==null){
	  				this.questionList[j].mustAddFlag = true
	  				this.$message({
  						message:'请填写问题及选项'
  					});
	  				return
	  			}
	  		}
  		}
  		//后台数据处理

  		var data = {
  			title:this.nameQuestion,
  			endtime:(new Date(YMD+' '+this.selecttime.substr(0, 2)+':00'+':00').getTime())/1000,
  			question:[]
  		}
  		var objList ={}
  		var objArr = []
  		for(let t=0;t<this.questionList.length;t++){
  			objList = {}
  			objList.sort = t+1
  			objList.content = this.questionList[t].title
  			if(this.questionList[t].radioShow1){
  				objList.type = 1
  			}else if(this.questionList[t].radioShow2){
					objList.type = 2
  			}else if(this.questionList[t].radioShow3){
  				objList.type = 3
  			}
  			for(let a=0;a<this.questionList[t].choiceList.length;a++){
  				objList['option'+(a+1)] = this.questionList[t].choiceList[a].choiceIpt
  			}
  			objArr.push(objList)
  		}
  		data.question = objArr
  		var that = this
			this.Axios.post(`${this.api}/question/addnaire`,data)
			.then(function (response) {
				if(response.data.code === 200){
		  		that.$message({
		  			message:response.data.msg
		  		});
		  		that.$router.push('/home/scenemanagement')
				}else{
		  		that.$message({
		  			message:response.data.msg
		  		});
				}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
  	},
  	lastone:function(){//问题删除按钮显示
  		if(this.questionList.length === 1){
  			this.questionList[0].delShow = false
  		}
  	},
  	lastoneC:function(indexQ){//选项删除按钮显示
  		if(this.questionList[indexQ].choiceList.length <= 2){
  			this.questionList[indexQ].choiceList[0].delCe = false
  			this.questionList[indexQ].choiceList[1].delCe = false
  		}
  	},
  	radioQus:function(index,num,v){//单选、多选判断
  		if(num === 1){
  			this.questionList[index].radioShow1 = true
  			this.questionList[index].radioShow2 = false
  			this.questionList[index].radioShow3 = false
  			v.choiceShow = true
  			v.choiceList = [{delCe:false,choiceIpt:'',choiceGetColcor:false},{delCe:false,choiceIpt:'',choiceGetColcor:false},{delCe:false,choiceIpt:'',choiceGetColcor:false}]

  		}else if(num === 2){
  			this.questionList[index].radioShow1 = false
  			this.questionList[index].radioShow2 = true
  			this.questionList[index].radioShow3 = false
  			v.choiceShow = true
  			v.choiceList = [{delCe:false,choiceIpt:'',choiceGetColcor:false},{delCe:false,choiceIpt:'',choiceGetColcor:false},{delCe:false,choiceIpt:'',choiceGetColcor:false}]
  		}else{
  			this.questionList[index].radioShow1 = false
  			this.questionList[index].radioShow2 = false
  			this.questionList[index].radioShow3 = true
  			v.choiceList = []
  			v.choiceShow = false
  		}
  	},
  	addQuestion(){//添加问题
  		this.choiceFlag = true
  		for(var j=0;j<this.questionList.length;j++){
  			this.questionList[j].mustAddFlag = false
	  		for(var i=0;i<this.questionList[j].choiceList.length;i++){
	  			if(this.questionList[j].title==null||this.questionList[j].title==''||this.questionList[j].choiceList[i].choiceIpt == '' || this.questionList[j].choiceList[i].choiceIpt==null){
	  				this.questionList[j].mustAddFlag = true
	  				return
	  			}
	  		}
  		}
  		for(var k=0;k<this.questionList.length;k++){
  			this.questionList[k].show = false
  		}
			this.fishFlag = false
			this.choiceFlag = false
  		this.questionList.push({radioShow1:true,radioShow2:false,radioShow3:false,title:'',error:true,show:true,radio:'radio0',choiceShow:true,choiceList:[{delCe:false,choiceIpt:''},{delCe:false,choiceIpt:''},{delCe:false,choiceIpt:''}],delShow:true,mustAddFlag:false})
  		if(this.questionList.length > 1){
  			this.questionList[0].delShow = true;
  		}
  		this.lastone()

  	},
  	addChoice:function(index){//添加选项
  		this.addFlag = true
  		for(var i=0;i<this.questionList[index].choiceList.length;i++){
  			if(this.questionList[index].choiceList[i].choiceIpt == '' || this.questionList[index].choiceList[i].choiceIpt == null){
  				return
  			}
  		}
  		this.questionList[index].choiceList.push({delCe:false,choiceIpt:''})
  		this.lastoneC(index)
  	},
  	delChoice:function(indexC,indexQ){//删除选项
  		this.questionList[indexQ].choiceList.splice(indexC,1)
  		this.lastoneC(indexQ)
  	},
  	show:function(v){//展开逻辑
  		this.choiceFlag = true
  		for(var j=0;j<this.questionList.length;j++){
  			this.questionList[j].mustAddFlag = false
	  		for(var i=0;i<this.questionList[j].choiceList.length;i++){
	  			if(this.questionList[j].title==null||this.questionList[j].title==''||this.questionList[j].choiceList[i].choiceIpt == '' || this.questionList[j].choiceList[i].choiceIpt==null){
	  				this.questionList[j].mustAddFlag = true
	  				return
	  			}
	  		}
  		}
			for(var i =0;i<this.questionList.length;i++){
				this.questionList[i].show = false
			}
			v.show = !v.show
  	},
  	delQuestion:function(index){//删除问题
  		this.questionList.splice(index,1)
  		if(this.questionList.length > 1){
  			this.questionList[0].delShow = true;
  		}
  		this.lastone()
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
		border-radius: 4px;
		background: #FFFFFF;
		.el-message{
			background: #F7D2D5;
			margin-top:30px;
		}
		.save{
			margin-top:20px;
			background: #2D78B3;
	    border-radius: 4px;
	    height: 30px;
	    width:100px;
	    cursor:pointer;
	    line-height:30px;
	    text-align: center;
	    color:#FFFFFF;
		}
		.zune{
			overflow: hidden;
		}
		input{
			border: none;
			background:#F5F5F5;
		}
		.questionnairename{
			width:97%
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
				cursor:pointer;
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
		.fontColor{
			border:2px solid #77B5E5;
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
			height:40px;
			width:134px;
			background: #F5F5F5;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			color: #333333;
			font-size: 14px;
 			transition: width 2s, height 20s;
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