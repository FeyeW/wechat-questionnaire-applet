// pages/invest/invest.js
Page({
  data: {
    qid: '',
    nameList: '',
  },
  deleteId: '',
  isDelete: false,
  onLoad() {
    this.getQuestion()
    this.getOpenId()
    //console.log('我是个人中心tab栏')
  },
  onShow() {
    this.getBlankQues()
    console.log(this.isDelete)
    if (this.isDelete) {
      console.log(this.isDelete)
      this.handleDelete()
    }
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
    let qid = this.data.qid
    let List = []
    for (const iterator of qid) {
      await wx.cloud.callFunction({
        name: 'getBlankQues',
        data: {
          id: iterator
        }
      })
        .then(res => {
          //console.log(res)
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
  handleUrl(e) {
    let qid = e.currentTarget.dataset.qid + 10
    wx.navigateTo({
      url: '/pages/getBuildModule/getBuildModule?qid=' + qid,
    })
  },
  //获取创建空白问卷
  async getBlankQues() {
    let qid = []
    let nameList = []
    await wx.cloud.callFunction({
      name: 'findBlankQues',
    })
      .then(res => {
        //console.log(res.result.data)
        let blankQues = res.result.data
        blankQues.forEach(element => {
          qid.push(element.id)
          nameList.push(element.name)
        });
        if (res.result.errcode == 0) {
          this.setData({
            qid,
            nameList
          })
          //console.log(this.data.qid)
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

  },
  //删除问卷事件
  async handleDelete(e) {
    this.isDelete = true
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id + 10
    /*     await wx.cloud.callFunction({
          name: 'deleteBlankQues',
          data: {
            id: id
          }
        }).then(res => {
          if (res.result.errcode == 0) {
            wx.showToast({
              title: '删除成功！',
              icon: 'success'
            })
            setTimeout(() => {
              console.log('我在返回！')
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000)
            // time()
          }
          else {
            wx.showToast({
              title: '删除失败！',
              icon: 'error'
            })
          }
        }) */
  },

})