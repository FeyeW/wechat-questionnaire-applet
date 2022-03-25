// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
   const Result=await db.collection('setQuestions').get()
   if (Result.errMsg == 'collection.get:ok') {
     return {
         errcode: 0,
         errmsg: "OK",
         data: Result.data
     }
 }

}