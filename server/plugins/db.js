module.exports = app => {
     const mongoose = require("mongoose")
     mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
         useNewUrlParser:true
     })


     require('require-all')(__dirname+'/../models')  //把所有模型都引入过来，防止报错
}