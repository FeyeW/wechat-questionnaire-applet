// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     moreFunction:[
       {
        id:1, 
        name:'关于我',
        src:'https://s1.ax1x.com/2022/03/15/bvxsIg.png',
        url:'/pages/about/about'
       },
       {
         id:2,
         name:'意见反馈',
         src:'https://s1.ax1x.com/2022/03/15/bvxEaF.png',
         url:'/pages/opinion/opinion'
       }
     ],
     userInfo: {},
     hasUserInfo: false,
     canIUse: wx.canIUse('button.open-type.getUserInfo'),
     canIUseGetUserProfile: false,
     canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res+'res')
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      fail:(err=>{
        console.log(err)
      })
    })
  },
})