// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
//查询
 exports.main = async (event, context) => {
    const answerResult = await db.collection('setQuestions').where({
        id: event.id
    })
    .get()
    if (answerResult.errMsg == 'collection.get:ok') {
      return {
          errcode: 0,
          errmsg: "OK",
          data: answerResult.data[0]
      }
  } else {
      return {
          errcode: 1,
          errmsg: answerResult.errMsg
      }
  }
  
  
  } 