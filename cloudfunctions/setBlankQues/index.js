// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
//增加
exports.main = async (event, context) => {
  const answerResult = await db.collection('setQuestions').add({
      data:event.objQuestions
  })
  //.doc(event.uid)
/*   .doc(event.uid)
  .set({
      data: event.objQuestions,
  }) */
  if (answerResult.errMsg == 'collection.add:ok') {
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
//查询
/* exports.main = async (event, context) => {
    const answerResult = await db.collection('setQuestions').where({
        id: event.id
    })
    .get()
    if (answerResult.errMsg == 'collection.get:ok') {
      return {
          errcode: 0,
          errmsg: "OK",
          data: answerResult
      }
  } else {
      return {
          errcode: 1,
          errmsg: answerResult.errMsg
      }
  }
  
  
  } */