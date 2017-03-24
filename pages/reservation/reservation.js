var app = getApp();
var util = require('../../utils/util.js')
Page({
    data: {
        companyInfo: {}
    },
    onLoad: function (option) {
        this.setData({
            companyInfo: JSON.parse(option.companyInfo)
        });
    },
    submitInfo: function (option) {
        var data = {
            orderType: '2',
            mobile: option.detail.value.phoneNo,
            name: option.detail.value.name,
            orderId: option.detail.target.dataset.companyId,
            companyId: option.detail.target.dataset.companyId
        };
        util.doGetHttp(app.globalData.baseUrl + 'saveOrderManage.do', data, this.processOrderData)
    },
    processOrderData: function (data) {
        if (data.status != 0) {
            wx.showModal({
                title: '预约成功',
                content: '感谢您的信任,我们会尽快与您联系!',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                }
            });
        } else {
            util.showModal('预约失败', '请与小装(微信号:Timon_2015)联系', false)
        }
    }
})
