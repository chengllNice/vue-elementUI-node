<template>
    <div class="">
      <el-steps space="15%" :active="activeStep">
        <el-step title="活动信息"></el-step>
        <el-step title="报名签到"></el-step>
        <el-step title="分享设置"></el-step>
        <el-step title="个性设置"></el-step>
      </el-steps>
      <router-view></router-view>
      <el-row>
        <el-col>
          <el-button v-if="stepBtn.preStep" @click="preStepHandler">上一步</el-button>
          <el-button v-if="stepBtn.preview" @click="previewHandler">预览</el-button>
          <el-button type="primary" v-if="stepBtn.nextStep" @click="nextStepHandler">下一步</el-button>
          <el-button type="primary" v-if="stepBtn.publicActive" @click="publicActiveHandler">发布活动</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
      name:'PublicIndex',
      data(){
        return {
          activeStep:1,
          stepBtn:{
            preStep:false,
            preview:false,
            nextStep:false,
            publicActive:true
          }
        }
      },
      computed:{
        ...mapState(['isPublicSuccess'])
      },
      methods:{
        preStepHandler(){
          this.$router.go(-1);
          this.activeStep--;
          this.goStep();
        },
        previewHandler(){
          this.$message({
            type:'info',
            message:'该功能正在完善'
          })
        },
        nextStepHandler(){
          this.$router.push(`/activePublic/page${this.activeStep+1}`)
          this.activeStep++;
          this.goStep()
        },
        publicActiveHandler(){
          this.$store.dispatch('submitForm_A');
          setTimeout(()=>{
            if(this.isPublicSuccess){
              this.$message({
                type:'success',
                message:'活动发布成功'
              })
            }
          },100)
        },
        goStep(){
          if(this.activeStep == 2 || this.activeStep == 3 || this.activeStep == 4){
            this.stepBtn.preStep = true;
          }else{
            this.stepBtn.preStep = false;
          }

          if(this.activeStep == 4){
            this.stepBtn.preview = true;
            this.stepBtn.publicActive = true;
            this.stepBtn.nextStep = false;
          }else{
            this.stepBtn.preview = false;
            this.stepBtn.publicActive = false;
            this.stepBtn.nextStep = true;
          }
        }
      }
    }
</script>
<style>
  .el-step__head.is-finish .is-text{
    background: #409EFF;
    color: #ffffff;
  }
  .el-step__title.is-finish,.el-step__title.is-wait{
    font-weight: 700;
    font-size: 14px;
  }
  .el-step__icon{
    width: 30px;
    height: 30px;
  }
</style>
