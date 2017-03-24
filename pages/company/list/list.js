var app = getApp();
var util = require('../../../utils/util.js')
Page({
    data: {
        companyList: []
    },
    onLoad: function (option) {
        this.setData({
            companyList: JSON.parse(option.companyList)
        });
    },
    navigate: function (Object) {
        app.globalData.chooseCompanyId = Object.currentTarget.dataset.companyId;
        wx.switchTab({
            url: '../detail/detail?'
        })
    },
})