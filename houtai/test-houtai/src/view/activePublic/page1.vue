<template>
    <div class="">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :status-icon="true" label-position="top">

        <!--活动名称-->
        <el-form-item label="活动名称" prop="name" required>
          <el-input placeholder="测试内容" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <!--活动分类-->
        <el-form-item label="" required>
          <el-row>
            <el-col :span="2">
              <label class="el-form-item__label">活动分类</label>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="setActiveClassify">设置</el-button>
            </el-col>
          </el-row>
          <el-radio-group v-model="ruleForm.activeClassify.selectedIndex">
            <el-radio v-for="item in ruleForm.activeClassify.activeClassifyData" :label="item.index" size="large">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--活动标签-->
        <el-form-item label="活动标签" prop="activeTag" required>
          <el-tag closable v-for="tag in ruleForm.activeTag" :key="tag.name" @close="handlerClose(tag)">{{tag.name}}</el-tag>
          <el-button icon="el-icon-plus" size="large" @click="addActiveTag"></el-button>
        </el-form-item>

        <!--活动时间-->
        <el-form-item label="活动时间" required>
          <active-date activeName="活动"></active-date>
        </el-form-item>

        <!--报名时间-->
        <el-form-item label="报名时间" required>
          <active-date activeName="报名"></active-date>
        </el-form-item>

        <!--活动地点-->
        <el-form-item label="活动地点" required>
          <active-address></active-address>
        </el-form-item>

        <!--活动人数-->
        <el-form-item label="活动人数">
          <el-row>
            <el-col :span="4">
              <el-radio v-model="ruleForm.activePerNumLimit.isLimit" v-for="item in ruleForm.activePerNumLimit.isLimitData" :label="item.name" @change="getLimit">{{item.name}}</el-radio>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="activePerNumLimit">
                <el-input placeholder="输入限制人数" v-model="ruleForm.activePerNumLimit.activePerNum" :disabled="ruleForm.activePerNumLimit.isLimitNum">
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <!--活动封面-->
        <el-form-item label="活动封面" prop="activeCover">
          <el-upload drag action="">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>

        <!--活动简介-->
        <el-form-item label="活动简介" prop="activeIntroduce">
          <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="ruleForm.activeIntroduce"></el-input>
        </el-form-item>

        <!--报名用户信息展示-->
        <el-form-item label="报名用户信息展示">
          <el-radio v-for="item in ruleForm.signUpUserInfo.signUpUserInfoData" v-model="ruleForm.signUpUserInfo.signUpUserInfoModel" :label="item.name">{{item.name}}</el-radio>
        </el-form-item>

        <!--评论功能-->
        <el-form-item label="评论功能">
          <el-radio v-for="item in ruleForm.commit.commitData" v-model="ruleForm.commit.commitModel" :label="item.name">{{item.name}}</el-radio>
        </el-form-item>

        <!--赞助广告-->
        <el-form-item prop="activeAds">
          <el-row>
            <el-col :span="2">
              <label class="el-form-item__label">赞助广告</label>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="openAds">开通赞助广告</el-button>
            </el-col>
          </el-row>

          <el-upload drag action="">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="广告信息">
          <el-input placeholder="请输入广告标题" v-model="ruleForm.ads.title"></el-input>
          <div style="margin: 15px 0 12px 0;">
            <el-input placeholder="请输入广告内容" type="textarea" :rows="5" v-model="ruleForm.ads.content"></el-input>
          </div>
          <el-input placeholder="请输入广告链接地址" v-model="ruleForm.ads.url">
            <template slot="prepend">http://</template>
            <template slot="append">.com</template>
          </el-input>
        </el-form-item>
      </el-form>

      <!--活动标签添加弹窗-->
      <el-dialog title="添加活动标签" :visible.sync="activeTagDialog">
        <el-form :model="dislogForm" :rules="dislogRules" required>
          <el-form-item prop="tagName">
            <el-input placeholder="请输入活动标签的名称" v-model="dislogForm.tagName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="default" @click="activeTagDialog = false">取 消</el-button>
          <el-button type="primary" @click="sureAddActiveTag">确 定</el-button>
        </div>
      </el-dialog>

      <!--活动分类设置弹窗-->
      <el-dialog title="设置活动分类" :visible.sync="setActiveClassifyDialog">
        <el-tag v-for="item in ruleForm.activeClassify.activeClassifyData" closable :key="item.name" @close="removeActiveClassify(item)">{{item.name}}</el-tag>
        <el-form class="ActiveClassifyDialog" :model="ActiveClassifyForm" :rules="ActiveClassifyRules">
          <el-form-item>
            <el-input placeholder="请输入添加分类的名称" v-model="ActiveClassifyForm.name" :disabled="ActiveClassifyForm.isActiveClassifyLen"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setActiveClassifyDialog = false">取 消</el-button>
          <el-button type="primary" :disabled="ActiveClassifyForm.isActiveClassifyLen" @click="sureAddActiveClassify">添 加</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
  import activeDate from '../../components/activeDate.vue'
  import activeAddress from '../../components/activeAddress.vue'

  import { mapState } from 'vuex'
  import axios from 'axios'
    export default {
      components:{
        'active-date':activeDate,//日期时间组件
        'active-address':activeAddress//地址组件
      },
      computed:{
        ...mapState(['ruleFormSate'])
      },
      data(){
//        活动人数输入验证
        let activePerNumValidator = (rule, value, callback) => {
          let valueNum = value.activePerNum;
          if(!valueNum){
            return callback('值不能为空')
          }
          if(!isNaN(valueNum)){
            callback()
          }else{
            callback(new Error('请输入数字'))
          }
        };
        return {
          activeTagDialog:false,//活动标签弹窗隐藏
          setActiveClassifyDialog:false,//活动分类弹窗隐藏
          rules:{
            name:[//活动名称验证
              {required:true, message:'请输入活动名称'}
            ],
            activePerNumLimit:[//活动人数验证
              {validator: activePerNumValidator}
            ]
          },
          ruleForm:this.$store.state.ruleFormSate,
          dislogForm:{//添加活动标签弹窗的表单
            tagName:''
          },
          dislogRules:{//添加活动标签弹窗的表单验证规则
            tagName:[
              {required:true, message:'内容不能为空'},
              {min:2, max:5, message:'请输入2-5个字符'}
            ]
          },
          ActiveClassifyForm:{//活动分类弹窗表单
            name:'',
            isActiveClassifyLen:false//表单中输入框是否禁用（活动分类的长度不能大于5）
          },
          ActiveClassifyRules:{//活动分类弹窗表单验证规则
            name:[
              {required:true, message:'内容不能为空'},
              {min:2, max:15, message:'请输入2-15个字符'}
            ]
          }
        }
      },
      watch:{

      },
      methods:{
//        设置活动分类的公用方法(判断是否可以添加活动分类，当分类数量小于5时可添加)
        commentActiveClassify(){
          let len = this.ruleForm.activeClassify.activeClassifyData.length;
          if(len>=5){
            this.ActiveClassifyForm.isActiveClassifyLen = true;
            this.$message({
              type:'warning',
              message:'活动分类不能超过5个'
            })
          }else{
            this.ActiveClassifyForm.isActiveClassifyLen = false;
          }
        },
//        活动分类设置
        setActiveClassify(){
          this.commentActiveClassify();
          this.setActiveClassifyDialog = true;
        },
//        删除活动分类
        removeActiveClassify(item){
          let activeClassifyData = this.ruleForm.activeClassify.activeClassifyData;
          let index = activeClassifyData.indexOf(item);
          this.ruleForm.activeClassify.activeClassifyData.splice(index,1)
          this.commentActiveClassify();
        },
//        添加活动分类
        sureAddActiveClassify(){
          let activeClassifyData = this.ruleForm.activeClassify.activeClassifyData;
          let len = activeClassifyData.length+1;
          let name = this.ActiveClassifyForm.name;
          activeClassifyData.push({
            name:name,
            index:len
          });
          this.commentActiveClassify();
        },
//        活动标签关闭的方法
        handlerClose(tag){
          let index = this.ruleForm.activeTag.indexOf(tag);
          this.ruleForm.activeTag.splice(index,1)
        },
//        活动标签添加的方法
        addActiveTag(){
          let len = this.ruleForm.activeTag.length;
          if(len>=5){
            this.$message({
              type:'warning',
              message:'活动标签不能超过5个'
            })
          }else{
            this.activeTagDialog = true;
          }
        },
        //        添加活动标签
        sureAddActiveTag(){
          let activeTag = this.ruleForm.activeTag;
          let tagName = this.dislogForm.tagName;//获取弹窗中输入的活动标签的名字
//          判断添加的标签是否已经存在
          for(let item in activeTag){
            if(tagName == activeTag[item].name) {
              this.$message({
                type: 'warning',
                message: '该标签已经存在'
              });
              return;
            }
          }

//          把获取的名字添加到页面
          this.ruleForm.activeTag.push({
            name:tagName
          })
          this.$alert('活动标签添加成功','提示',{
            confirmButtonText:'确定',
            callback:()=>{
              this.activeTagDialog = false;
            }
          })
        },
//        活动人数判断是否限制
        getLimit(){
          let isLimit = this.ruleForm.activePerNumLimit.isLimit;
          if(isLimit == '限制'){
            this.ruleForm.activePerNumLimit.isLimitNum = false
          }else{
            this.ruleForm.activePerNumLimit.isLimitNum = true
          }
        },
//        开通赞助广告
        openAds(){
          this.$message({
            type:'warning',
            message:'该功能正在完善'
          })
        }
      }
    }
</script>
<style>
  .el-form-item__label{
    line-height: 35px;
    padding: 0!important;
  }
  .el-tag{
    height: 40px;
    line-height: 40px;
    margin-right: 5px;
  }
  .el-date-editor.el-input{
    width: 160px;
  }
  .el-upload-dragger{
    background: #f9fafc;
  }
  .ActiveClassifyDialog{
    margin-top: 20px;
  }
</style>
