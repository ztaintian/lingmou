<template>
  <div class="home">
  	<div class="left" id="left">
  		<div class="imglogo">
  			<img :src="imgurl" alt="">
  		</div>
  		<div class="nav">
	  		<div class="navli" v-for="v in imgurlicon">
  				<a href="javascript:;">
	  				<img :src="v.icon" alt="">
	  				<span>{{v.text}}</span>
  				</a>
	  		</div>
  		</div>
  	</div>
  	<div class="right" id="right">
  		<div class="top">
  			<span>场景管理 > 新建问卷</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>777777</span>
  			</div>
  		</div>
  		<div class="routerchild">
	  		<router-view/>
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
    	imgurl:logo,
    	useimg:useimg,
    	imgurlicon:[{icon:icon1,text:'概况'},{icon:icon2,text:'报告'},{icon:icon3,text:'数据'},{icon:icon4,text:'售点'},{icon:icon5,text:'场景'},{icon:icon6,text:'SKU'},{icon:icon7,text:'设置'}],
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
	height: 100%;
	max-width:1336px;
	min-width:1150px;
	margin:0 auto;
	display:flex;
	.left{
		z-index: 999;
		float:left;
		position: fixed;
		overflow: hidden;
		width:140px;
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
		}
	}
	.right{
		overflow: hidden;
		float:left;
		margin-left:140px;
		width:89.5%;
		.routerchild{
			overflow: hidden;
			background: #F0F0F0;
			padding:24px;
		}
		.top{
		  height:60px;
			font-size: 14px;
			line-height:60px;
			span{
				margin-left: 37px;
			}
			.use{
				float:right;
				margin-right:30px;
				img{
					width:30px;
					vertical-align: middle;
					height:30px;
				}
				span{
					margin-left:10px;
					color:#4D4D4D;
					font-size:14px;
				}
			}
		}
	}
}
</style>