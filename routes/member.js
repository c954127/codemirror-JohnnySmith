var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');  
var memberModel = require('../models/memberModel.js');
// 載入 jwt 函式庫協助處理建立/驗證 token
var jwt = require('jsonwebtoken')
// 載入設定
var config = require('../config')

//註冊會員
router.post('/addMember',function(req,res){
  var newmember = new memberModel({
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password, 10) //密碼加密
  })
  memberModel.count({account:req.body.email},function(err,data){
      if(data>0){
        res.json({"status":1,"msg":"信箱已經被註冊!"});
      }
      else{
        newmember.save(function(err, data){
            if(err){  res.json({"status":1,"msg":"error!"}); console.log("add error")}
            else{
              res.json({"status":0,"msg":"success","data":data});
              console.log("add success")
            } 
          });
      }
  });
});
//登入
router.post('/login',function(req,res){
  //console.log(config.secret)
  memberModel.findOne({email:req.body.email},function(err,user){
      if(user==null){
        res.json({"status":1,"msg":"無此帳號!"});
      }
      else{
        bcrypt.compare(req.body.password, user.password).then(function (confirm) {
            if(!confirm){
              res.json({"status":1,"msg":"密碼錯誤!"});
            }
            else{
              if(err){  res.json({"status":1,"msg":"error!"}); console.log("login error")}
              else{
                var token = jwt.sign(user.toJSON(), config.secret, {
                  expiresIn: 30
                })
                console.log(token);
                res.json({"status":0,"msg":"success","user":user,"token":token});
                console.log("login success");
              } 
            }
        });  
      }
  });
});
router.get('/token',function(req,res){
  console.log(123);
  console.log(req.headers['x-access-token']);
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  console.log(token);
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'})
      } else {
        res.json({"status":0,"msg":"success","token":token});
      }
    })
   
  }
  else{
      res.status(403).send({
        success: false,
        message: 'No token provided.'
    })
  } 
});




module.exports = router;
