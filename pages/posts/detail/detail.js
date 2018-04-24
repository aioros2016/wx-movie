// pages/posts/detail/detail.js
const APP = getApp()
import newsData from '../../../data/posts.js'

Page({
    data: {
        newsDetail:{},
        currentPostId: -1,
        isPlaying: false
    },
    onLoad(options) {
        let postId = options.id
        let postData = newsData.newsRes[postId]
        this.setData({
            currentPostId: postId,
            newsDetail: postData
        })

        let postsCollected = wx.getStorageSync('posts_collected')
        if (postsCollected) {
            let postCollected = postsCollected[postId]
            if (postCollected){
                this.setData({
                    collected: postCollected
                })
            }
        }
        else {
            let postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }

        this.setAudioMonitor()
        if(APP.globalData.isPlaying && APP.globalData.currentSong === postId) {
            this.setData({
                isPlaying: true
            })
        }
    },

    setAudioMonitor(){
        let that = this
        wx.onBackgroundAudioPlay(() => {
            that.setData({
                isPlaying: true
            })
            APP.globalData.isPlaying = true
            APP.globalData.currentSong = that.data.currentPostId
        })
        wx.onBackgroundAudioPause(() => {
            that.setData({
                isPlaying: false
            })
            APP.globalData.isPlaying = false
            APP.globalData.currentSong = null
        })
        wx.onBackgroundAudioStop(() => {
            that.setData({
                isPlaying: false
            })
            APP.globalData.isPlaying = false
            APP.globalData.currentSong = null
        })
    },

    onColletionTap(event) {
        this.getPostsCollectedAsy();
    },

    getPostsCollectedAsy() {
        let that = this;
        wx.getStorage({
            key: "posts_collected",
            success: function (res) {
                let postsCollected = res.data;
                let postCollected = postsCollected[that.data.currentPostId];
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                that.showToast(postsCollected, postCollected);
            }
        })
    },

    showToast(postsCollected, postCollected) {
        wx.setStorageSync('posts_collected', postsCollected);
        this.setData({
            collected: postCollected
        })
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        })
    },

    onMusicTap(event) {
        let musicData = newsData.newsRes[this.data.currentPostId]
        if(this.data.isPlaying) {
            wx.pauseBackgroundAudio()
            this.setData({
                isPlaying: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: musicData.music.url,
                title: musicData.music.title,
                coverImgUrl: musicData.music.coverImg
            })
            this.setData({
                isPlaying: true
            })
        }
    }
})