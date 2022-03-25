// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addQuestions:[
      {
        id:1,
        name:'空白问卷',
        src:'https://s1.ax1x.com/2022/03/15/bvDfzV.png',
        url:'/pages/blank/blank'

      },
      {
        id:2,
        name:'投票',
        src:'https://s1.ax1x.com/2022/03/15/bv73VA.png',
        url:'/pages/vote/vote'
      },
      {
        id:3,
        name:'调研',
        src:'https://s1.ax1x.com/2022/03/15/bvg1Mt.png',
        url:'/pages/invest/invest'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})