import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

let state = {
  ruleFormSate:{//表单数据
    name:'' ,//活动名称
    activeClassify:{//活动分类
      activeClassifyData:[
        {name:'测试活动',index:1},
        {name:'免费活动',index:2},
        {name:'收费活动',index:3}
      ],
      selectedIndex:1,
      selectedName:'',
      selectActiveClassify:{},//选中的分类
      addClassify:{//活动分类弹窗表单
        name:'',
        isAddClassifyLen:false//表单中输入框是否禁用（活动分类的长度不能大于5）
      },
    },
    activeTag:[//活动标签
      {name:"嘿嘿",index:1},
      {name:"嘻嘻",index:2}
    ],
    activePerNumLimit:{//活动人数限制
      isLimit:'无限制',
      isLimitData:[
        {name:'无限制'},
        {name:'限制'}
      ],
      activePerNum:'',
      isLimitNum:true,
    },
    activeIntroduce:'',//活动简介
    signUpUserInfo:{//报名用户信息展示部分
      signUpUserInfoData:[
        {name:'不展示'},
        {name:'展示报名人数'},
        {name:'展示报名清单'},
        {name:'报名成功显示完整用户资料'}
      ],
      signUpUserInfoModel:'不展示'
    },
    commit:{//评论功能
      commitData:[
        {name:'不开启'},
        {name:'实时评论'},
        {name:'审核后评论'}
      ],
      commitModel:'不开启'
    },
    ads:{//广告信息
      title:'',
      content:'',
      url:''
    }
  },
  addressForm:{//地址组件使用
    province:'',
    city:'',
    district:'',
    addVal:'',
    options:{
      provinceData:[],//省数据
      cityData:[],//市数据
      districtData:[]//县数据
    }
  },
  activeDateTime:{//活动时间
    startDate:'',
    startTime:'',
    endDate:'',
    endTime:''
  },
  activeTimeTotal:{//活动格式化时间
    activeStartTimeTotal:'',
    activeEndTimeTotal:''
  },
  activeSignDateTime:{//报名时间
    startDate:'',
    startTime:'',
    endDate:'',
    endTime:''
  },
  signTimeTotal:{//报名格式化时间
    signStartTimeTotal:'',
    signEndTimeTotal:''
  },
  isPublicSuccess:false//活动是否发布成功
};

let mutations = {
  isAddClassify_M(state){
    state.ruleFormSate.activeClassify.addClassify.isAddClassifyLen = false;
  },
  //格式化日期时间--->转化为毫秒
  formatDate_M(state){
    let nowDate1 = new Date().toLocaleDateString();
    let nowDate2 = new Date(nowDate1);

    let activeStartTime = state.activeDateTime.startTime - nowDate2;
    let activeEndTime = state.activeDateTime.endTime - nowDate2;
    let activeStartDate = new Date(state.activeDateTime.startDate).getTime();
    let activeEndDate = new Date(state.activeDateTime.endDate).getTime();
    let activeStartTimeTotal = activeStartDate + activeStartTime;
    let activeEndTimeTotal = activeEndDate + activeEndTime;

    let signStartTime = state.activeSignDateTime.startTime - nowDate2;
    let signEndTime = state.activeSignDateTime.endTime - nowDate2;
    let signStartDate = new Date(state.activeSignDateTime.startDate).getTime();
    let signEndDate = new Date(state.activeSignDateTime.endDate).getTime();
    let signStartTimeTotal = signStartDate + signStartTime;
    let signEndTimeTotal = signEndDate + signEndTime;

    state.activeTimeTotal.activeStartTimeTotal = activeStartTimeTotal;
    state.activeTimeTotal.activeEndTimeTotal = activeEndTimeTotal;

    state.signTimeTotal.signStartTimeTotal = signStartTimeTotal;
    state.signTimeTotal.signEndTimeTotal = signEndTimeTotal;
  },
  //格式化活动分类数据
  formatSelectedClassify_M(state){
    let selectedIndex = state.ruleFormSate.activeClassify.selectedIndex;
    let classify = state.ruleFormSate.activeClassify.activeClassifyData;
    classify.forEach((item, index)=>{
      if(item.index === selectedIndex){
        state.ruleFormSate.activeClassify.selectActiveClassify = item;
      }
    })
  },
  //活动是否发布成功
  isPublicSuccess_M(state){
    state.isPublicSuccess = true;
  }
};

let actions = {
  //表单提交的事件
  submitForm_A({commit, state}){
    commit('formatDate_M');
    commit('formatSelectedClassify_M');
    let formData = {
      ruleForm:state.ruleFormSate,
      addressForm:state.addressForm,
      activeDateTime:state.activeTimeTotal,
      activeSignDateTime:state.signTimeTotal
    };
    console.log(formData)
    axios.post('/activePublic/sign',{
      formData:formData
    }).then((response)=>{
      let res = response.data;
      if(res.status === 0){
        commit('isPublicSuccess_M')
      }
    })
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})
