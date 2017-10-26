<template>
  <div class="home">
  	<div class="left" id="left">
  		<div class="imglogo">
  			<img :src="imgurl" alt="">
  		</div>
  		<div class="nav">
	  		<div :class="[v.iconShow?'navlibc':'','navli']" v-if="v.ifShow" @click="iconClikc(index)" v-for="(v,index) in imgurlicon">
  				<a href="javascript:;">
	  				<img :src="v.icon" alt="">
	  				<span>{{v.text}}</span>
  				</a>
	  		</div>
  		</div>
  	</div>
  	<div class="right" id="right">
  		<div class="top" v-if="type==4">
  			<span>场景管理</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>{{useName}}</span>
  				<span class="signout" @click="Signout">退出</span>
  			</div>
  		</div>
  		<div class="top" v-else-if="type==1">
  			<span :class="[activeF?'bgActive':'','forcereport']" @click="repeot(1)">焦点报告</span>
  			<span :class="[activeC?'bgActive':'','forcereport','tv']" @click="repeot(2)">场景报告</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>{{useName}}</span>
  				<span class="signout" @click="Signout">退出</span>
  			</div>
  		</div>
  		<div class="top" v-else-if="type==5">
  			<span :class="[activeR?'bgActive':'','forcereport']" @click="Sku(1)">可识别sku</span>
  			<span :class="[activeM?'bgActive':'','forcereport','tv']" @click="Sku(2)">必备sku</span>
  			<span :class="[activeI?'bgActive':'','forcereport','tv']" @click="Sku(3)">重点sku</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>{{useName}}</span>
  				<span class="signout" @click="Signout">退出</span>
  			</div>
  		</div>
  		<div class="top" v-else-if="type==6">
  			<span :class="[activeAS?'bgActive':'','forcereport']" @click="admin(1)">管理员设置</span>
  			<span :class="[activeUS?'bgActive':'','forcereport','tv']" @click="admin(2)">用户管理</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>{{useName}}</span>
  				<span class="signout" @click="Signout">退出</span>
  			</div>
  		</div>
  		<div class="top" v-else-if="type==3">
  			<span class="forcereport">售点设置</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>{{useName}}</span>
  				<span class="signout" @click="Signout">退出</span>
  			</div>
  		</div>
  		<div class="centerLine"></div>
  		<div class="routerchild">
	  		<router-view :key="key" />
  		</div>
  	</div>
  </div>
</template>

<script>
import logo from '@/assets/logo@1x.png'
import useimg from '@/assets/vue.png'
import icon1 from '@/assets/ic_overview@1x.png'
import icon2 from '@/assets/ic_report@1x.png'
import icon3 from '@/assets/ic_data@1x.png'
import icon4 from '@/assets/ic_store@1x.png'
import icon5 from '@/assets/ic_scene@1x.png'
import icon6 from '@/assets/ic_SKU@1x.png'
import icon7 from '@/assets/ic_set@1x.png'
export default {
  name: 'Home',
  data () {
    return {
    	type:1,
    	activeF:true,
    	activeC:false,
    	activeR:true,
    	activeM:false,
    	activeI:false,
    	activeAS:true,
    	activeUS:false,
    	imgurl:logo,
    	topStatus:Number,
    	useimg:useimg,
    	useName:'1234556770000000',
    	imgurlicon:[{icon:icon1,text:'概况',iconShow:false,ifShow:false},{icon:icon2,text:'报告',iconShow:true,ifShow:true},{icon:icon3,text:'数据',iconShow:false,ifShow:false},{icon:icon4,text:'售点',iconShow:false,ifShow:true},{icon:icon5,text:'场景',iconShow:false,ifShow:true},{icon:icon6,text:'SKU',iconShow:false,ifShow:true},{icon:icon7,text:'设置',iconShow:false,ifShow:true}],
    }
  },
	computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 	},
  mounted(){
  	this.nowRoute()
  },
  methods:{
  	Signout(){
  		this.$router.push('/')
  	},
  	nowRoute(){
	  	switch (this.$router.currentRoute.path){
	  		case '/home/focusrepor':
	  		this.type = 1
	  		this.iconShow()
	  		this.reportStatus(1)
	  		break;
	  		case '/home/scenereport':
	  		this.type = 1
	  		this.iconShow()
	  		this.reportStatus(2)
	  		break;
	  		case '/home/freezerdetails':
	  		this.type = 1
	  		this.iconShow()
	  		this.activeF = false
	  		this.activeC = true
	  		break;
	  		case '/home/questionnaire':
	  		this.type = 4
	  		this.iconShow()
	  		break;
	  		case '/home/scenemanagement':
	  		this.type = 4
	  		this.iconShow()
	  		break;
	  		case '/home/distinguishsku':
	  		this.type = 5
	  		this.iconShow()
	  		this.skuStatus(1)
	  		break;
	  		case '/home/mustsku':
	  		this.type = 5
	  		this.iconShow()
	  		this.skuStatus(2)
	  		break;
	  		case '/home/importsku':
	  		this.type = 5
	  		this.iconShow()
	  		this.skuStatus(3)
	  		break;
	  		case '/home/administratorsettings':
	  		this.type = 6
	  		this.iconShow()
	  		this.adminStatus(1)
	  		break;
	  		case '/home/usermanagement':
	  		this.type = 6
	  		this.iconShow()
	  		this.adminStatus(2)
	  		break;
	  		case '/home/sellpoint':
	  		this.type = 3
	  		this.iconShow()
	  		break;
	  		default:
	  		break;
	  	}
  	},
  	adminStatus(num){
  		if(num === 1){
				this.activeAS = true
				this.activeUS = false
				this.$router.push('/home/administratorsettings')
  		}else{
				this.activeAS = false
				this.activeUS = true
				this.$router.push('/home/usermanagement')
  		}
  	},
  	admin(num){
  		this.adminStatus(num)
  	},
  	skuStatus(num){
  		this.topStatus = num
			if(num === 1){
					this.activeR = true
					this.activeM = false
					this.activeI = false
					this.$router.push('/home/distinguishsku')
			}else if(num === 2){
					this.activeR = false
					this.activeM = true
					this.activeI = false
					this.$router.push('/home/mustsku')
			}else{
					this.activeR = false
					this.activeM = false
					this.activeI = true
					this.$router.push('/home/importsku')
			}
  	},
  	Sku(num){
  		this.skuStatus(num)
  	},
  	reportStatus(num){
  		if(num === 1){
	  		this.activeF = true
	  		this.activeC = false
	  		this.$router.push('/home/focusreport')
  		}else{
	  		this.activeF = false
	  		this.activeC = true
	  		this.$router.push('/home/scenereport')
  		}
  	},
  	repeot(num){
  		this.reportStatus(num)
  	},
  	iconShow(){
  		for(var i=0;i<this.imgurlicon.length;i++){
  			this.imgurlicon[i].iconShow = false
  		}
  		this.imgurlicon[this.type].iconShow = true
  	},
  	iconClikc(index){
  		this.type = index
  		this.iconShow()
  		if(index === 4){
  			this.$router.push('/home/scenemanagement')
  		}else if(index === 1){
  			this.$router.push('/home/focusreport')
  			this.reportStatus(1)
  		}else if(index === 5){
  			this.$router.push('/home/distinguishsku')
  			this.skuStatus(1)
  		}else if(index ===6){
  			this.$router.push('/home/administratorsettings')
  			this.adminStatus(1)
  		}else if(index ===3){
  			this.$router.push('/home/sellpoint')
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
.home{
	height: 100%;
	width:1336px;
	margin:0 auto;
	display:flex;
	.centerLine{
		height:24px;
		margin-top:60px;
		width:89%;
		z-index: 1222;
		position: fixed;
		background:#F0F0F0;
	}
	.left{
		z-index: 999;
		float:left;
		height:100%;
		position: fixed;
		overflow: hidden;
		width:120px;
		.imglogo{
			background: #D61E2A;
			height:60px;
    	text-align: center;
			img{
				margin-top: 16px;
			}
		}
		.nav{
			background: #3D454D;
			padding:20px 0 0 0;
			height: 100%;
			.navli{
				height:40px;
				a{
					display: flex;
					align-items: center;
					justify-content: center;
					img{
						height:24px;
						margin-right: 2px;
					}
					span{
						opacity: 0.7;
						line-height: 40px;
						color:#FFFFFF ;
						font-size: 14px;
					}
				}
			}
			.navlibc{
				background:rgba(255,255,255,0.10);
			}
		}
	}
	.right{
		overflow: hidden;
		float:left;
		margin-left:120px;
		width:92%;
		.routerchild{
			margin-top:60px;
			overflow: hidden;
			background: #F0F0F0;
			padding:24px;
		}
		.top{
			z-index:1222;
			position: fixed;
			background:#fff;
			min-width: 600px;
			max-width: 1216px;
			width:99%;
		  height:60px;
			font-size: 14px;
			line-height:60px;
			.forcereport{
				display:inline-block;
				width:110px;
				height:60px;
				line-height:60px;
				margin-left: 24px;
				text-align: center;
				cursor: pointer;
				float: left;
			}
			.tv{
				margin-left:0;
				float: left;
			}
			.bgActive{
				color:#2D78B3;
				background: #F5F5F5;
			}
			span{
				margin-left: 37px;
				font-family: 'Microsoft YaHei';
				color: #333333;
			}
			@media only screen and (min-width:1336px) {
				.use{
					margin-right:30px;
				}
			}
			@media only screen and (min-width:1300px) and (max-width: 1336px) {
				.use{
					margin-right:5%;
				}
			}
			@media only screen and (min-width:1250px) and (max-width: 1300px) {
				.use{
					margin-right:8%;
				}
			}
			@media only screen and (min-width:1100px) and (max-width: 1250px) {
				.use{
					margin-right:10%;
				}
			}
			@media only screen and (min-width:900px) and (max-width: 1200px) {
				.use{
					margin-right:12%;
				}
			}
			@media only screen and (min-width:600px) and (max-width: 900px) {
				.use{
					margin-right:20%;
				}
			}
			@media only screen and (max-width:600px) {
				.use{
					margin-right:40%;
					display:none;
				}
			}
			.signout{
				cursor:pointer;
			}
			.use{
				float:right;
				img{
					width:30px;
					vertical-align: middle;
					height:30px;
					border-radius: 50%;
				}
				span{
					margin-left:10px;
					color:#4D4D4D;
					font-size:14px;
				}
				span:nth-of-type(2){
					font-size: 14px;
					margin-left:20px;
					color: #D61E2A;
				}
			}
		}
	}
}
</style>