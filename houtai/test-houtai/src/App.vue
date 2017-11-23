<template>
  <div id="app">
    <header class="header-fixed">
      <el-row>
        <el-col :span="24">
          <el-menu mode="horizontal" active-text-color="#20a0ff" default-active="5" background-color="#eff2f7" class="el-menu-padding" @select="">
            <el-menu-item index="1">高级插件</el-menu-item>
            <el-menu-item index="2">在线商城</el-menu-item>
            <el-menu-item index="3">客户管理</el-menu-item>
            <el-menu-item index="4">系统设置</el-menu-item>
            <el-menu-item index="5">活动发布</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header>
    <div class="header-box"></div>


    <el-container class="container">
      <el-aside width="200px" style="height: auto">
        <el-menu :default-active="menu.defaultMenu" class="el-menu-demo">
          <el-menu-item v-for="item in menu.menuData" :index="item.index" @click="menuHandler(item.index,item.route)">{{item.name}}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      menu:{
        defaultMenu:'aside-1',
        menuData:[
          {name:'活动发布',index:'aside-1',route:'/activePublic'},
          {name:'活动管理',index:'aside-2',route:'/activeManage'},
        ]
      },
    }
  },
  methods:{
    menuHandler(index,route){
      this.menu.defaultMenu = index;
      this.$router.push(route)
    }
  },
  mounted () {
    this.$router.push('/activePublic')
  }
}
</script>

<style>
  body,html{
    margin: 0;
    padding: 0;
  }
/*  header部分*/
  .header-fixed{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    border-top: 5px solid #20a0ff;
    background: #eff2f7;
    min-width: 1200px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12);
  }
  .el-menu-padding{
    padding-left: 300px;
    background: #eff2f7;
  }
  .header-fixed .el-menu>*{
    background: #eff2f7!important;
  }
  .header-fixed .el-menu>*:hover{
    border-bottom: 5px solid #20a0ff!important;
  }
  .header-fixed .el-menu>.is-active{
    border-bottom: 5px solid #20a0ff!important;
  }
  .header-box{
    height: 60px;
  }

/*  container部分*/
  .container{
    padding: 40px;
    background: #E9ECF1;
  }

  .el-aside{
    background: #ffffff;
  }
  .el-aside>.el-menu{
    border:none;
  }

/*  主题内容部分*/
  .main{
    background: #fff;
    padding: 50px 70px;
  }
</style>
