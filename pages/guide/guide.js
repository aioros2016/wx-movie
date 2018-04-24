// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  enter() {
    wx.switchTab({
        url: '../posts/posts'
    })
  }
})