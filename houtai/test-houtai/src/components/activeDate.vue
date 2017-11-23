<template>
  <el-form :model="dateForm" :rules="dateRules" ref="dateForm" :status-icon="true" label-position="top">
    <el-form-item>
      <el-row>
        <el-col :span="3">
          <el-form-item prop="startDate">
            <el-date-picker :placeholder="activeName+'开始日期'" v-model="dateForm.startDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="startTime">
            <!--<el-time-select :picker-options="{start:'00:00',step:'00:30',end:'23:00'}" placeholder="活动开始时间"></el-time-select>-->
            <el-time-picker type="fiexd-time" :picker-options="{selectableRange:'00:00:00 - 23:59:59'}" :placeholder="activeName+'开始时间'" v-model="dateForm.startTime"></el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align: center">—</el-col>
        <el-col :span="3">
          <el-form-item prop="endDate">
            <el-date-picker :placeholder="activeName+'结束日期'" v-model="dateForm.endDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="endTime">
            <!--<el-time-select :picker-options="{start:'00:00',step:'00:30',end:'23:00'}" placeholder="活动开始时间"></el-time-select>-->
            <el-time-picker type="fixed-time" :picker-options="{selectableRange:'00:00:00 - 23:59:59'}" :placeholder="activeName+'结束时间'" v-model="dateForm.endTime"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
  import { mapState } from 'vuex'
    export default {
      name:'date',
      props:['activeName'],
      data(){
//        自定义开始日期验证规则
        let startDateValidator = (rule, value, callback) => {
          let activeName = this.activeName;
          if(!value){
            return callback(new Error(`请选择${activeName}开始日期`))
          }else{
            callback()
          }
        };
//        自定义开始时间的验证规则
        let startTimeValidator = (rule, value, callback) => {
          let valDate = this.getValue();
          let activeName = this.activeName;
          let startDate = valDate.startDate;
          if(!startDate){
            return callback(new Error(`请先选择${activeName}开始日期`))
          }

          if(!value){
            callback(new Error(`请先选择${activeName}开始时间`))
          }else{
            callback()
          }
        };
//        自定义结束日期的验证规则
        let minEndDateValidator = (rule, value, callback) => {
          let valDate = this.getValue();
          let activeName = this.activeName;
          let startDate = valDate.startDate;
          let startTime = valDate.startTime;
          if(!value){
            return callback(new Error(`请先选择${activeName}结束日期`))
          }

          if(!startDate){
            return callback(new Error(`请先选择${activeName}开始日期`))
          }else if(!startTime){
            return callback(new Error(`请先选择${activeName}开始时间`))
          }

          if(value<startDate){
            callback(new Error("结束日期不能小于开始日期"))
          }else{
            callback()
          }
        };
//        自定义结束时间验证规则
        let minEndTimeValidator = (rule, value, callback) => {
          let valDate = this.getValue();
          let activeName = this.activeName;
          let startDate = valDate.startDate;
          let startTime = valDate.startTime;
          let endDate = valDate.endDate;
          if(!value){
            return callback(new Error(`请先选择${activeName}结束时间`))
          }

          if(!startDate){
            callback(new Error(`请先选择${activeName}开始日期`))
          }else if(!startTime){
            callback(new Error(`请先选择${activeName}开始时间`))
          }else if(!endDate){
            callback(new Error(`请先选择${activeName}结束日期`))
          }else {
            callback()
          }
        };
        return {
          dateForm:{},
          dateRules:{
            startDate:[
              {type:"date", reqiured:true, validator: startDateValidator, trigger:'change'}
            ],
            startTime:[
              {type:"date", reqiured:true, validator: startTimeValidator, trigger:'change'}
            ],
            endDate:[
              {type:"date", reqiured:true, validator: minEndDateValidator, trigger:'change'}
            ],
            endTime:[
              {type:"date", reqiured:true, validator: minEndTimeValidator, trigger:'change'}
            ]
          }
        }
      },
      computed:{
        ...mapState(['activeDateTime','activeSignDateTime'])
      },
      methods: {
        init(){
          let activeName = this.activeName;
          if(activeName === '活动'){
            this.dateForm = this.$store.state.activeDateTime
          }else if(activeName === '报名'){
            this.dateForm = this.$store.state.activeSignDateTime
          }
        },
        getValue(){
          let activeName = this.activeName;

          let startDate = this.dateForm.startDate;
          let startTime = this.dateForm.startTime;
          let endDate = this.dateForm.endDate;

          return {
            activeName:activeName,
            startDate:startDate,
            startTime:startTime,
            endDate:endDate
          }
        }
      },
      mounted(){
        this.init()
      }
    }
</script>
<style>

</style>
