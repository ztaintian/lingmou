<template>
  <div class="login">
  	<div class="top">
	  	<img :src="imgurl" alt="">
	  	<span>后台管理系统</span>
  	</div>
  	<div>
	  	<input type="" name="account"  v-model="account" class="iptAct" placeholder="请输入账号">
	  	<div ref="account"  :class="[accountFlag?'linelast':'line']"></div>
	  	<div class="error" >{{accountShow}}</div>
  	</div>
  	<div>
	  	<input type="password" name="pass"   v-model="pass" class="iptSct" placeholder="请输入密码">
	  	<div ref="pass" :class="[passFlag?'linelast':'line']"></div>
	  	<div class="error">{{passShow}}</div>
  	</div>
  	<button ref="bnt" :class="[bntIf?'bntlast':'bnt','bnt']" type="" @click="login">登录</button>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data () {
    return {
    	imgurl:logo,
    	account:'',
    	pass:'',
    	accountFlag:false,
    	passFlag:false,
    	accountShow:'',
    	passShow:'',
    	accountMessage:'',
    	bntIf:false
    }
  },
  methods:{
  	ifBnt(){
  		if(this.accountFlag && this.passFlag){
  			this.bntIf = true
  		}else{
  			this.bntIf = false
  		}
  	},
  	login(){
  		if(this.accountFlag && this.passFlag){
  			var that = this
  			that.passShow = ''
  			that.accountShow = ''
	  		this.Axios.post('/api/y2/frontend/web/index.php?r=user/login',{
			    username: this.account,
			    password: this.pass
			  })
				.then(function (data) {
			    if(data.data.code === 10004){
			    	that.passShow = data.data.msg
			    }else if(data.data.code === 200){
			    	that.$router.push('/home/focusreport')
			  		Cookies.set('user_name',data.data.data.user_name)
			  		Cookies.set('user_id',data.data.data.user_id)
			    }else if(data.data.code === 10003){
			    	that.accountShow = data.data.msg
			    }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
  		}
  	}
  },
  watch:{
  	account:function(val){
  		if(val==null || val==undefined || val==''){
  			this.accountFlag = false
  			this.accountShow = ''
  		}else{
  			this.accountFlag = true
  		}
  		this.ifBnt()
  	},
  	pass:function(val){
  		if(val==null || val==undefined || val==''){
  			this.passFlag = false
  			this.passShow = ''
  		}else{
  			this.passFlag = true
  		}
  		this.ifBnt()
  	}
  }
}
</script>

<style lang="scss" scoped>
	.login {
		font-family: 'Microsoft YaHei';
		margin: 140px auto 0;
		width:320px;
		.top{
			overflow: hidden;
			img{
				vertical-align: bottom;
				font-size: 0;
				width:103px;
				height:40px;
			}
			span{
				color:#324656;
				line-height: 45px;
				font-size: 34px;
			}
		}
		.iptAct ,.iptSct{
			width:100%;
			margin-top:100px;
			border:none;
			outline: none;
			font-size: 18px;
			padding:4px 0 ;
			height: 35px;
		}
		.line{
			width:100%;
			background: #D8D8D8;
			height:1px;
		}
		@keyframes mymove{
			from {width:0;}
			to {width:100%;}
		}
		.linelast{
			background: #324656;
			height:2px;
		}
		.iptSct{
			margin-top: 40px;
		}
		.bnt{
			margin-top: 40px;
			border: none;
    	height: 40px;
			width:100%;
			background: rgba(50,70,86,0.30);
			border-radius: 2px;
			outline: none;
			color:#FFFFFF;
			cursor:default;
		}
		.bntlast{
			background:#324656;
			cursor:pointer;
		}
		.error{
			color:#D61E2A;
			font-size:12px;
			line-height:16px;
			margin-top:4px;
			height:16px;
		}
	}
</style>