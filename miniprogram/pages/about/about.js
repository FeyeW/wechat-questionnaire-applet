import resumeData from '../utils/resumedata.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeData: resumeData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.resumeData)
  },
  handleBack() {
    wx.switchTab({
      url: '/pages/more/more',
    })
  }

})