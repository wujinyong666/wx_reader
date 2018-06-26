var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({

  data: {
    isPlayingMusic: false
    
  },

  onLoad: function (option) {
      var globalData = app.globalData;
      console.log(globalData + "***");
      var postId = option.id;
      this.data.currentPostId = postId;
      console.log(postId);
      var postData = postsData.postList[postId];
      this.setData({
        postData: postData
      });
      var postsCollected = wx.getStorageSync("posts_collected");
      if (postsCollected && postsCollected[postId]) {
        var postCollected = postsCollected[postId];
        this.setData({
          collected: postCollected
        })
      } else {
        if (postsCollected) {
          postsCollected[postId] = false;
          wx.setStorageSync("posts_collected", postsCollected);
        } else {
          var postsCollected = {};
          postsCollected[postId] = false;
          wx.setStorageSync("posts_collected", postsCollected);
        }
      };
      var that = this;
      wx.onBackgroundAudioPlay( function() {
        that.setData({
          isPlayingMusic: true
        })
      });

      wx.onBackgroundAudioPause(function () {
        that.setData({
          isPlayingMusic: false
        })
      })
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      icon: "success",
      duration: 1000
    });
  },

  onShareTap: function (event) {
    var itemList = [
      '分享到微信',
      '分享到微博',
      '分享到朋友圈',
      '分享到QQ'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        wx.showToast({
          title: itemList[res.tapIndex],
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[this.data.currentPostId].music.dataUrl,
        title: postsData.postList[this.data.currentPostId].music.title,
        coverImgUrl: postsData.postList[this.data.currentPostId].music.coverImgUrl,
      });
      this.setData({
        isPlayingMusic: true
      });
    }
  }
})