var postsData = require("../../data/posts-data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {


  },

  onLoad: function (options) {
    //this.data.postList = postsData.postList
    //console.log(this.data.postList);
    this.setData({
      posts_key: postsData.postList
    });
  },

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  
})