let express = require('express');

let ActiveList = require('../schema/activelist');
let ActivePublic = require('../schema/activepublic');

let router = express.Router();

router.get('/list', (req, res, next) => {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let skip = (page-1)*pageSize;
  ActivePublic.count().then((count)=>{
    let totalNum = count;
    ActivePublic.find({}).skip(skip).limit(pageSize).then((data)=>{

      /*let classify = [];
      data.forEach((item, index)=>{
        item.classify.forEach((classItem, indexItem)=>{
          console.log(classItem.selected)
          if(classItem.selected){
            classify.push(classItem)
          }
        });
      });*/

      if(data){
        res.json({
          status:0,
          message:'',
          data:data,
          totalNum:totalNum
        })
      }
    })
  })
});

router.get('/listSelectClassify',(req, res, next)=>{
  let selectIndex = parseInt(req.query.index);
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let skip = (page-1)*pageSize;
  console.log(page)
  if(selectIndex !== 0){
    ActivePublic.find({"activeClassify.selectActiveClassify.index":{"$eq":selectIndex}}).count().then((count)=>{
      let totalNum = count;
      ActivePublic.find({"activeClassify.selectActiveClassify.index":{"$eq":selectIndex}}).skip(skip).limit(pageSize).then((data)=>{
        res.json({
          status:0,
          message:'',
          data:data,
          totalNum:totalNum
        })
      })
    })
  }else{
    ActivePublic.count().then((count)=>{
      let totalNum = count;
      ActivePublic.find({}).skip(skip).limit(pageSize).then((data)=>{
        if(data){
          res.json({
            status:0,
            message:'',
            data:data,
            totalNum:totalNum
          })
        }
      })
    })
  }
});

router.post('/delList',(req, res, next)=>{
  let idArr = req.body.idArr;
  ActivePublic.remove({"_id":{"$in":idArr}},(err)=>{
    res.json({
      status:0,
      message:'',
      data:''
    })
  })
});


module.exports = router;
