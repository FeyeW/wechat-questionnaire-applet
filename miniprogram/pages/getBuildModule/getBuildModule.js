Page({
  data: {
    name: '',
    questions: '',
    answers: [],
    openid: null
  },
  qid: '',
  onLoad(options) {
    console.log(options)
    let qid = parseInt(options.qid)
    console.log(qid + 'qid')
    this.getQuestion(qid);
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
  getQuestion(qid) {
    wx.cloud.callFunction({
      name: 'getBlankQues',
      data: {
        id: qid
      }
    })
      .then(res => {
        console.log(res.result.data.name)
        if (res.result.errcode == 0) {
          this.setData({
            name: res.result.data.name,
            questions: res.result.data.questions
          })
          console.log(res.result.data.questions)
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
  submitAnswer() {
    const answers = this.data.answers.sort((a, b) => {
      a.id - b.id
    })
    const objAnswer = {
      //id: this.data.uid,
      answers: answers
    }

    wx.cloud.callFunction({
      name: 'getAnswer',
      data: {
        uid: this.data.openid,
        objAnswer: objAnswer,
      }
    })
      .then((res) => {
        console.log(res)
        if (res.result.errcode == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            mask: true,
          });
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'error',
            mask: true,
          });
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  onTextInput(e) {
    const qId = e.target.dataset.qid;
    const qType = e.target.dataset.qType;
    const text = e.detail.value;

    const newAnswer = {
      "id": qId,
      "question_type": qType,
      "text": text
    }
    this._addAnswer(newAnswer)
  },
  onRadioChange(e) {
    const qId = e.target.dataset.qid;
    const qType = e.target.dataset.qType;
    const optionId = e.detail.value;

    const tmpQ = this.data.questions.find((item) => {
      return item.id == qId
    })

    const tmpOption = tmpQ.options1.find((item) => {
      return item.id == optionId
    })
    console.log(e)
    const newAnswer = {
      "id": qId,
      "question_type": qType,
      "options1": [{
        "id": optionId,
        "value": tmpOption.value
      }]
    }
    this._addAnswer(newAnswer)
  },
  onCheckBoxChange(e) {
    const qId = e.target.dataset.qid;
    const qType = e.target.dataset.qType;
    const arrSelectedValue = e.detail.value;

    const tmpQ = this.data.questions.find((item) => {
      return item.id == qId
    })

    let tmpAnswerOptions = []
    arrSelectedValue.forEach(optionId => {
      let tmpOption = tmpQ.options2.find(item => {
        return item.id == optionId
      })
      console.log(tmpOption)
      if (tmpOption) {
        tmpAnswerOptions.push({
          "id": tmpOption.option_id,
          "value": tmpOption.value
        })
      }
    })

    tmpAnswerOptions.sort((a, b) => {
      return a.id > b.id ? 1 : -1
    })


    const newAnswer = {
      "id": qId,
      "question_type": qType,
      "options2": tmpAnswerOptions
    }
    this._addAnswer(newAnswer)
  },
  _addAnswer(newAnswer) {
    let tmpAnswers = this.data.answers;
    const foundIndex = tmpAnswers.findIndex((item) => {
      return item.id == newAnswer.id
    })
    if (foundIndex !== -1) {
      tmpAnswers.splice(foundIndex, 1, newAnswer)
    } else {
      tmpAnswers = [...tmpAnswers, newAnswer]
    }
    this.setData({
      answers: tmpAnswers
    })
  }
});
