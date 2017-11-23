<template>
    <el-form :model="addressForm" :ref="addressForm">
      <el-row>
        <el-col :span="5">
          <el-form-item required>
            <el-select placeholder="请选择省" v-model="addressForm.province" @change="formatCity">
              <el-option v-for="item in addressForm.options.provinceData" :label="item.pro" :value="item.pro"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item required>
            <el-select placeholder="请选择市" v-model="addressForm.city" @change="formatDistrict">
              <el-option v-for="item in addressForm.options.cityData" :label="item.city" :value="item.city"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item required>
            <el-select placeholder="请选择县(区)" v-model="addressForm.district">
              <el-option v-for="item in addressForm.options.districtData" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="add-mar">
        <el-col :span="14">
          <el-form-item required>
            <el-input placeholder="请输入具体地址" v-model="addressForm.addVal"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
</template>
<script>
  import addressData from '../assets/addressData'
  import { mapState } from 'vuex'
    export default {
      name:'activeAddress',
      computed:{
        ...mapState(["addressForm"])
      },
      data(){
        return {
          /*addressForm:{
            province:this.formData.province,//省select绑定的model
            city:this.formData.city,//市select绑定的model
            district:this.formData.district,//县区select绑定的model
            addVal:this.formData.addVal,//输入的具体地址信息
            options:{//省市县所用数据
              provinceData:this.formatPro(addressData),//省数据
              cityData:[],//市数据
              districtData:[]//县数据
            }
          },*/
          /*rules:{
            province:[
              {required:true,message:'请选择省'}
            ],
            city:[
              {required:true,message:'请选择市'}
            ],
            district:[
              {required:true,message:'请选择县(区)'}
            ],
            addVal:[
              {required:true,message:'内容不能为空'}
            ]
          }*/
        }
      },
      methods:{
//        初始化省
        formatPro(addressData){
          let provinces = [];
          for(let item in addressData){
            provinces.push({
              pro: item
            })
          }
          return provinces;
        },
//        选择省改变城市
        formatCity(){
          let selectPro = this.addressForm.province;//当前选中的省
          let cityData = [];
          for(let item in addressData[selectPro]){
            cityData.push({
              city: item
            })
          }
          this.addressForm.city = cityData[0].city;//城市置为第一个
          this.formatDistrict();//调用城市选择的方法
          this.addressForm.options.cityData = cityData;
        },
//        选择城市改变县区
        formatDistrict(){
          let selectPro = this.addressForm.province;//获取选择的省
          let selectCity = this.addressForm.city;//获取选择的市
          let districtData = addressData[selectPro][selectCity];//当前选中所有县区的集合
          this.addressForm.district = districtData[0];//县区置为第一个
          this.addressForm.options.districtData = districtData;
        }
      },
      mounted(){
        this.addressForm.options.provinceData = this.formatPro(addressData)
      }
    }
</script>
<style>
.add-mar{
  margin-top: 15px;
}
</style>
