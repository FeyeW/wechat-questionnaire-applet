// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
    // 云函数入口函数
exports.main = async(event, context) => {
    const answerResult = await db.collection('answer')
        .doc(event.uid)
        .set({
            data: event.objAnswer,
        })
    if (answerResult.errMsg == 'document.set:ok') {
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