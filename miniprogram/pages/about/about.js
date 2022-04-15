import resumeData from '../utils/resumedata.js'
import { str } from "../utils/comstr.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeData: resumeData,
    code: str.code,
    showCode: '',
  },
  onShow() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  handleBack() {
    wx.switchTab({
      url: '/pages/more/more',
    })
  },


})