var app = getApp()
Page({
    data: {
        remind: '加载中',
        help_status: false,
        userid_focus: false,
        passwd_focus: false,
        angle: 0,
        userInfo: {},
        companyList: []
    },
    onLoad: function () {
        var _this = this;
        _this.setData({
            userInfo: app.globalData.userInfo
        });
        wx.request({
            url: app.globalData.baseUrl + 'getMyCompany.do',
            method: 'GET',
            data: {
                personId: 602,
                pageNo: 1,
                pageSize: 100
            },
            success: function (res) {
                _this.setData({
                    companyList: res.data.companyList
                });
            }
        });
    },
    onReady: function () {
        var _this = this;
        setTimeout(function () {
            _this.setData({
                remind: ''
            });
        }, 1000);
        wx.onAccelerometerChange(function (res) {
            var angle = -(res.x * 30).toFixed(1);
            if (angle > 14) {
                angle = 14;
            }
            else if (angle < -14) {
                angle = -14;
            }
            if (_this.data.angle !== angle) {
                _this.setData({
                    angle: angle
                });
            }
        });
    },
    onShareAppMessage: function () {
        return {
            title: '一起装',
            desc: '千万真实案例',
            path: '/pages/startPage/startPage'
        }
    },
    redirectTo: function () {
        var _this = this;
        if (_this.data.companyList.length > 1) {
            wx.redirectTo({
                url: '../company/list/list?companyList=' + JSON.stringify(_this.data.companyList)
            })
        } else if (_this.data.companyList.length = 1) {
            app.globalData.chooseCompanyId = _this.data.companyList[0].companyId
            wx.switchTab({
                url: '../company/detail/detail'
            });
        }

    }
})