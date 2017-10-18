<template>
  <div class="login">
		<Login :src = "srcurl" :aa.sync='pname' :srcA="srca" key="v.id" v-for="v in list"></Login>
		<button type="" @click="add">添加</button>
  <el-time-select
    v-model="time"
    placeholder="请指定打印日期">
  </el-time-select>
  </div>
</template>

<script>
import Login from '@/components/Login'
import iconradio from '@/assets/ic_not selected@1x.png'
import iconradioActive from '@/assets/ic_selected@1x.png'
export default {
  name: 'Test',
  components:{Login},
  data () {
    return {
      time:'',
    	srca:iconradio,
    	srcurl:iconradioActive,
    	list:[{}],
    	pname:false
    }
  },
  methods:{
  	add(){
  		console.log(111)
  		console.log(this.pname)
  		this.list.push({})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>