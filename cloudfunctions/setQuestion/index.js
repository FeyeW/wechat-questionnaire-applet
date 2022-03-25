// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init(
)
const db = cloud.database()
    // 云函数入口函数
exports.main = async(event, context) => {
    const getQuery = await db.collection('setQuestions')
    .doc(event.uid)
    .set({
        data: event.objQuestions,
    })
    if (getQuery.errMsg == 'collection.get:ok') {
        return {
            errcode: 0,
            errmsg: "OK",
        }
    } else {
        return {
            errcode: 1,
            errmsg: getQuery.errMsg
        }
    }
}