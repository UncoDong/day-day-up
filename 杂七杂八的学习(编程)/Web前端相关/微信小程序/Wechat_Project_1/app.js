//app.js
App({
    // 1 应用第一次启动的时候就会触发的事件
    onLaunch() {
        // 在应用第一次启动的时候，获取用户的个人信息
        console.log("onLaunch");
        // wx.wx.navigateTo({
        //     url: ''
        // });
    },
    // 2 应用被用户看到的时候出发的
    onShow() {
        // 每次用户切换后台，再返回小程序的时候，会触发
        //可以对应用的数据或者页面效果重置  
        console.log("onShow");

    },
    // 3 应用被隐藏
    onHide() {
        // 只要切后台，应用就会被隐藏
        //  暂停或者清除定时器
        console.log("Hide");
    },
    // 4 应用代码报错的时候调用
    onError(err) {
        // 手机用户的错误信息，通过异步请求，将错误的信息发送到后台
        //console.log(err);
        //console.log(onError);
    },
    // 5 页面找不到就会触发
    // 应用第一次启动的时候，如果找不到第一个入口页面，才会触发
    onPageNotFound(err) {
        // 手机用户的错误信息，通过异步请求，将错误的信息发送到后台
        console.log(err);
        console.log(onError);
    }
    // onLaunch: function () {
    //   // 展示本地存储能力
    //   var logs = wx.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   wx.setStorageSync('logs', logs)

    //   // 登录
    //   wx.login({
    //     success: res => {
    //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     }
    //   })
    //   // 获取用户信息
    //   wx.getSetting({
    //     success: res => {
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //         wx.getUserInfo({
    //           success: res => {
    //             // 可以将 res 发送给后台解码出 unionId
    //             this.globalData.userInfo = res.userInfo

    //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //             // 所以此处加入 callback 以防止这种情况
    //             if (this.userInfoReadyCallback) {
    //               this.userInfoReadyCallback(res)
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
    // },
    // globalData: {
    //   userInfo: null
    // }
})