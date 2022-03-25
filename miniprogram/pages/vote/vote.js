// pages/invest/invest.js
Page({
  data: {
    qid:[6,7,8,9,10],
    nameList:'',
  },

onLoad()
{

  this.getQuestion()
  this.getOpenId() 
},
getOpenId() {
  wx.cloud.callFunction({   
          name: 'getOpenId',
      })
      .then(res => {
          this.setData({
              openid: res.result.openid
          })
      })
      .catch()
},
async getQuestion() {
 let qid=this.data.qid
 let List=[]
 for (const iterator of  qid) {
 await wx.cloud.callFunction({
    name: 'getQuestion',
    data: {
        qid: iterator
    }
})
 .then(res => { 
    if (res.result.errcode == 0) {
      List.push(res.result.data.name)
          this.setData({
          nameList: List,
        })
    } else {
        wx.showToast({
            title: '查询题目失败',
            icon: 'error'
        })
    }
})
.catch((err) => {
    console.log(err)
})
 }

},
handleUrl(e)
{
  let qid=e.currentTarget.dataset.qid+6
  wx.navigateTo({
    url: '/pages/quesModule/quesModule?qid='+qid,
  })
}
})