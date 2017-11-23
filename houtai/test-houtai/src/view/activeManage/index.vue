<template>
    <div class="">
      <el-row>
        <el-col :span="6" v-for="item in activeTotal" class="total-col">
          <el-row class="total-row">
            <el-col>{{item.num}}</el-col>
            <el-col>{{item.classify}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-row class="member-row">
            <el-col>{{member.num}}</el-col>
            <el-col>{{member.operat}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-card class="content">
        <div>
          <h3>活动列表</h3>
          <el-row style="margin-bottom: 30px;">
            <el-col :span="3" style="padding: 8px 0;text-align: center">
              已选择{{selectedNum}}个活动
            </el-col>
            <el-col :span="3">
              <el-select v-model="activeListData.selectedValue" style="width: 120px;" @change="selectClassify">
                <el-option v-for="item in activeListData.activeClassify" :label="item.label" :key="item.index" :value="item.index"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="danger" @click="delTableCol">删除</el-button>
            </el-col>
            <el-col :span="2">
              <el-button>置顶</el-button>
            </el-col>
            <el-col :span="2">
              <el-button>复制</el-button>
            </el-col>
          </el-row>
          <el-table :data="activeListData.activeList" @selection-change="selectedTableCol">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="activeClassify.selectActiveClassify.name" label="活动分类"></el-table-column>
            <el-table-column prop="status" label="活动状态"></el-table-column>
            <el-table-column prop="views" label="浏览数"></el-table-column>
            <el-table-column prop="sign" label="报名数"></el-table-column>
            <el-table-column prop="wait" label="待审核"></el-table-column>
            <el-table-column prop="opera" label="操作">
              <template slot-scope="scope">
                <el-button type="text">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-pagination class="page" :current-page.sync="currentPage" :total="totalNum" :page-size="pageSize" @current-change="pageChangeHanlder"></el-pagination>

      <el-dialog title="提示" :visible.sync="isVisible">
        <div>确定删除么？</div>
        <div slot="footer">
          <el-button @click="isVisible=false">取 消</el-button>
          <el-button type="primary" @click="sureDelTableCol">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import axios from 'axios'
  const ERR_OK = 0;
    export default {
      name:'activeManage',
      data(){
        return {
          delTableColId:[],
          selectIndex:0,
          isVisible:false,
          currentPage:1,//当前页码
          pageSize: 5,
          totalNum:0,
          activeTotal:[
            {num:3,classify:'活动总数'},
            {num:3,classify:'报名总数'},
            {num:15,classify:'待审核'},
          ],
          member:{num:'3',operat:'查看会员'},
          activeListData:{
            activeClassify:[
              {label:'全部',index:0},
              {label:'测试活动',index:1},
              {label:'免费活动',index:2},
              {label:'收费活动',index:3}
            ],
            selectedValue:'全部',
            activeList:[]
          },
          selectedNum:0
        }
      },
      methods:{
        init(){
          axios.get('/activeManage/list',{
            params:{
              page:this.currentPage,
              pageSize:this.pageSize
            }
          }).then((response) => {
            let res = response.data;
            if(res.status === ERR_OK){
              let dataList = res.data;
              this.formatDateStatus(dataList);
              this.totalNum = res.totalNum;
              this.activeListData.activeList = dataList;
            }
          })
        },
        selectClassify(item){
          this.currentPage = 1;
          this.selectIndex = item;
          axios.get('/activeManage/listSelectClassify',{
            params:{
              index:item,
              page:this.currentPage,
              pageSize:this.pageSize
            }
          }).then((response)=>{
            let res = response.data;
            this.totalNum = res.totalNum;
            this.activeListData.activeList = res.data
          })
        },
        selectedTableCol(val){
          this.selectedNum = val.length;
          this.delTableColId = [];
          for(let i in val){
            this.delTableColId.push(val[i]._id)
          }
        },
        delTableCol(){
          this.isVisible = true;
        },
        sureDelTableCol(){
          let delTableColId = this.delTableColId;
          axios.post('/activeManage/delList',{
            idArr:delTableColId
          }).then((response)=>{
            let res = response.data;
            if(res.status === ERR_OK){
              this.selectClassify(this.selectIndex);
              this.isVisible = false;
              this.$message({
                type:'success',
                message:'删除成功'
              })
            }
          })
        },
        pageChangeHanlder(currentPage){
          axios.get('/activeManage/listSelectClassify',{
            params:{
              index:this.selectIndex,
              page:currentPage,
              pageSize: this.pageSize,
            }
          }).then((response)=>{
            let res = response.data;
            let dataList = res.data;
            this.formatDateStatus(dataList);
            this.totalNum = res.totalNum;
            this.activeListData.activeList = dataList
          })
        },
        formatDateStatus(dataList){
          let status = '';
          let nowDate = new Date();
          let nowTime = nowDate.getTime();
          dataList.forEach((item, index)=>{
            let endDateTime = item.activeDateTime.endDateTime;
            let startDateTime = item.activeDateTime.startDateTime;
            if(startDateTime - nowTime > 0){
              status = '活动未开始';
              if(endDateTime - nowTime>0){
                status = '活动进行中';
              }else{
                status = '活动已结束';
              }
            }
            item.status = status;
          });
        }
      },
      mounted(){
        this.init()
      }
    }
</script>
<style>
  .total-col{
    padding: 30px 0;
    background: rgb(54,204,204);
    font-size: 20px;
  }
  .total-row{
    padding: 30px;
    background: rgb(54,204,204);
    color: #ffffff;
    text-align: center;
  }
  .total-col:nth-child(2)>.total-row{
    border-left:1px solid #ffffff;
    border-right:1px solid #ffffff;
  }
  .member-row{
    padding: 60px;
    background: rgb(48,145,242);
    color: #ffffff;
    text-align: center;
    font-size: 20px;
  }
  .content{
    margin-top: 100px;
  }
  .page{
    margin-top: 30px;
  }
</style>
