var app = getApp();
Page({
    data: {},
    onLoad: function (option) {
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: 'https://test02.1qizhuang.com/bingohome-dev/miniProgram/login.do',
                        method: 'GET',
                        data: {
                            code: res.code
                        },
                        success: function (data) {
                            var sessionKey = data.data.session_key
                            wx.getUserInfo({
                                success: function (userInfo) {
                                    wx.request({
                                        url: 'https://test02.1qizhuang.com/bingohome-dev/miniProgram/getUserInfo.do',
                                        method: 'GET',
                                        data: {
                                            sessionKey: sessionKey,
                                            iv: userInfo.iv,
                                            encryptedData: userInfo.encryptedData
                                        },
                                        success: function (user) {
                                            app.globalData.userInfo = user.data;
                                            setTimeout(function () {
                                                wx.redirectTo({
                                                    url: '../login/login'
                                                });
                                            }, 1500);

                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            },
        });
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log(res)
                app.globalData.longitude = res.longitude,
                app.globalData.latitude = res.latitude
            }
        });
        const system = wx.getSystemInfoSync()
        app.globalData.windowHeight = system.windowHeight
        // this.setData({
        //     height: system.windowHeight
        // })
        // wx.getSystemInfo({
        //     success: function (res) {
        //         app.globalData.windowHeight = res.windowHeight
        //     }
        // })
    }
})