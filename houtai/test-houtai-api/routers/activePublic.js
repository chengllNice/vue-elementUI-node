let express = require('express');

let ActivePublic = require('../schema/activepublic')

let router = express.Router();

router.post('/sign',(req, res, next)=>{

  let formData = req.body.formData;
  // console.log(formData)
  new ActivePublic({
    name:formData.ruleForm.name,
    activeClassify:{
      activeClassifyData:formData.ruleForm.activeClassify.activeClassifyData,
      selectActiveClassify:formData.ruleForm.activeClassify.selectActiveClassify
    },
    activeTag:formData.ruleForm.activeTag,
    activeDateTime:{
      startDateTime:formData.activeDateTime.activeStartTimeTotal,
      endDateTime:formData.activeDateTime.activeEndTimeTotal
    },
    signDateTime:{
      startDateTime:formData.activeSignDateTime.signStartTimeTotal,
      endDateTime:formData.activeSignDateTime.signEndTimeTotal
    },
    address:{
      province:formData.addressForm.province,
      city:formData.addressForm.city,
      district:formData.addressForm.district,
      village:formData.addressForm.addVal
    },
    perNum:0,
    coverImg:'',
    introduce:formData.ruleForm.activeIntroduce,
    views:0,
    sign:0,
    wait:0
  }).save().then((data)=>{
    if(data){
      res.json({
        status:0,
        message:'',
        data:''
      })
    }
  });
});

module.exports = router;
