// pages/demo16/demo16.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkedlist: '什么都没有',
        list: [{
            id: 0,
            name: "🍎",
            value: "apple"
        }, {
            id: 1,
            name: "🍌",
            value: "banana"
        }, {
            id: 2,
            name: "🍇",
            value: "grape"
        }]
    },
    handleItemChange(e) {
        console.log(e);
        // 1. 获取被选中的复选框的值
        const checkdList = e.detail.value;
        // 2. 进行赋值
        this.setData({ checkedlist: checkdList })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})