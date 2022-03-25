// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
//增加
exports.main = async (event, context) => {
  const answerResult = await db.collection('setQuestions').where({
    id:event.id
  }).remove()
  if (answerResult.errMsg == 'collection.remove:ok') {
    return {
        errcode: 0,
        errmsg: "OK",
    }
} else {
    return {
        errcode: 1,
        errmsg: answerResult.errMsg
    }
}


}