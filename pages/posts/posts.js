// pages/posts/posts.js
import newsData from '../../data/posts'

Page({
    data: {
        newsData: []
    },
    toDetail(ev) {
        let postId = ev.currentTarget.dataset.postid
        wx.navigateTo({
          url: 'detail/detail?id=' + postId
        })
    },
    swiper2detail(ev) {
        let postId = ev.target.dataset.postid
        wx.navigateTo({
            url: 'detail/detail?id=' + postId
        })
    },
    onLoad() {
        this.setData({
            newsData: newsData
        })
    }
})