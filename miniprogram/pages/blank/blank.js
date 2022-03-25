// pages/blank/blank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
  },
  blankQuesIdList: [],
  getQuestions: {
    id: '',
    name: '',
    questions: [
      {
        id: 1,
        title: '',
        question_type: 'radio',
        options1: [
          {
            id: "A",
            value: '',
          },
          {
            id: "B",
            value: '',
          },
          {
            id: "C",
            value: '',
          },
        ]
      },
      {
        id: 2,
        title: '',
        question_type: 'checkbox',
        options2: [
          {
            id: "A",
            value: '',
          },
          {
            id: "B",
            value: '',
          },
          {
            id: "C",
            value: '',
          },
        ]
      },
      {
        id: 3,
        title: '',
        question_type: 'input',
      },
    ]
  },
  questionsOne: [],
  questionsTow: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenId()
    this.getBlankQues()
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
  /* 获取标题 */
  getHeader(e) {
    let name = e.detail.value
    this.getQuestions.name = name
  },
  /* 获取单选题 */
  getMiddle(e) {
    //拿到相应的点击id
    let qid = e.currentTarget.dataset.qid
    //拿到相应的点击的值
    let data = e.detail.value
    this.questionsOne.push(data)
    for (const iterator of this.getQuestions.questions) {
      if (iterator.id == 1) {
        iterator.title = '1.' + this.questionsOne[0]
        for (let i = 1; i <= this.questionsOne.length - 1; i++) {
          for (const iterator1 of iterator.options1) {
            if (iterator1.id == qid) {
              iterator1.value = this.questionsOne[i]
            }
          }
          console.log(i)
        }
      }
    }
  },
  /* 获取多选题 */
  getMiddleT(e) {
    let qid = e.currentTarget.dataset.qid
    //拿到相应的点击的值
    let data = e.detail.value
    this.questionsTow.push(data)
    for (const iterator of this.getQuestions.questions) {
      if (iterator.id == 2) {
        iterator.title = '2.' + this.questionsTow[0]
        for (let i = 1; i <= this.questionsTow.length - 1; i++) {
          for (const iterator1 of iterator.options2) {
            if (iterator1.id == qid) {
              iterator1.value = this.questionsTow[i]
            }
          }
          console.log(i)
        }
      }
    }
  },
  //获取填空题
  getButtom(e) {
    let buttonQues = e.detail.value
    for (const iterator of this.getQuestions.questions) {
      if (iterator.id == 3) {
        iterator.title = '3.' + buttonQues
      }
    }
  },
  async submitQuestions() {
    console.log(this.getQuestions)
    await wx.cloud.callFunction({
      name: 'setBlankQues',
      data: {
        uid: this.data.openid,
        objQuestions: this.getQuestions,
      }
    })
      .then((res) => {
        console.log(res)
        if (res.result.errcode == 0) {
          wx.showToast({
            title: '创建成功！',
            icon: 'success',
            mask: true,
          });
          let time = setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }, 2000)
          time()
        } else {
          wx.showToast({
            title: '创建失败',
            icon: 'error',
            mask: true,
          });
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  //获取创建空白问卷
  async getBlankQues() {
    await wx.cloud.callFunction({
      name: 'findBlankQues',
    })
      .then(res => {
        console.log(res.result.data)
        let blankQues = res.result.data
        blankQues.forEach(element => {
          element.id
          this.blankQuesIdList.push(element.id)
        });
        let blanckMaxId = this.blankQuesIdList[this.blankQuesIdList.length - 1]
        this.getQuestions.id = blanckMaxId + 1
      })
      .catch((err) => {
        console.log(err)
      })

  },
  onHide() {
    clearTimeout(time)
  }
})
//Page Object
