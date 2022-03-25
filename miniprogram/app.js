App({

onLaunch()
{
  wx.cloud.init({
    env:'cloud1-0g3tfoahdcc89da8'
  })
  wx.login({
    complete: (res) => {
      console.log(res)
    },
  })

}

})
